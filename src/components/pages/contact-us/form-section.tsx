import ContactForm from "@/components/forms/contact-form";
import Call from "@/components/icons/call";
import Mail from "@/components/icons/mail";
import PinDrop from "@/components/icons/pin-drop";
import type { FormBlock } from "@/payload-types";
import Link from "next/link";

const FormSection = ({
  address,
  description,
  heading,
  mail,
  phone,
}: FormBlock) => {
  return (
    <section className="container container-padding-x py-12 lg:py-16 grid lg:grid-cols-5 gap-20">
      <div className="lg:col-span-2">
        <h2 className="text-4xl font-anton uppercase">Contact Information</h2>
        <div className="grid grid-cols-2 gap-3 mt-10">
          <div className="bg-secondary rounded-lg p-6">
            <Call />
            <label className="uppercase text-sm mt-4 mb-1 block">
              Phone number
            </label>
            <Link href={`tel:${phone}`}>
              <span className="font-anton text-lg uppercase block">
                {phone}
              </span>
            </Link>
          </div>
          <div className="bg-secondary rounded-lg p-6">
            <Mail />
            <label className="uppercase text-sm mt-4 mb-1 block">
              Email Address
            </label>
            <Link href={`mailto:${mail}`}>
              <span className="font-anton text-lg uppercase block">{mail}</span>
            </Link>
          </div>
          <div className="bg-secondary rounded-lg p-6 col-span-2">
            <PinDrop />
            <label className="uppercase text-sm mt-4 mb-1 block">Address</label>
            <span className="font-anton text-lg uppercase block">
              {address}
            </span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <h2 className="text-4xl font-anton uppercase">{heading}</h2>
        <p className="mt-2 mb-6">{description}</p>

        <ContactForm />
      </div>
    </section>
  );
};

export default FormSection;
