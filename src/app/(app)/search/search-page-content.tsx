"use client";

import { type SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Info, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchResults } from "@/hooks/useSearchResults";
import { toProductCard } from "@/lib/shopify/transform";
import ProductCard from "@/components/pages/products/product-card";

export default function SearchPageContent({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const router = useRouter();
  const [input, setInput] = useState(initialQuery);
  const query = initialQuery.trim();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchResults(query);

  const products = (data?.pages ?? []).flatMap((page) =>
    page.products.edges.map(({ node }) => toProductCard(node)),
  );

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const q = input.trim();
    if (q.length > 1) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <section className="container container-padding-x pb-12 pt-7 md:pb-16 md:pt-12">
      <form
        onSubmit={handleSubmit}
        role="search"
        className="mx-auto mb-8 flex max-w-2xl gap-2 items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            enterKeyHint="search"
            placeholder="Search products..."
            className="w-full rounded-full border py-3 pl-11 pr-4 text-base"
          />
        </div>
        <Button
          type="submit"
          className="rounded-full px-6"
          disabled={isLoading}
        >
          Search
        </Button>
      </form>

      {query.length > 1 && (
        <div className="mb-5 flex items-center gap-3">
          <h1 className="text-3xl font-anton uppercase">
            Results for &apos;{query}&apos;
          </h1>
          {products.length > 0 && (
            <span className="text-xs text-[#414651]">
              {products.length}
              {hasNextPage ? "+" : ""} results
            </span>
          )}
          {isFetching && !isFetchingNextPage && (
            <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
          )}
        </div>
      )}

      {query.length < 2 ? (
        <p className="text-center text-gray-500">
          Type at least 2 characters to search.
        </p>
      ) : isLoading ? (
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Loader2 className="animate-spin" />
          <span>Searching...</span>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Info /> Something went wrong. Please try again.
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Info /> No products found for “{query}”. Try different keywords.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard {...product} key={`${product.id} ${i}`} />
          ))}

          {hasNextPage && (
            <Button
              variant="outline"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="col-span-2 mx-auto mt-10 w-fit border-black bg-transparent lg:col-span-4"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
