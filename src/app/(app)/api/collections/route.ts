import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/shopify/collections";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const first = Math.min(Number(searchParams.get("first")) || 20, 50);

  try {
    const data = await getCollections(first);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // collections change less often than products
      },
    });
  } catch (error) {
    console.error("Shopify fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 },
    );
  }
}
