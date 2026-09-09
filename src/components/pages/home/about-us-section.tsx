"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { forwardRef, useEffect, useRef } from "react";

const AboutUsSection = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(
      [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
      {
        rotate: 0,
        x: 0,
        duration: 1,
        ease: "power2.out",
        overwrite: true,
      },
    );
  };

  const handleMouseLeave = () => {
    gsap.to(card1Ref.current, {
      rotate: -3,
      duration: 1,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(card2Ref.current, {
      rotate: 5,
      duration: 1,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(card3Ref.current, {
      rotate: 10,
      x: -35,
      duration: 1,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(card4Ref.current, {
      rotate: -7,
      duration: 1,
      ease: "power2.out",
      overwrite: true,
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!triggerRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.out",
      },
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top bottom-=100",
      },
    });

    tl.to(card1Ref.current, { rotate: -3 })
      .to(card2Ref.current, { rotate: 5 }, "<")
      .to(
        card3Ref.current,
        {
          rotate: 10,
          transformOrigin: "right bottom",
          x: -35,
        },
        "<",
      )
      .to(card4Ref.current, { rotate: -7 }, "<");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="bg-[#E2D5C4]">
      <div className="container container-padding-x py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-5 lg:gap-0">
          <h1 className="text-3xl lg:text-4xl font-anton uppercase max-w-lg">
            Making corporate gifting simple, thoughtful and memorable
          </h1>
          <div className="space-y-4 lg:space-y-6">
            <p className="max-w-lg">
              Giftstaq helps businesses create meaningful connections through
              premium corporate gifts and branded merchandise. From custom
              branding to reliable delivery
            </p>
            <Button variant={"secondary"} className="bg-white">
              Learn More About Us
            </Button>
          </div>
        </div>

        <div className="flex lg:hidden gap-4 group mt-12 overflow-x-scroll scrollbar-thin">
          <Card
            value="500+"
            label="Premium Products"
            description="Explore a curated collection of high-quality corporate gifts and
            branded merchandise for every business occasion."
            ref={null}
            className="w-[80%]"
          />
          <Card image="/local/img1.webp" ref={null} className="w-[80%]" />
          <Card
            value="1,000+"
            description="Businesses trust Giftstaq for reliable fulfillment and timely delivery of corporate gifting campaigns."
            label="Orders Delivered"
            color="red"
            ref={null}
            className="w-[80%]"
          />
          <Card image="/local/img2.webp" ref={null} className="w-[80%]" />
        </div>

        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden lg:grid grid-cols-4 gap-4 group mt-20"
        >
          <Card
            value="500+"
            label="Premium Products"
            description="Explore a curated collection of high-quality corporate gifts and
            branded merchandise for every business occasion."
            ref={card1Ref}
          />
          <Card image="/local/img1.webp" ref={card2Ref} />
          <Card
            value="1,000+"
            description="Businesses trust Giftstaq for reliable fulfillment and timely delivery of corporate gifting campaigns."
            label="Orders Delivered"
            color="red"
            ref={card3Ref}
          />
          <Card image="/local/img2.webp" ref={card4Ref} />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

type CardProps = {
  value?: string;
  label?: string;
  description?: string;
  image?: string;
  color?: "red" | "white";
  className?: string;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ value, label, description, image, color = "white", className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden aspect-[1/1.2] rounded-xl p-6 shrink-0",
          color === "white" ? "bg-white" : "bg-primary",
          className,
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={"image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-1">
              <h5
                className={cn(
                  "font-anton text-3xl",
                  color === "white" ? "text-primary" : "text-white",
                )}
              >
                {value}
              </h5>
              <span
                className={cn(
                  "font-semibold",
                  color === "white" ? "text-black" : "text-white",
                )}
              >
                {label}
              </span>
            </div>

            <p
              className={cn(
                "font-medium text-sm",
                color === "white" ? "text-black" : "text-white",
              )}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    );
  },
);
