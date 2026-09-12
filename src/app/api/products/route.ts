import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/shopify/products";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const first = Math.min(Number(searchParams.get("first")) || 12, 50);
  const after = searchParams.get("after") || undefined;

  try {
    const data = await getProducts(first, after);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Shopify fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
