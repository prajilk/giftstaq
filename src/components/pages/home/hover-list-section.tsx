"use client";

import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const items = [
  {
    title: "Employee Onboarding",
    image: [
      "/local/animation/row1-1.webp",
      "/local/animation/row1-2.webp",
      "/local/animation/row1-3.webp",
      "/local/animation/row1-4.webp",
    ],
  },
  {
    title: "Client appreciation",
    image: [
      "/local/animation/row2-1.webp",
      "/local/animation/row2-2.webp",
      "/local/animation/row2-3.webp",
      "/local/animation/row2-4.webp",
    ],
  },
  {
    title: "Holiday gifting",
    image: [
      "/local/animation/row3-1.webp",
      "/local/animation/row3-2.webp",
      "/local/animation/row3-3.webp",
      "/local/animation/row3-4.webp",
    ],
  },
  {
    title: "Corporate events",
    image: [
      "/local/animation/row4-1.webp",
      "/local/animation/row4-2.webp",
      "/local/animation/row4-3.webp",
      "/local/animation/row4-4.webp",
    ],
  },
];

export default function HoverList() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="container container-padding-x py-12 lg:py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl lg:text-4xl font-anton uppercase max-w-sm">
          Corporate gifting for every business occasion
        </h2>
        <Button
          variant="outline"
          className="bg-transparent border-black hidden lg:block"
        >
          Book a demo
        </Button>
      </div>

      <div className="w-full mt-14 lg:hidden grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div className="flex flex-col gap-4" key={item.title}>
            <Image
              src={item.image[0]}
              alt="Image"
              width={100}
              height={100}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <span className="text-xl font-anton uppercase">{item.title}</span>
          </div>
        ))}
      </div>

      <div className="w-full mt-16 hidden lg:block">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="relative h-30 overflow-hidden border-t border-[#E2D5C4] last:border-b"
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Moving layer */}
            <div
              className={cn(
                "absolute inset-0 flex items-center z-20 bg-white transition-opacity duration-300",
                active === index ? "opacity-100" : "opacity-0",
              )}
            >
              <Marquee className="[--duration:20s] text-black">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex shrink-0 items-center gap-8 px-4"
                  >
                    <span className="text-7xl uppercase font-anton">
                      {item.title}
                    </span>

                    <Image
                      src={item.image[i]}
                      alt="Image"
                      width={100}
                      height={70}
                      className="w-28 h-full aspect-video shrink-0 object-cover rounded-md"
                    />
                  </div>
                ))}
              </Marquee>
            </div>

            {/* Fixed center word */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <span className="text-7xl uppercase text-secondary font-anton">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
