import { revalidatePath } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";

export const revalidateHomepage: GlobalAfterChangeHook = async ({
  doc,
  req,
}) => {
  req.payload.logger.info("Revalidating homepage");
  revalidatePath("/");
  return doc;
};

export const revalidateContactPage: GlobalAfterChangeHook = async ({
  doc,
  req,
}) => {
  req.payload.logger.info("Revalidating contact page");
  revalidatePath("/contact-us");
  return doc;
};

export const revalidateProductListingPage: GlobalAfterChangeHook = async ({
  doc,
  req,
}) => {
  req.payload.logger.info("Revalidating product listing page");
  revalidatePath("/products");
  return doc;
};

export const revalidateProductPage: GlobalAfterChangeHook = async ({
  doc,
  req,
}) => {
  req.payload.logger.info("Revalidating all product pages (CTA changed)");
  revalidatePath("/products", "layout");
  return doc;
};

export const revalidateHeaderOrFooter: GlobalAfterChangeHook = async ({
  doc,
  req,
}) => {
  req.payload.logger.info("Revalidating header/footer across all pages");
  revalidatePath("/", "layout");
  return doc;
};
