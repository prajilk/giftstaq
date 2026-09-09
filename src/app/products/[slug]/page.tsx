import FooterCTASection from "@/components/common/footer-cta-section";
import ProductDetailsSection from "@/components/pages/products/product-details-section";
import RelatedProductsSection from "@/components/pages/products/related-products-section";

const ProductDetailPage = () => {
  return (
    <main>
      <ProductDetailsSection />
      <RelatedProductsSection />
      <FooterCTASection />
    </main>
  );
};

export default ProductDetailPage;
