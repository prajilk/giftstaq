"use client";

import FilterContent from "@/components/sheets/filter-content";
import { Button } from "@/components/ui/button";
import { Info, Loader2 } from "lucide-react";
import { SortSelection } from "./sort-selection";
import ProductCard from "./product-card";
import { useProducts } from "@/hooks/useProducts";
import { ProductCardData, toProductCard } from "@/lib/shopify/transform";

const ProductsListingSection = () => {
  const { data, isLoading, isError } = useProducts();

  const products = (data?.products.edges ?? []).map(({ node }) =>
    toProductCard(node),
  );

  return (
    <section className="container container-padding-x pb-12 pt-7 md:pb-16 md:pt-12">
      <div className="grid md:grid-cols-4 gap-5">
        {/* Mobile */}
        {/* <FilterSheet
					crane_types={crane_types}
					project_types={project_types}
					manufacturers={manufacturers}
				/> */}

        {/* Desktop */}
        <div className="hidden md:block">
          <FilterContent />
        </div>

        <div className="md:col-span-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h6 className="text-3xl font-anton uppercase">All Products</h6>
              <span className="text-xs text-[#414651]">
                {products?.length} results
              </span>
            </div>

            <div className="items-center gap-2 hidden lg:flex">
              <span className="whitespace-nowrap text-sm">Sort by: </span>
              <SortSelection />
            </div>
          </div>
          {isLoading ? (
            <div className="w-full flex flex-col justify-center items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" />
              <span>Fetching products...</span>
            </div>
          ) : products?.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-fit mt-5">
                {products?.map((product: ProductCardData) => (
                  <ProductCard {...product} key={product.id} />
                ))}

                <Button
                  variant="outline"
                  className="col-span-2 lg:col-span-4 w-fit mx-auto mt-10 border-black bg-transparent"
                >
                  Load More
                </Button>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-2 text-gray-500">
              <Info /> No Products found
            </div>
          )}

          {isError && (
            <div className="md:col-span-3 w-full flex flex-col justify-center items-center gap-2 text-gray-500">
              <Info /> Error:
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsListingSection;
