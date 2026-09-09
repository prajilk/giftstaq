import { Marquee } from "../ui/marquee";

const OfferBanner = () => {
  return (
    <Marquee
      pauseOnHover
      className="[--duration:20s] bg-primary text-primary-foreground text-sm z-70"
    >
      <span>Exclusive 10% OFF on brands</span>
      <span>Exclusive 10% OFF on brands</span>
    </Marquee>
  );
};

export default OfferBanner;
