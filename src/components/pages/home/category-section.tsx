import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CategoryList from "./category-list";
import { getQueryClient } from "@/lib/query/get-query-client";
import { collectionKeys } from "@/lib/query/keys";
import { getCollections } from "@/lib/shopify/collections";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CategorySection = async () => {
  const queryClient = getQueryClient();

  await queryClient
    .query({
      queryKey: collectionKeys.list(6),
      queryFn: () => getCollections(6),
    })
    .catch(() => {}); // graceful degrade to client-side fetch, same reasoning as the products listing

  return (
    <section className="container container-padding-x py-12 lg:py-16 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-anton uppercase text-3xl lg:text-4xl">
          Find the perfect gift for every occasion
        </h1>
        <Link href="/collections" className="hidden lg:block">
          <Button variant="ghost" className="cursor-pointer">
            View all <ArrowRight />
          </Button>
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryList />
      </HydrationBoundary>
    </section>
  );
};

export default CategorySection;
