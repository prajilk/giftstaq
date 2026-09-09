import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CategoryList from "./category-list";

const CategorySection = () => {
  return (
    <section className="container container-padding-x py-12 lg:py-16 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-anton uppercase text-3xl lg:text-4xl">
          Find the perfect gift for every occasion
        </h1>
        <Link href="/" className="hidden lg:block">
          <Button variant="ghost" className="cursor-pointer">
            View all <ArrowRight />
          </Button>
        </Link>
      </div>
      <CategoryList />
    </section>
  );
};

export default CategorySection;
