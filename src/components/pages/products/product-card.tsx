import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

function ProductCard({ title, image }: any) {
  if (!title || !image) return null;

  return (
    <div className="shrink-0 h-fit">
      <Link href="#">
        <div className="relative bg-secondary rounded-lg aspect-[1/1.2] flex items-center justify-center p-5 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="hover:scale-110 transition-transform duration-300"
          />

          <ul className="absolute bottom-5 bg-white rounded-full flex items-center gap-1 p-1.5">
            <li className="size-4 shrink-0 rounded-full bg-red-500" />
            <li className="size-4 shrink-0 rounded-full bg-blue-500" />
            <li className="size-4 shrink-0 rounded-full bg-black" />
            <li className="size-4 shrink-0 rounded-full bg-green-500" />
            <li className="size-4 shrink-0 rounded-full bg-gray-200 text-[9px] font-bold flex items-center justify-center">
              +2
            </li>
          </ul>
        </div>

        <span className="text-[10px] uppercase text-[#414651] block mt-5">
          CLASSIC WEAR
        </span>
        <Tooltip>
          <TooltipTrigger className="text-sm font-medium mt-1 mb-2 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-left">
            {title}
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
        <p className="text-primary font-semibold uppercase">AED 149.00</p>
      </Link>
    </div>
  );
}

export default ProductCard;
