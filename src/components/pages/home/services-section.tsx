import type { Media, ServicesBlock } from "@/payload-types";
import Image from "next/image";
import { isImage } from "payload/shared";

const ServicesSection = ({ services }: ServicesBlock) => {
  if (!services) return null;
  return (
    <section className="bg-secondary">
      <div className="container container-padding-x py-7 lg:py-10 flex items-center justify-evenly overflow-x-scroll scrollbar-thin lg:scrollbar-none gap-5 lg:gap-0">
        {services.map((s) => (
          <Service
            img={s.icon}
            title={s.title}
            description={s.description}
            key={s.id}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

function Service({
  img,
  title,
  description,
}: {
  img: Media | string;
  title: string;
  description: string;
}) {
  if (
    typeof img === "string" ||
    !img.url ||
    !img.mimeType ||
    !isImage(img.mimeType)
  )
    return null;
  return (
    <div className="flex items-center gap-2 shrink-0">
      <Image src={img.url} alt="Services" width={50} height={50} />
      <div>
        <h6 className="text-lg font-semibold leading-7">{title}</h6>
        <p className="text-[#414651] text-sm leading-5">{description}</p>
      </div>
    </div>
  );
}
