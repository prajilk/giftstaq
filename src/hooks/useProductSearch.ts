import { useQuery } from "@tanstack/react-query";
import { searchProductsFromApi } from "@/lib/api/search";
import { searchKeys } from "@/lib/query/keys";
import { useDebounce } from "./useDebounce";

export function useProductSearch(term: string) {
  const debouncedTerm = useDebounce(term, 400);
  const trimmed = debouncedTerm.trim();

  return useQuery({
    queryKey: searchKeys.query(trimmed),
    queryFn: () => searchProductsFromApi(trimmed),
    enabled: trimmed.length > 1, // don't fire on empty/1-char input
    staleTime: 30 * 1000,
  });
}
