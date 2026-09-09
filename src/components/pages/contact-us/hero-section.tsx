import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";

const HeroSection = ({ img }: { img: string }) => {
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
              <BreadcrumbPage className="text-primary">
                Contact us
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="relative w-full min-h-100 lg:min-h-auto max-h-120 aspect-[1/0.4] flex items-end lg:items-center justify-start after:absolute after:inset-0 after:bg-linear-to-tr after:from-black/50 after:to-transparent">
        <Image
          src={img}
          alt="Hero"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover object-[80%_50%] lg:object-center"
        />

        <div className="relative z-10 text-white container container-padding-x space-y-2 pb-10 lg:pb-0">
          <h1 className="text-4xl lg:text-5xl font-anton uppercase max-w-2xl lg:leading-14">
            Let's create memorable gifting experiences together
          </h1>
          <p className="max-w-lg">
            Have a question or planning a corporate gifting project? Our team is
            here to help you find the perfect solution for your business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
