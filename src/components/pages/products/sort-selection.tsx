// components/sort-selection.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortValue } from "@/lib/shopify/sort";

const items: { label: string; value: SortValue }[] = [
  { label: "Latest", value: "latest" },
  { label: "Price Low to High", value: "price-low-to-high" },
  { label: "Price High to Low", value: "price-high-to-low" },
];

interface SortSelectionProps {
  value: SortValue;
  onChange: (value: SortValue) => void;
}

export function SortSelection({ value, onChange }: SortSelectionProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortValue)}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue>
          {items.find((item) => item.value === value)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
