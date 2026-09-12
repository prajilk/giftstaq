import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ProductCardData } from "@/lib/shopify/transform";

function ProductCard({
  title,
  image,
  price,
  collectionName,
  colors,
  handle,
}: ProductCardData) {
  if (!title || !image || !price || !collectionName || !handle) return null;

  return (
    <div className="shrink-0 h-fit">
      <Link href={`/products/${handle}`}>
        <div className="relative bg-secondary rounded-lg aspect-[1/1.2] flex items-center justify-center p-5 overflow-hidden">
          <Image
            src={image.url}
            alt={title}
            width={200}
            height={200}
            className="hover:scale-110 transition-transform duration-300"
          />

          {colors.length > 0 && (
            <ul className="absolute bottom-5 bg-white rounded-full flex items-center gap-1 p-1.5">
              {colors.slice(0, 4).map((color) => (
                <li
                  className="size-4 shrink-0 rounded-full"
                  key={color}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
              {colors.length > 4 && (
                <li className="size-4 shrink-0 rounded-full bg-gray-200 text-[9px] font-bold flex items-center justify-center">
                  +{colors.slice(4).length}
                </li>
              )}
            </ul>
          )}
        </div>

        <span className="text-[10px] uppercase text-[#414651] block mt-5">
          {collectionName}
        </span>
        <Tooltip>
          <TooltipTrigger className="text-sm font-medium mt-1 mb-2 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-left">
            {title}
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
        <p className="text-primary font-semibold uppercase">
          AED {price.amount}
        </p>
      </Link>
    </div>
  );
}

export default ProductCard;
