"use client";

import { Loader2, SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useProductSearch } from "@/hooks/useProductSearch";
import Link from "next/link";

const Search = () => {
  const [term, setTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isFetching } = useProductSearch(term);

  const results = data?.products.edges.map((e) => e.node) ?? [];
  const showDropdown = isOpen && term.trim().length > 1;
  return (
    // <div className="flex items-center">
    //   <Input
    //     value={term}
    //     onChange={(e) => setTerm(e.target.value)}
    //     onFocus={() => setIsOpen(true)}
    //     onBlur={() => setTimeout(() => setIsOpen(false), 150)} // delay so link clicks register first
    //     className="bg-white placeholder:text-[#717680] hidden lg:block"
    //     placeholder="Search"
    //   />
    //   <Button
    //     size="icon"
    //     variant="secondary"
    //     className="bg-white cursor-pointer shadow lg:shadow-none"
    //   >
    //     <SearchIcon />
    //   </Button>
    // </div>
    <div className="relative w-full max-w-md">
      <div className="relative flex">
        {/* <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /> */}
        <Input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)} // delay so link clicks register first
          placeholder="Search products..."
          className="bg-white placeholder:text-[#717680] hidden lg:block"
        />
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setTerm("")}
          disabled={!term}
          className="bg-white disabled:opacity-100 cursor-pointer shadow lg:shadow-none"
        >
          {isFetching ? (
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          ) : term ? (
            <X className="w-4 h-4 text-gray-400" />
          ) : (
            <SearchIcon />
          )}
        </Button>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading && (
            <p className="p-4 text-sm text-gray-500">Searching...</p>
          )}

          {!isLoading && results.length === 0 && (
            <p className="p-4 text-sm text-gray-500">
              No products found for "{term}"
            </p>
          )}

          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-50"
            >
              {product.featuredImage && (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  className="w-10 h-10 object-cover rounded"
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
        </div>
      )}
    </div>
  );
};

export default Search;
