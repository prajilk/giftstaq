import { getPayload } from "payload";
import config from "@payload-config";
import FooterCTASection from "@/components/common/footer-cta-section";
import type { ReactNode } from "react";

export default async function ProductsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const payload = await getPayload({ config });
  const productPage = await payload.findGlobal({ slug: "product" });

  return (
    <>
      {children}
      {productPage.layout?.map((block, index) => {
        switch (block.blockType) {
          case "footer-cta":
            return <FooterCTASection key={index} {...block} />;

          default:
            return null;
        }
      })}
    </>
  );
}
