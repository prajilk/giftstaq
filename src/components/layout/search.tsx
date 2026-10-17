"use client";

import { Loader2, SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { useProductSearch } from "@/hooks/useProductSearch";
import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Search = () => {
  const [term, setTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data, isLoading, isFetching } = useProductSearch(term);

  const ref = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  const results = data?.products.edges.map((e) => e.node) ?? [];
  const showResults = term.trim().length > 1;

  const handleMobileOpen = () => {
    setMobileOpen(true);

    // Focus the input after the sheet opens.
    requestAnimationFrame(() => {
      mobileInputRef.current?.focus();
    });
  };

  const handleProductClick = () => {
    setMobileOpen(false);
    setIsOpen(false);
  };

  const SearchResults = () => (
    <>
      {isLoading && <p className="p-4 text-sm text-gray-500">Searching...</p>}

      {!isLoading && results.length === 0 && (
        <p className="p-4 text-sm text-gray-500">
          No products found for "{term}"
        </p>
      )}

      {!isLoading &&
        results.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            onClick={handleProductClick}
            className="flex items-center gap-3 p-3 hover:bg-gray-50"
          >
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="h-10 w-10 rounded object-cover"
              />
            )}

            <div className="flex-1">
              <p className="text-sm font-medium">{product.title}</p>

              <p className="text-xs text-gray-500">
                {product.priceRange.minVariantPrice.amount}{" "}
                {product.priceRange.minVariantPrice.currencyCode}
              </p>
            </div>
          </Link>
        ))}
    </>
  );

  return (
    <>
      {/* Desktop search */}
      <div ref={ref} className="relative hidden w-full max-w-md lg:block">
        <div className="relative flex gap-2">
          <Input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search products..."
            className="bg-white placeholder:text-[#717680]"
          />

          <Button
            size="icon"
            variant="secondary"
            onClick={() => setTerm("")}
            disabled={!term}
            aria-label="Clear search"
            className="cursor-pointer bg-white shadow-none"
          >
            {isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            ) : term ? (
              <X className="h-4 w-4 text-gray-400" />
            ) : (
              <SearchIcon />
            )}
          </Button>
        </div>

        {isOpen && showResults && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border bg-white shadow-lg">
            <SearchResults />
          </div>
        )}
      </div>

      {/* Mobile search trigger */}
      <Button
        size="icon"
        variant="secondary"
        onClick={handleMobileOpen}
        aria-label="Open search"
        className="cursor-pointer bg-white shadow lg:hidden"
      >
        <SearchIcon />
      </Button>

      {/* Mobile search sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="top"
          showCloseButton={false}
          className="z-90 flex max-h-[85dvh] flex-col gap-0 rounded-b-2xl p-0"
        >
          <SheetHeader className="flex flex-row items-center justify-between border-b px-4 py-4">
            <SheetTitle className="text-base">Search products</SheetTitle>

            <Button
              size="icon"
              variant="ghost"
              aria-label="Close search"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetHeader>

          <div className="border-b p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                ref={mobileInputRef}
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search products..."
                className="bg-white pl-10 pr-10"
              />

              {term && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setTerm("");
                    mobileInputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {isFetching && (
              <div className="flex justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            )}

            {showResults && !isFetching && <SearchResults />}

            {!showResults && (
              <p className="p-6 text-center text-sm text-gray-500">
                Search for your favourite products.
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Search;
