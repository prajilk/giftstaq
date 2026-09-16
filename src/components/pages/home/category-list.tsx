"use client";

import { useCollections } from "@/hooks/useCollections";
import { ShopifyCollectionDetail } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CategoryList = ({
  first = 6,
  className,
}: {
  first?: number;
  className?: string;
}) => {
  const { data, isLoading, isError } = useCollections(first);

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Something went wrong.</div>;

  const collections = data?.collections.edges.map((e) => e.node) ?? [];

  return (
    <div
      className={cn(
        "flex items-center justify-evenly overflow-x-scroll scrollbar-thin lg:scrollbar-none gap-5 lg:gap-0",
        className,
      )}
    >
      {collections.map((collection) => (
        <CategoryItem
          key={collection.id}
          image={collection.image}
          title={collection.title}
          href={`/collections/${collection.handle}`}
        />
      ))}
    </div>
  );
};

export default CategoryList;

function CategoryItem({
  image,
  title,
  href,
}: {
  image: ShopifyCollectionDetail["image"];
  title: string;
  href: string;
}) {
  return (
    <Link href={href} className="shrink-0 flex flex-col items-center gap-5">
      <div className="group bg-secondary rounded-full size-44 flex items-center justify-center overflow-hidden shrink-0">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || "Category"}
            width={110}
            height={110}
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
      </div>
      <span className="uppercase font-medium text-sm">{title}</span>
    </Link>
  );
}
