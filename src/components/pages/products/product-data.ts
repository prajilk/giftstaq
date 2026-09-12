export type PoseId = "front" | "folded" | "collar" | "side" | "back";

export interface SizeOption {
  value: string;
  available: boolean;
}

export const POSES: PoseId[] = ["front", "folded", "collar", "side", "back"];

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
