import Image from "next/image";
import { Button } from "../ui/button";
import type { FooterCtaBlock } from "@/payload-types";
import { isImage } from "payload/shared";
import Link from "next/link";

const FooterCTASection = ({
  description,
  heading,
  image1,
  image2,
  link,
  logo,
}: FooterCtaBlock) => {
  return (
    <section className="flex">
      <div className="relative w-[30%] hidden lg:block">
        {typeof image1 !== "string" &&
          image1.mimeType &&
          isImage(image1.mimeType) &&
          image1.url && (
            <Image
              src={image1.url}
              alt={image1.alt}
              fill
              className="object-cover"
            />
          )}
      </div>
      <div className="container container-padding-x bg-primary space-y-3 flex flex-col lg:items-center lg:justify-center text-white py-12 lg:text-center lg:w-[40%]">
        {typeof logo !== "string" &&
          logo.mimeType &&
          isImage(logo.mimeType) &&
          logo.url && (
            <Image src={logo.url} alt={logo.alt} width={80} height={80} />
          )}
        <h1 className="text-3xl font-anton uppercase max-w-sm">{heading}</h1>
        <p className="max-w-md text-sm">{description}</p>
        <Link href={link.href} target={link.isExternal ? "_blank" : "_self"}>
          <Button className="bg-white text-black hover:bg-black hover:text-white w-fit mt-5 lg:mt-0">
            {link.label}
          </Button>
        </Link>
      </div>
      <div className="relative w-[30%] hidden lg:block">
        {typeof image2 !== "string" &&
          image2.mimeType &&
          isImage(image2.mimeType) &&
          image2.url && (
            <Image
              src={image2.url}
              alt={image2.alt}
              fill
              className="object-cover"
            />
          )}
      </div>
    </section>
  );
};

export default FooterCTASection;
