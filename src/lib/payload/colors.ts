// lib/payload/colors.ts
import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { normalizeColorName } from "../shopify/colors";

export type ColorMap = Record<string, string>;

export const getColorMap = unstable_cache(
  async (): Promise<ColorMap> => {
    const payload = await getPayload({ config });

    const { docs } = await payload.find({
      collection: "colors",
      pagination: false, // return all docs in one query
      depth: 0, // no relationship population
      select: { name: true, hex: true }, // only the two fields we need
    });

    const map: ColorMap = {};
    for (const color of docs) {
      if (color.name && color.hex) {
        map[normalizeColorName(color.name)] = color.hex.trim();
      }
    }
    return map;
  },
  ["color-map"],
  { tags: ["colors"] }, // Tag-based busting below
);
