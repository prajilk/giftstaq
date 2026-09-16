import { useQuery } from "@tanstack/react-query";
import { fetchCollectionsFromApi } from "@/lib/api/collections";
import { collectionKeys } from "@/lib/query/keys";

export function useCollections(first = 50) {
  return useQuery({
    queryKey: collectionKeys.list(first),
    queryFn: () => fetchCollectionsFromApi(first),
  });
}
