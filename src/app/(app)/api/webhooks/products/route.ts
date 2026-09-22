import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!;

function verifyWebhook(rawBody: string, hmacHeader: string | null): boolean {
  if (!hmacHeader) return false;
  const digest = crypto
    .createHmac("sha256", SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text(); // must read as raw text BEFORE parsing — HMAC is computed over the raw bytes
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256");

  if (!verifyWebhook(rawBody, hmacHeader)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const topic = request.headers.get("x-shopify-topic");
  const payload = JSON.parse(rawBody);
  const handle: string | undefined = payload.handle;

  if (!handle) {
    return NextResponse.json({ received: true }); // some payloads (e.g. delete) may lack a handle — nothing to revalidate
  }

  switch (topic) {
    case "products/update":
    case "products/create":
      revalidatePath(`/products/${handle}`);
      revalidatePath("/products"); // listing page too, since price/image/title changes should reflect there
      console.log("revalidated", `/products/${handle} and /products`);
      break;
    case "products/delete":
      revalidatePath(`/products/${handle}`);
      revalidatePath("/products");
      console.log("revalidated", `/products/${handle} and /products`);
      break;
  }

  return NextResponse.json({ received: true });
}
