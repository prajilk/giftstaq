import Image from "next/image";

const dummyData = [
  {
    id: 1,
    src: "/local/icons/nike.svg",
  },
  {
    id: 2,
    src: "/local/icons/patagonia.svg",
  },
  {
    id: 3,
    src: "/local/icons/stanley.svg",
  },
  {
    id: 4,
    src: "/local/icons/the north face.svg",
  },
  {
    id: 5,
    src: "/local/icons/thule.svg",
  },
  {
    id: 6,
    src: "/local/icons/herschel.svg",
  },
  {
    id: 7,
    src: "/local/icons/gildan.svg",
  },
  {
    id: 8,
    src: "/local/icons/yeti.svg",
  },
];

const LogoCloudSection = () => {
  return (
    <section className="bg-primary">
      <div className="container container-padding-x py-12 lg:py-16 text-white space-y-4">
        <h1 className="text-3xl lg:text-4xl font-anton uppercase">
          Trusted business across industries
        </h1>
        <p>Delivering premium corporate gifts with confidence.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-12">
          {dummyData.map((item) => (
            <Card src={item.src} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloudSection;

function Card({ src }: { src: string }) {
  return (
    <div className="bg-[#C31B24] rounded-md aspect-video flex justify-center items-center">
      <Image
        src={src}
        alt="Logo Cloud"
        width={130}
        height={100}
        className="aspect-3/2 object-contain"
      />
    </div>
  );
}
