import Image from "next/image";

const ServicesSection = () => {
  return (
    <section className="bg-secondary">
      <div className="container container-padding-x py-7 lg:py-10 flex items-center justify-evenly overflow-x-scroll scrollbar-thin lg:scrollbar-none gap-5 lg:gap-0">
        <Service
          img="/local/verified.svg"
          title="Bulk Ordering"
          description="Easy ordering for teams and events."
        />
        <Service
          img="/local/globe.svg"
          title="Worldwide Shipping"
          description="Delivery gifts across the globe."
        />
        <Service
          img="/local/delivery_truck_bolt.svg"
          title="Fast Delivery"
          description="Quick and worldwide shipping."
        />
        <Service
          img="/local/support_agent.svg"
          title="Dedicated Support"
          description="Expert guidance at every step."
        />
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
  img: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <Image src={img} alt="Services" width={50} height={50} />
      <div>
        <h6 className="text-lg font-semibold leading-7">{title}</h6>
        <p className="text-[#414651] text-sm leading-5">{description}</p>
      </div>
    </div>
  );
}
