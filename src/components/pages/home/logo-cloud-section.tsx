import type { LogoCloudBlock } from "@/payload-types";
import Image from "next/image";
import { isImage } from "payload/shared";

const LogoCloudSection = ({ description, heading, logos }: LogoCloudBlock) => {
  if (!logos) return null;
  return (
    <section className="bg-primary">
      <div className="container container-padding-x py-12 lg:py-16 text-white space-y-4">
        <h1 className="text-3xl lg:text-4xl font-anton uppercase">{heading}</h1>
        <p>{description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-12">
          {logos.map((item) => {
            if (
              typeof item === "string" ||
              (item.mimeType && !isImage(item.mimeType)) ||
              !item.url
            )
              return null;
            return <Card src={item.url} alt={item.alt} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default LogoCloudSection;

function Card({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-[#C31B24] rounded-md aspect-video flex justify-center items-center">
      <Image
        src={src}
        alt={alt}
        width={130}
        height={100}
        className="aspect-3/2 object-contain"
      />
    </div>
  );
}
