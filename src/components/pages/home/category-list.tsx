"use client";

import { useCollections } from "@/hooks/useCollections";
import { ShopifyCollectionDetail } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CategoryList = ({
  first = 5,
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
        "flex items-center justify-evenly overflow-x-scroll scrollbar-thin lg:scrollbar-none gap-5 lg:gap-0 pb-3",
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
      <div className="relative flex flex-col group bg-secondary rounded-xl w-22 h-24 md:w-56 md:h-64 overflow-hidden">
        <div className="relative flex items-center justify-center shrink-0 size-full">
          {image && (
            <Image
              src={image.url}
              alt={image.altText || "Category"}
              // width={110}
              // height={110}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              loading="eager"
              unoptimized
            />
          )}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-1/3 backdrop-blur-md
           [mask-image:linear-gradient(to_top,black_30%,transparent)]
           [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent)]"
        ></div>

        <div className="absolute z-10 bottom-0 uppercase font-medium text-sm w-full py-3 flex justify-center items-center text-white font-anton md:text-2xl">
          <span>{title}</span>
        </div>
      </div>
    </Link>
    // <div className="relative w-56 h-60 overflow-hidden rounded-2xl">
    //   <Image src={image.url} fill alt="Apparels" className="block w-full" />

    //   <div
    //     className="absolute inset-x-0 bottom-0 h-1/3 backdrop-blur-md
    //        [mask-image:linear-gradient(to_top,black_30%,transparent)]
    //        [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent)]"
    //   ></div>

    //   <h3 className="absolute inset-x-0 bottom-6 text-center text-3xl font-bold uppercase text-white">
    //     Apparels
    //   </h3>
    // </div>
  );
}
