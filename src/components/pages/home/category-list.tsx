import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  return (
    <div className="flex items-center justify-evenly overflow-x-scroll scrollbar-thin gap-5 lg:gap-0">
      <CategoryItem src="/local/c1.webp" />
      <CategoryItem src="/local/c2.webp" />
      <CategoryItem src="/local/c3.webp" />
      <CategoryItem src="/local/c4.webp" />
      <CategoryItem src="/local/c5.webp" />
      <CategoryItem src="/local/c6.webp" />
    </div>
  );
};

export default CategoryList;

function CategoryItem({ src }: { src: string }) {
  return (
    <Link href="/" className="shrink-0">
      <div className="group bg-secondary rounded-full size-44 flex items-center justify-center overflow-hidden shrink-0">
        <Image
          src={src}
          alt="Category"
          width={110}
          height={110}
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </Link>
  );
}
