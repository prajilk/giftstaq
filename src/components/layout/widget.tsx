import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Widget = ({
  whatsapp_number,
  mail,
}: {
  whatsapp_number: string;
  mail: string;
}) => {
  if (!whatsapp_number && !mail) return null;
  return (
    <div className="flex flex-col gap-3 fixed bottom-5 right-4 md:right-6 z-90">
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
