import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/shopify/search";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = (searchParams.get("q")?.trim() ?? "").slice(0, 100);
  const first = Math.min(Number(searchParams.get("first")) || 10, 60);
  const after = searchParams.get("after") || undefined;

  if (!q) {
    return NextResponse.json({
      products: {
        edges: [],
        pageInfo: { hasNextPage: false, endCursor: null },
      },
    });
  }

  try {
    const data = await searchProducts(q, first, after);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Shopify search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
