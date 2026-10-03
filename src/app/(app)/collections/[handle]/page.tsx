import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getQueryClient } from "@/lib/query/get-query-client";
import { getCollectionByHandle } from "@/lib/shopify/collections";
import { collectionProductKeys } from "@/lib/query/keys";
import { COLLECTION_SORT_MAP } from "@/lib/shopify/sort";
import CollectionPageContent from "@/components/pages/collections/collection-page-content";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const queryClient = getQueryClient();
  const { sortKey, reverse } = COLLECTION_SORT_MAP.latest;

  // First, a plain fetch just to confirm the collection exists (for notFound())
  let initialData;
  try {
    initialData = await getCollectionByHandle(
      handle,
      12,
      undefined,
      sortKey,
      reverse,
    );
  } catch (error) {
    console.error("Shopify fetch error for collection:", handle, error);
    throw error;
  }

  if (!initialData?.collection) {
    notFound();
  }

  // Now prefetch into the cache using the SAME shape useInfiniteQuery expects
  await queryClient.infiniteQuery({
    queryKey: collectionProductKeys.list(handle, 12, "latest"),
    queryFn: ({ pageParam }) =>
      getCollectionByHandle(
        handle,
        12,
        pageParam as string | undefined,
        sortKey,
        reverse,
      ),
    initialPageParam: undefined as string | undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CollectionPageContent handle={handle} />
    </HydrationBoundary>
  );
}
