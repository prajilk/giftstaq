import CategoryList from "@/components/pages/home/category-list";
import { getQueryClient } from "@/lib/query/get-query-client";
import { collectionKeys } from "@/lib/query/keys";
import { getCollections } from "@/lib/shopify/collections";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CollectionsPage = async () => {
  const queryClient = getQueryClient();

  await queryClient
    .query({
      queryKey: collectionKeys.list(100),
      queryFn: () => getCollections(100),
    })
    .catch(() => {}); // graceful degrade to client-side fetch, same reasoning as the products listing

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="container container-padding-x pb-12 pt-6 lg:pt-8 lg:pb-16">
        <h1 className="text-3xl lg:text-4xl font-anton uppercase mb-10">
          Collections
        </h1>
        <CategoryList
          first={100}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-3"
        />
      </section>
    </HydrationBoundary>
  );
};

export default CollectionsPage;
