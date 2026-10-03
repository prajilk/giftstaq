import { NextRequest, NextResponse } from "next/server";
import { getCollectionByHandle } from "@/lib/shopify/collections";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ handle: string }> },
) {
  const { handle } = await params;
  const searchParams = request.nextUrl.searchParams;
  const first = Math.min(Number(searchParams.get("first")) || 12, 50);
  const after = searchParams.get("after") || undefined;
  const sortKey = searchParams.get("sortKey") || "COLLECTION_DEFAULT";
  const reverse = searchParams.get("reverse") === "true";

  try {
    const data = await getCollectionByHandle(
      handle,
      first,
      after,
      sortKey,
      reverse,
    );
    if (!data.collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Shopify fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch collection" },
      { status: 500 },
    );
  }
}
