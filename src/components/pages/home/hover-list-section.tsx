"use client";

import { ContactFormModal } from "@/components/forms/form-modal";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import type { HoverMarqueeBlock } from "@/payload-types";
import Image from "next/image";
import { isImage } from "payload/shared";
import { useState } from "react";

export default function HoverList({ heading, rows }: HoverMarqueeBlock) {
  const [active, setActive] = useState<number | null>(null);

  if (!rows) return null;

  return (
    <section className="container container-padding-x py-12 lg:py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl lg:text-4xl font-anton uppercase max-w-sm">
          {heading}
        </h2>

        <ContactFormModal>
          <Button
            variant="outline"
            className="bg-transparent border-black hidden lg:block"
          >
            Book a demo
          </Button>
        </ContactFormModal>
      </div>

      <div className="w-full mt-14 lg:hidden grid grid-cols-2 gap-4">
        {rows.map((item) => (
          <div className="flex flex-col gap-4" key={item.id || item.label}>
            {typeof item.images[0] !== "string" &&
              item.images[0].mimeType &&
              isImage(item.images[0].mimeType) &&
              item.images[0].url && (
                <Image
                  src={item.images[0].url}
                  alt={item.images[0].alt}
                  width={100}
                  height={100}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              )}
            <span className="text-xl font-anton uppercase">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full mt-16 hidden lg:block">
        {rows.map((item, index) => (
          <div
            key={item.id || item.label}
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
                      {item.label}
                    </span>

                    {typeof item.images[i] !== "string" &&
                      item.images[i].mimeType &&
                      isImage(item.images[i].mimeType) &&
                      item.images[i].url && (
                        <Image
                          src={item.images[i].url}
                          alt="Image"
                          width={100}
                          height={70}
                          className="w-28 h-full aspect-video shrink-0 object-cover rounded-md"
                        />
                      )}
                  </div>
                ))}
              </Marquee>
            </div>

            {/* Fixed center word */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <span className="text-7xl uppercase text-secondary font-anton">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
