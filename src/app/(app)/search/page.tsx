import type { Metadata } from "next";
import SearchPageContent from "./search-page-content";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false }, // keep search result pages out of Google
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw) ?? "";

  // key={q} remounts the component when the query changes, which resets the input
  return <SearchPageContent key={q} initialQuery={q} />;
}
