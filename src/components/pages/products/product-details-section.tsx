"use client";

import { addToCartAction, createCartAction } from "@/actions";
import { PRODUCT } from "./product-data";
import Whatsapp from "@/components/icons/whatsapp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProduct } from "@/hooks/useProduct";
import { toProductDetail } from "@/lib/shopify/transform";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Share,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cartKeys } from "@/lib/query/keys";

const ProductDetailsSection = ({ handle }: { handle: string }) => {
  const { data, isLoading, isError } = useProduct(handle);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Keep the thumbnail rail in sync with whichever slide the carousel lands on
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveImage(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const queryClient = useQueryClient();

  const addToCart = useMutation({
    mutationFn: ({ variantId, qty }: { variantId: string; qty: number }) =>
      addToCartAction(variantId, qty),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all }); // refresh cart badge/drawer
    },
  });

  function handleAddToCart() {
    if (selectedSizeData?.variantId) {
      addToCart.mutate({
        variantId: selectedSizeData.variantId,
        qty: quantity,
      });
    }
  }

  const buyNow = useMutation({
    mutationFn: ({
      quantity,
      variantId,
    }: {
      variantId: string;
      quantity: number;
    }) => createCartAction(variantId, quantity),
    onSuccess: ({ checkoutUrl }) => {
      window.location.href = checkoutUrl; // Shopify-hosted checkout page
    },
  });

  if (isLoading) return <div>Loading product...</div>;
  if (isError || !data?.product) return <div>Something went wrong.</div>;

  const product = toProductDetail(data.product);
  const hasColors = product.colors.length > 0;
  const activeColor = hasColors ? product.colors[selectedColorIndex] : null;
  const galleryImages = activeColor?.images ?? [];

  const selectedSizeData = activeColor?.sizes.find(
    (s) => s.value === selectedSize,
  );
  const canBuy = activeColor
    ? Boolean(selectedSizeData?.available && selectedSizeData.variantId)
    : false; // adjust this if a product has no color/size options at all — see note below

  function handleBuyNow() {
    if (selectedSizeData?.variantId) {
      buyNow.mutate({ variantId: selectedSizeData.variantId, quantity });
    }
  }

  function handleColorSelect(index: number) {
    setSelectedColorIndex(index);
    goToPose(0); // reset to first pose
    setSelectedSize(null); // reset size, since availability differs per color
    setQuantity(1);
  }

  function goToPose(index: number) {
    carouselApi?.scrollTo(index);
    setActiveImage(index);
  }

  function adjustQuantity(delta: number) {
    setQuantity((qty) =>
      Math.min(PRODUCT.maxQuantity, Math.max(PRODUCT.minQuantity, qty + delta)),
    );
  }

  return (
    <section className="container container-padding-x pb-12 lg:pb-16">
      <Link href="/products">
        <Button variant="link" className="text-black">
          <ArrowLeft />
          Back to product listing
        </Button>
      </Link>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 mt-6">
        {/* ---------------- Gallery ---------------- */}
        <div className="flex flex-col-reverse lg:flex-row gap-3 lg:sticky top-22 lg:h-screen">
          {/* Thumbnail rail */}
          <div className="flex w-16 lg:flex-col gap-3 sm:w-20">
            {galleryImages.map((image, index) => (
              <Thumbnail
                key={index}
                image={image}
                active={index === activeImage}
                onClick={() => goToPose(index)}
              />
            ))}
          </div>

          {/* Main carousel */}
          <div className="relative flex-1">
            <Carousel setApi={setCarouselApi} className="w-full">
              <CarouselContent>
                {galleryImages.map((image) => (
                  <CarouselItem key={image}>
                    <div className="flex aspect-square items-center justify-center rounded-xl bg-[#EFEAE2] p-6">
                      <Image
                        src={image}
                        alt="Product image"
                        width={500}
                        height={500}
                        className="size-[90%] object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 top-auto bottom-3 bg-white" />
              <CarouselNext className="right-3 top-auto bottom-3 bg-white" />
            </Carousel>

            {/* Wishlist / share */}
            <div className="absolute right-3 top-3 flex flex-col gap-2">
              <Button
                size="icon-sm"
                className="bg-white hover:bg-white/80 text-black"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                size="icon-sm"
                className="bg-white hover:bg-white/80 text-black"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Copied to clipboard!");
                }}
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ---------------- Details ---------------- */}
        <div className="flex flex-col gap-4 pt-1">
          <div>
            <p className="text-xs font-medium uppercase text-[#414651]">
              {product.collectionName}
            </p>
            <h1 className="text-4xl font-anton uppercase mt-2">
              {product.title}
            </h1>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-anton text-3xl uppercase text-primary">
              {product.price.currencyCode} {product.price.amount}
            </span>
            <span className="text-sm uppercase">Per unit</span>
          </div>

          {/* Colors */}
          {hasColors && (
            <div className="mt-3">
              <p className="mb-3 text-xs font-medium uppercase text-[#414651]">
                Colors
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, i) => (
                  // <button
                  //   key={color.id}
                  //   type="button"
                  //   aria-label={color.name}
                  //   aria-pressed={color.id === selectedColor.id}
                  //   onClick={() => setSelectedColor(color)}
                  //   className={cn(
                  //     "grid h-12 w-12 place-items-center rounded-full border-2 transition",
                  //     color.id === selectedColor.id
                  //       ? "border-red-500"
                  //       : "border-transparent hover:border-neutral-300",
                  //   )}
                  // >
                  //   <span
                  //     className="h-9 w-9 rounded-full ring-1 ring-black/10"
                  //     style={{ backgroundColor: color.hex }}
                  //   />
                  // </button>
                  <button
                    key={color.name}
                    type="button"
                    aria-label={color.name}
                    onClick={() => handleColorSelect(i)}
                    className={cn(
                      "aspect-square w-24 rounded-full border-2 bg-secondary p-1.5 transition flex items-center justify-center overflow-hidden",
                      i === selectedColorIndex
                        ? "border-primary"
                        : "border-transparent hover:border-neutral-300",
                    )}
                  >
                    {color.thumbnail ? (
                      <Image
                        src={color.thumbnail}
                        alt={color.name}
                        width={200}
                        height={200}
                        className="size-[90%] object-cover"
                      />
                    ) : (
                      <span className="w-full h-full block bg-gray-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {hasColors && activeColor && activeColor.sizes.length > 0 && (
            <div className="mt-3">
              <p className="mb-3 text-xs font-medium uppercase text-[#414651]">
                Sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {activeColor.sizes.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    aria-pressed={size.value === selectedSize}
                    onClick={() => setSelectedSize(size.value)}
                    className={cn(
                      "grid size-14 place-items-center bg-secondary rounded-full border-2 font-anton uppercase transition",
                      size.value === selectedSize
                        ? "border-primary"
                        : "border-transparent",
                    )}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-3 flex items-center gap-3">
            <p className="text-xs font-medium uppercase text-[#414651]">
              Quantity
            </p>
            <div className="inline-flex items-center rounded-full">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center border border-[#D5D7DA] rounded-l-full text-[#717680] bg-[#FCFBF9] disabled:opacity-40 cursor-pointer hover:bg-secondary"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="w-12 h-10 text-center text-sm border-t border-b border-[#D5D7DA] flex items-center justify-center font-medium">
                <span>{quantity}</span>
              </div>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(25, q + 1))}
                className="grid h-10 w-10 place-items-center border border-[#D5D7DA] rounded-r-full text-[#717680] bg-[#FCFBF9] disabled:opacity-40 cursor-pointer hover:bg-secondary"
                disabled={quantity >= 25}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="lg:flex-1 rounded-full"
              onClick={handleAddToCart}
              disabled={!canBuy || addToCart.isPending}
            >
              {addToCart.isPending ? "Adding..." : "Add to Bag"}
              <ShoppingCart className="mr-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              className="lg:flex-1 rounded-full bg-green-600 text-white hover:bg-green-700"
            >
              Order by WhatsApp
              <Whatsapp />
            </Button>
            {/* <Button
              onClick={handleBuyNow}
              disabled={!canBuy || buyNow.isPending}
              className="mt-6 w-full bg-black text-white py-3 rounded disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {buyNow.isPending ? "Redirecting to checkout..." : "Buy Now"}
            </Button> */}

            {buyNow.isError && (
              <p className="text-red-600 text-sm mt-2">
                {(buyNow.error as Error).message}
              </p>
            )}

            {/* {!selectedSize && hasColors && activeColor && (
              <p className="text-sm text-gray-500 mt-2">Please select a size</p>
            )} */}
          </div>

          <hr className="mt-5 mb-1" />

          <Accordion defaultValue={["benefits"]}>
            <AccordionItem value="benefits" className="bg-transparent my-0">
              <AccordionTrigger className="font-medium uppercase ps-0 pb-2 hover:no-underline font-anton text-3xl">
                Benefits
              </AccordionTrigger>
              <AccordionContent className="text-base" panelStyle="ps-0">
                {product.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <hr />

          <Accordion defaultValue={["features"]}>
            <AccordionItem value="features" className="bg-transparent my-0">
              <AccordionTrigger className="font-medium uppercase ps-0 pb-2 hover:no-underline font-anton text-3xl">
                Key Features
              </AccordionTrigger>
              <AccordionContent className="text-base" panelStyle="ps-1">
                <ul className="list-disc list-inside">
                  {product.keyFeatures?.map((f, i) => (
                    <li key={f + i}>{f}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <hr />

          <Accordion defaultValue={["specs"]}>
            <AccordionItem value="specs" className="bg-transparent my-0">
              <AccordionTrigger className="font-medium uppercase ps-0 pb-2 hover:no-underline font-anton text-3xl">
                Technical Specifications
              </AccordionTrigger>
              <AccordionContent className="text-base" panelStyle="ps-0 pt-2">
                <div className="mx-auto w-full overflow-hidden rounded-t-xl">
                  {/* Header */}
                  <div className="grid grid-cols-2 bg-primary">
                    <div className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-white">
                      Specification
                    </div>
                    <div className="px-6 py-3 text-sm font-medium uppercase tracking-wide text-white">
                      Details
                    </div>
                  </div>

                  {/* Rows */}
                  <div className="border border-[#717680] rounded-b-xl">
                    {product.specs.map((row, index) => (
                      <div
                        key={row.label}
                        className={`grid grid-cols-2 items-center ${
                          index !== product.specs.length - 1
                            ? "border-b border-[#717680]"
                            : ""
                        }`}
                      >
                        <div className="px-6 py-3 text-sm font-medium uppercase text-[#717680]">
                          {row.label}
                        </div>
                        <div className="border-l border-[#717680] px-6 py-3 text-sm font-medium uppercase">
                          {Array.isArray(row.value)
                            ? row.value.join(", ")
                            : row.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <hr />

          <Accordion defaultValue={["ideal-for"]}>
            <AccordionItem value="ideal-for" className="bg-transparent my-0">
              <AccordionTrigger className="font-medium uppercase ps-0 pb-2 hover:no-underline font-anton text-3xl">
                Ideal For
              </AccordionTrigger>
              <AccordionContent className="text-base" panelStyle="ps-1">
                <ul className="list-disc list-inside">
                  {product.idealFor?.map((ideal, i) => (
                    <li key={i + ideal}>{ideal}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* Here */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSection;

function Thumbnail({
  image,
  active,
  onClick,
}: {
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show ${image} view`}
      className={cn(
        "shrink-0 aspect-square w-full rounded-lg border-2 bg-secondary p-1.5 transition",
        active
          ? "border-red-500"
          : "border-transparent hover:border-neutral-300",
      )}
    >
      <Image
        src={image}
        alt="Product image"
        width={400}
        height={400}
        className="h-full w-full"
      />
    </button>
  );
}
