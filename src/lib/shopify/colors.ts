import type { ColorMap } from "@/lib/payload/colors";

const COLOR_MAP: Record<string, string> = {
  white: "#FFFFFF",
  "off white": "#FAF9F6",
  black: "#000000",
  grey: "#808080",
  gray: "#808080",
  "light grey": "#D3D3D3",
  "light gray": "#D3D3D3",
  "dark grey": "#4A4A4A",
  "dark gray": "#4A4A4A",
  "heather grey": "#9C9DA4",
  "heather gray": "#9C9DA4",
  navy: "#1F2A44",
  "navy blue": "#1F2A44",
  blue: "#1E5EFF",
  "sky blue": "#87CEEB",
  "royal blue": "#2B4BC9",
  red: "#D32F2F",
  maroon: "#800000",
  green: "#2E7D32",
  "olive green": "#6B7A2A",
  "bottle green": "#0B5D3B",
  yellow: "#FBC02D",
  orange: "#F57C00",
  pink: "#F48FB1",
  purple: "#7B1FA2",
  brown: "#6D4C41",
  beige: "#D9C7A3",
  cream: "#FFFDD0",
  "pastel yellow": "#FFEE8C",
  "steel grey": "#6F828A",
  "steel gray": "#6F828A",
  "dark purple": "#341539",
  "pastel teal": "#63B7B7",
  "pastel light purple": "#C9A0DC",
  "pastel peach": "#fff0da",
  "pastel pink": "#FFD1DC",
  "pastel green": "#77DD77",
  "pastel blue": "#AEC6CF",
};

// "Off-White", "off_white" and " OFF  WHITE " all become "off white"
export function normalizeColorName(name: string): string {
  return name.toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

export function getColorHex(name: string, colorMap: ColorMap): string | null {
  const key = normalizeColorName(name);
  const hex = colorMap[key] ?? COLOR_MAP[key] ?? null;

  if (!hex && process.env.NODE_ENV === "development") {
    console.warn(`[colors] "${name}" not found in Payload or static fallback`);
  }
  return hex;
}
