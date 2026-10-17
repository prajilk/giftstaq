"use client";

import { createContext, useContext } from "react";
import type { ColorMap } from "@/lib/payload/colors";

const ColorsContext = createContext<ColorMap>({});

export function ColorsProvider({
  value,
  children,
}: {
  value: ColorMap;
  children: React.ReactNode;
}) {
  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
}

export const useColorMap = () => useContext(ColorsContext);
