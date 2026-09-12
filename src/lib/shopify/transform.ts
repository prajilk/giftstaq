import { isValidJSON } from "../utils";
import {
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
    price: product.priceRange.minVariantPrice,
    colors: colorOption?.optionValues.map((v) => v.name) ?? [],
    collectionName: collectionEdges[0]?.node.title ?? null,
  };
}

export interface ColorVariantData {
  name: string;
  thumbnail: string | null;
  images: string[];
  sizes: { value: string; available: boolean; variantId: string | null }[];
}

export interface ProductDetailData {
  id: string;
  title: string;
  description: string;
  collectionName: string | null;
  price: { amount: string; currencyCode: string };
  colors: ColorVariantData[];
  keyFeatures: string[] | null;
  idealFor: string[] | null;
  specs: { label: string; value: string | string[] }[]; // everything else, for the table
}

// Fields shown as their own callout sections, not in the generic table
const FEATURED_KEYS = new Set(["key_features", "ideal_for"]);

// Human-friendly labels for the generic table
const LABELS: Record<string, string> = {
  material: "Material",
  care_instructions: "Care Instructions",
  sleeve: "Sleeve",
  collar: "Collar",
  fit: "Fit",
  branding_method: "Branding Method",
};

export function toProductDetail(
  product: ShopifyProductDetail,
): ProductDetailData {
  const options = product.options ?? [];
  const variants = (product.variants?.edges ?? []).map((e) => e.node);

  const colorOption = options.find(
    (opt) =>
      opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour",
  );
  const sizeOption = options.find((opt) => opt.name.toLowerCase() === "size");

  // Direct lookup, no fuzzy matching needed — the admin already grouped this correctly
  const galleryEdges = product.colorGalleries?.references?.edges ?? [];
  const galleriesByColor = new Map<string, string[]>();

  for (const { node } of galleryEdges) {
    const colorName = node.colorName?.value;
    if (!colorName) continue;

    const images = (node.images?.references?.edges ?? [])
      .map((e) => e.node.image?.url)
      .filter((url): url is string => Boolean(url));

    galleriesByColor.set(colorName, images);
  }

  const colors: ColorVariantData[] = (colorOption?.optionValues ?? []).map(
    (colorValue) => {
      const colorName = colorValue.name;
      const images = galleriesByColor.get(colorName) ?? [];

      const sizes = (sizeOption?.optionValues ?? []).map((sizeValue) => {
        const matchingVariant = variants.find(
          (v) =>
            v.selectedOptions.some(
              (o) => o.name.toLowerCase() === "color" && o.value === colorName,
            ) &&
            v.selectedOptions.some(
              (o) =>
                o.name.toLowerCase() === "size" && o.value === sizeValue.name,
            ),
        );
        return {
          value: sizeValue.name,
          available: matchingVariant?.availableForSale ?? false,
          variantId: matchingVariant?.id ?? null,
        };
      });

      return {
        name: colorName,
        thumbnail: images[0] ?? null,
        images,
        sizes,
      };
    },
  );

  const rawMetafields = (product.metafields ?? []).filter(
    (mf): mf is ShopifyMetafield => mf !== null && mf.value !== "",
  );

  const keyFeatures =
    rawMetafields.find((mf) => mf.key === "key_features")?.value ?? null;
  const idealFor =
    rawMetafields.find((mf) => mf.key === "ideal_for")?.value ?? null;

  const specs = rawMetafields
    .filter((mf) => !FEATURED_KEYS.has(mf.key))
    .map((mf) => ({
      label: LABELS[mf.key] ?? mf.key.replace(/[_-]/g, " "), // fallback: prettify unknown keys automatically
      value: isValidJSON(mf.value) ? JSON.parse(mf.value) : mf.value,
    }));

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    collectionName: product.collections?.edges[0]?.node.title ?? null,
    price: product.priceRange.minVariantPrice,
    colors,
    keyFeatures: keyFeatures ? JSON.parse(keyFeatures) : null,
    idealFor: idealFor ? JSON.parse(idealFor) : null,
    specs,
  };
}
