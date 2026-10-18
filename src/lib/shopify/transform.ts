import { ColorMap } from "../payload/colors";
import { isValidJSON } from "../utils";
import { getColorHex } from "./colors";
import {
  ShopifyCollectionDetail,
  ShopifyMetafield,
  ShopifyProduct,
  ShopifyProductDetail,
} from "./types";

export interface ProductCardData {
  id: string;
  handle: string;
  title: string;
  image: { url: string; altText: string } | null;
  price: { amount: string; currencyCode: string };
  colors: string[];
  collectionName: string | null;
}

export function toProductCard(product: ShopifyProduct): ProductCardData {
  const options = product.options ?? [];
  const collectionEdges = product.collections?.edges ?? [];

  const colorOption = options.find(
    (opt) =>
      opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour",
  );

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    image: product.featuredImage
      ? {
          url: product.featuredImage.url,
          altText: product.featuredImage.altText || product.title,
        }
      : null,
    price: product.priceRange?.minVariantPrice,
    colors: colorOption?.optionValues.map((v) => v.name) ?? [],
    collectionName: collectionEdges[0]?.node.title ?? null,
  };
}

export interface SizeData {
  value: string;
  available: boolean;
  variantId: string | null;
}

export interface ColorVariantData {
  name: string;
  hex: string | null;
  thumbnail: string | null;
  images: string[];
  sizes: SizeData[];
  variantId: string | null; // used when the product has colors but no sizes
  available: boolean;
}

export interface ProductSpec {
  label: string;
  value: string | string[];
}

export interface ProductDetailData {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  collectionName: string | null;
  price: { amount: string; currencyCode: string };
  colors: ColorVariantData[];
  metafields: Record<string, string>;
  specs: ProductSpec[];
  keyFeatures: string[];
  idealFor: string[];
  images: string[]; // every product image, used when there's no color option
  sizes: SizeData[]; // used for size-only products
  defaultVariant: { id: string; available: boolean } | null; // no color and no size
  priceTiers: PriceTier[];
}

// Fields shown as their own callout sections, not in the generic table
const FEATURED_KEYS = new Set([
  "key_features",
  "ideal_for",
  "product_info",
  "price_tiers",
]);

// Human-friendly labels for the generic table
const LABELS: Record<string, string> = {
  material: "Material",
  care_instructions: "Care Instructions",
  sleeve: "Sleeve",
  collar: "Collar",
  fit: "Fit",
  branding_method: "Branding Method",
};

export interface CollectionHeroData {
  title: string;
  description: string | null;
  image: { url: string; altText: string } | null;
}

export function toCollectionHero(
  collection: ShopifyCollectionDetail,
): CollectionHeroData {
  return {
    title: collection.bannerTitle?.value || collection.title, // fallback to native title if hero field is empty
    description: collection.bannerDescription?.value || null,
    image: collection.bannerImage?.reference?.image
      ? {
          url: collection.bannerImage?.reference?.image?.url || "/phero.webp",
          altText:
            collection.bannerImage?.reference?.image?.altText ||
            collection.title,
        }
      : {
          url: "/phero.webp",
          altText: collection.title,
        },
  };
}

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

function getFilenameSlug(url: string): string {
  const path = url.split("?")[0];
  const file = path.substring(path.lastIndexOf("/") + 1);
  return file.replace(/\.[^/.]+$/, "");
}

/**
 * Takes everything after the first underscore as the "color portion" —
 * doesn't care what's before it (handle, typo, anything), since the
 * image is already guaranteed to belong to this product via the query itself.
 */
function imageMatchesColor(imageUrl: string, colorSlug: string): boolean {
  const fileSlug = getFilenameSlug(imageUrl);
  const underscoreIndex = fileSlug.indexOf("_");

  if (underscoreIndex === -1) return false; // no underscore = doesn't follow the convention at all

  const colorPortion = fileSlug.slice(underscoreIndex + 1); // "navy-blue" or "navy-blue-back"
  return colorPortion === colorSlug || colorPortion.startsWith(`${colorSlug}-`);
}

function parseMetafieldAsList(mf: ShopifyMetafield): string[] {
  if (mf.type?.startsWith("list.")) {
    try {
      return JSON.parse(mf.value) as string[];
    } catch {
      return [mf.value];
    }
  }
  // Single text field (e.g. one paragraph) — wrap as a one-item list
  // so the UI can always just .map() without checking the type
  return [mf.value];
}

export function toProductDetail(
  product: ShopifyProductDetail,
  colorMap: ColorMap,
): ProductDetailData {
  const options = product.options ?? [];
  const allImages = (product.images?.edges ?? []).map((e) => e.node);

  const productImages = allImages.map((i) => i.url);

  const colorOption = options.find(
    (opt) =>
      opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour",
  );
  const sizeOption = options.find((opt) => opt.name.toLowerCase() === "size");

  const buildSizes = (colorName?: string): SizeData[] =>
    (sizeOption?.optionValues ?? []).map((sizeValue) => {
      const match = variants.find(
        (v) =>
          (!colorName ||
            v.selectedOptions.some(
              (o) => o.name.toLowerCase() === "color" && o.value === colorName,
            )) &&
          v.selectedOptions.some(
            (o) =>
              o.name.toLowerCase() === "size" && o.value === sizeValue.name,
          ),
      );
      return {
        value: sizeValue.name,
        available: match?.availableForSale ?? false,
        variantId: match?.id ?? null,
      };
    });

  const colorValues = new Set(
    (colorOption?.optionValues ?? []).map((v) => v.name),
  );
  const hasColorOption = Boolean(colorOption);
  const variants = (product.variants?.edges ?? [])
    .map((e) => e.node)
    .filter(
      (v) =>
        !hasColorOption ||
        v.selectedOptions.some(
          (o) => o.name.toLowerCase() === "color" && colorValues.has(o.value),
        ),
    );

  const colors: ColorVariantData[] = (colorOption?.optionValues ?? []).map(
    (colorValue) => {
      const colorName = colorValue.name;
      const colorSlug = slugify(colorName);

      const variantsForColor = variants.filter((v) =>
        v.selectedOptions.some(
          (opt) =>
            opt.name.toLowerCase() === "color" && opt.value === colorName,
        ),
      );

      const matchedImages = allImages
        .filter((img) => imageMatchesColor(img.url, colorSlug))
        .map((img) => img.url);

      const variantImages = variantsForColor
        .map((v) => v.image?.url)
        .filter((url): url is string => Boolean(url));

      const images =
        matchedImages.length > 0 || variantImages.length > 0
          ? Array.from(new Set([...matchedImages, ...variantImages]))
          : allImages.map((i) => i.url);

      // const sizes = (sizeOption?.optionValues ?? []).map((sizeValue) => {
      //   const matchingVariant = variants.find(
      //     (v) =>
      //       v.selectedOptions.some(
      //         (o) => o.name.toLowerCase() === "color" && o.value === colorName,
      //       ) &&
      //       v.selectedOptions.some(
      //         (o) =>
      //           o.name.toLowerCase() === "size" && o.value === sizeValue.name,
      //       ),
      //   );
      //   return {
      //     value: sizeValue.name,
      //     available: matchingVariant?.availableForSale ?? false,
      //     variantId: matchingVariant?.id ?? null,
      //   };
      // });

      const firstVariant = variantsForColor[0];

      return {
        name: colorName,
        hex: getColorHex(colorName, colorMap),
        thumbnail: images[0] ?? null,
        images,
        sizes: buildSizes(colorName),
        variantId: sizeOption ? null : (firstVariant?.id ?? null),
        available: firstVariant?.availableForSale ?? false,
      };
    },
  );

  const metafields: Record<string, string> = {};
  for (const mf of product.metafields ?? []) {
    if (mf) metafields[mf.key] = mf.value;
  }

  const rawMetafields = (product.metafields ?? []).filter(
    (mf): mf is ShopifyMetafield => mf !== null && mf.value !== "",
  );

  const keyFeaturesField = rawMetafields.find(
    (mf) => mf.key === "key_features",
  );
  const idealForField = rawMetafields.find((mf) => mf.key === "ideal_for");

  const keyFeatures = keyFeaturesField
    ? parseMetafieldAsList(keyFeaturesField)
    : [];
  const idealFor = idealForField ? parseMetafieldAsList(idealForField) : [];

  const specs: ProductSpec[] = rawMetafields
    .filter((mf) => !FEATURED_KEYS.has(mf.key))
    .map((mf) => ({
      label: LABELS[mf.key] ?? mf.key.replace(/[_-]/g, " "),
      value: mf.type?.startsWith("list.")
        ? (() => {
            try {
              return JSON.parse(mf.value) as string[];
            } catch {
              return mf.value;
            }
          })()
        : mf.value,
    }));

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    collectionName: product.collections?.edges[0]?.node.title ?? null,
    price: product.priceRange.minVariantPrice,
    metafields,
    colors,
    keyFeatures,
    idealFor,
    specs,
    images: productImages,
    sizes: colorOption ? [] : buildSizes(),
    defaultVariant:
      !colorOption && !sizeOption && variants[0]
        ? { id: variants[0].id, available: variants[0].availableForSale }
        : null,
    priceTiers: parsePriceTiers(
      rawMetafields.find((mf) => mf.key === "price_tiers"),
    ),
  };
}

export interface PriceTier {
  min: number;
  max: number | null; // null = open-ended ("21+")
  price: number;
}

function parsePriceTiers(mf?: ShopifyMetafield): PriceTier[] {
  if (!mf) return [];
  try {
    const raw = JSON.parse(mf.value) as { min: number; price: number }[];
    const sorted = raw
      .filter(
        (t) =>
          Number.isFinite(t.min) &&
          Number.isFinite(t.price) &&
          t.min >= 1 &&
          t.price >= 0,
      )
      .sort((a, b) => a.min - b.min);
    return sorted.map((t, i) => ({
      min: t.min,
      max: sorted[i + 1] ? sorted[i + 1].min - 1 : null,
      price: t.price,
    }));
  } catch {
    return []; // bad JSON in Admin: hide the table instead of crashing
  }
}
