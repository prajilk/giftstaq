import type { Header } from "@/payload-types";
import { Marquee } from "../ui/marquee";
import { Dot } from "lucide-react";
import { Fragment } from "react";

const OfferBanner = ({ offers }: { offers: Header["offers"] }) => {
  return (
    <Marquee
      pauseOnHover
      className="[--duration:20s] bg-primary text-primary-foreground text-sm z-70"
    >
      {offers.map((offer, i) => (
        <Fragment key={i}>
          <span key={i}>{offer.offer}</span>
          <Dot size={20} />
        </Fragment>
      ))}
    </Marquee>
  );
};

export default OfferBanner;
