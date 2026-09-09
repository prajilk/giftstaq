export type PoseId = "front" | "folded" | "collar" | "side" | "back";

export interface ColorVariant {
  id: string;
  name: string;
  image: string;
}

export interface SizeOption {
  id: string;
  label: string;
}

export const POSES: PoseId[] = ["front", "folded", "collar", "side", "back"];

export const COLOR_VARIANTS: ColorVariant[] = [
  { id: "sage", name: "Sage Heather", image: "/local/products/1/green.webp" },
  {
    id: "charcoal",
    name: "Charcoal Heather",
    image: "/local/products/1/blue.webp",
  },
  {
    id: "skyblue",
    name: "Sky Blue Heather",
    image: "/local/products/1/gray.webp",
  },
];

export const SIZE_OPTIONS: SizeOption[] = [
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "2xl", label: "2XL" },
  { id: "3xl", label: "3XL" },
];

export const PRODUCT = {
  eyebrow: "Classic Wear",
  title: "Premium Quarter-Zip Performance Pullover for Corporate Teams",
  currency: "AED",
  price: 149.0,
  unitLabel: "per unit",
  minQuantity: 1,
  maxQuantity: 500,
  defaultQuantity: 25,
};

interface SpecRow {
  label: string;
  value: string;
}

export const SPEC_ROWS: SpecRow[] = [
  { label: "MATERIAL", value: "PREMIUM POLYESTER BLEND" },
  { label: "FIT", value: "REGULAR FIT" },
  { label: "SLEEVE", value: "FULL SLEEVE" },
  { label: "COLLAR", value: "QUARTER-ZIP STAND COLLAR" },
  {
    label: "BRANDING METHOD",
    value: "EMBROIDERY, SCREEN PRINT, HEAT TRANSFER",
  },
  { label: "CARE INSTRUCTIONS", value: "MACHINE WASHABLE" },
];
