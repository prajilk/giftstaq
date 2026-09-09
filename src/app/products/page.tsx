import FooterCTASection from "@/components/common/footer-cta-section";
import HeroSection from "@/components/pages/contact-us/hero-section";
import CategoryList from "@/components/pages/home/category-list";
import ProductsListingSection from "@/components/pages/products/products-listing-section";

const ProductsPage = () => {
  return (
    <main>
      <HeroSection img="/local/phero.webp" />
      <div className="container container-padding-x py-10">
        <CategoryList />
      </div>
      <ProductsListingSection />
      <FooterCTASection />
    </main>
  );
};

export default ProductsPage;
