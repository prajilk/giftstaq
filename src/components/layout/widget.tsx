import { FileText, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Media } from "@/payload-types";

const Widget = ({
  whatsapp_number,
  mail,
  catalog,
}: {
  whatsapp_number?: string | null;
  mail?: string | null;
  catalog?: Media | null | string;
}) => {
  if (!whatsapp_number && !mail && !catalog) return null;
  return (
    <div className="flex flex-col gap-3 fixed bottom-5 right-4 md:right-6 z-90">
      {catalog && typeof catalog !== "string" && (
        <Tooltip>
          <TooltipTrigger>
            <Link href={catalog?.url ?? ""} target="_blank">
              <div
                aria-label="Catalog"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg hover:bg-white/80 transition cursor-pointer"
              >
                <FileText />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">View Catalog</TooltipContent>
        </Tooltip>
      )}
      {whatsapp_number && (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`https://wa.me/${whatsapp_number.replaceAll(" ", "")}`}
              target="_blank"
            >
              <div
                aria-label="WhatsApp"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition cursor-pointer"
              >
                <Image
                  src={"/whatsapp.webp"}
                  alt="whatsapp"
                  width={25}
                  height={25}
                />
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">Get a sample for free</TooltipContent>
        </Tooltip>
      )}
      {mail && (
        <Link href={`mailto:${mail}`} target="_blank">
          <button
            aria-label="Email"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/80 transition cursor-pointer"
          >
            <Mail />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Widget;
