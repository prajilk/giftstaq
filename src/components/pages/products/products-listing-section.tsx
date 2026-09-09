import FilterContent from "@/components/sheets/filter-content";
import { Button } from "@/components/ui/button";
import { Info, Loader2 } from "lucide-react";
import { SortSelection } from "./sort-selection";
import ProductCard from "./product-card";

const ProductsListingSection = () => {
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
              <span className="text-xs text-[#414651]">21,408 results</span>
            </div>

            <div className="items-center gap-2 hidden lg:flex">
              <span className="whitespace-nowrap text-sm">Sort by: </span>
              <SortSelection />
            </div>
          </div>
          {false ? (
            <div className="w-full flex flex-col justify-center items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" />
              <span>Fetching crane models...</span>
            </div>
          ) : [1, 2].length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-fit mt-5">
                {[1, 2, 3, 4, 5]?.map((model: any) => (
                  <ProductCard
                    crane_capacity={"10"}
                    image={"/local/products/7.webp"}
                    listingType={"rent"}
                    max_lifting_height={"10"}
                    max_working_radius={"10"}
                    title={
                      "Premium Quarter-Zip Performance Pullover for Corporate Teams"
                    }
                    key={model}
                  />
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
              <Info /> No crane models found
            </div>
          )}

          {false && (
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
