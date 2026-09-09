import Image from "next/image";
import { Button } from "../ui/button";

const FooterCTASection = () => {
  return (
    <section className="flex">
      <div className="relative w-[30%] hidden lg:block">
        <Image src="/local/f1.webp" alt="Image" fill className="object-cover" />
      </div>
      <div className="container container-padding-x bg-primary space-y-3 flex flex-col lg:items-center lg:justify-center text-white py-12 lg:text-center lg:w-[40%]">
        <Image
          src="/local/logo-silver.webp"
          alt="Logo"
          width={80}
          height={80}
        />
        <h1 className="text-3xl font-anton uppercase max-w-sm">
          Ready to elevate your corporate gifting?
        </h1>
        <p className="max-w-md text-sm">
          Create memorable gifting experiences with premium branded merchandise,
          seamless ordering, and reliable global delivery.
        </p>
        <Button className="bg-white text-black hover:bg-black hover:text-white w-fit mt-5 lg:mt-0">
          Contact Sales
        </Button>
      </div>
      <div className="relative w-[30%] hidden lg:block">
        <Image src="/local/f2.webp" alt="Image" fill className="object-cover" />
      </div>
    </section>
  );
};

export default FooterCTASection;
