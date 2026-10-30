import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { SimpleHeroBlock } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { isImage } from "payload/shared";

const HeroSection = ({
  backgroundImage,
  description,
  title,
  page = "Contact us",
}: SimpleHeroBlock & {
  page?: string;
}) => {
  return (
    <section>
      <div className="container container-padding-x py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/">Home</Link>} />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary">{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="relative w-full min-h-100 lg:min-h-auto max-h-120 aspect-[1/0.4] flex items-end lg:items-center justify-start after:absolute after:inset-0 after:bg-linear-to-tr after:from-black/50 after:to-transparent">
        {typeof backgroundImage !== "string" &&
          backgroundImage.mimeType &&
          isImage(backgroundImage.mimeType) &&
          backgroundImage.url && (
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-[80%_50%] lg:object-center"
            />
          )}

        <div className="relative z-10 text-white container container-padding-x space-y-2 pb-10 lg:pb-0">
          <h1 className="text-4xl lg:text-5xl font-anton uppercase max-w-2xl lg:leading-14">
            {title}
          </h1>
          <p className="max-w-lg">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
