"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DEFAULT_IMAGE_DURATION = 5000; // ms — only used for image slides

type MediaProps = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
};

type HomeHeroProps = {
  id: number;
  title: string;
  description: string;
  background: {
    id: number;
    type: "image" | "video";
    background: MediaProps;
    responsive_image: MediaProps | null;
  }[];
};

const SLIDE_DURATION = 5000; // ms, match your embla autoplay delay
const SLIDE_COUNT = 5;

const Hero = ({
  hero,
  autoPlay = true,
}: Readonly<{ hero: HomeHeroProps; autoPlay?: boolean }>) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // 0-100, applies to the active dot

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  // const plugin = useRef(
  //   Autoplay({
  //     delay: 5000,
  //     stopOnInteraction: false,
  //   }),
  // );

  // keep `current` in sync with embla — fires on manual drag, dot click, and programmatic scroll
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // pause every video except the active one (avoids stacked audio/decoding work)
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i !== current) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [current]);

  // drive progress for the active slide, and auto-advance when it finishes
  useEffect(() => {
    if (!api || !autoPlay) return;

    setProgress(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const slide = hero.background[current];
    const video = videoRefs.current[current];

    if (slide.type === "video" && video) {
      // duration comes from the video itself — progress follows real playback time
      video.currentTime = 0;

      const onTimeUpdate = () => {
        if (video.duration)
          setProgress((video.currentTime / video.duration) * 100);
      };
      const onEnded = () => api.scrollNext();

      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("ended", onEnded);
      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("ended", onEnded);
      };
    }

    // image slide: progress is a fixed-duration timer
    const duration =
      slide.type === "image" ? DEFAULT_IMAGE_DURATION : DEFAULT_IMAGE_DURATION;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        api.scrollNext();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, current, hero.background, autoPlay]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!hero || hero.background.length === 0) return null;

  return (
    <section className="relative w-full -mt-20 h-176 min-h-screen text-white">
      <Carousel
        setApi={setApi}
        opts={{
          watchDrag: false,
          loop: true,
        }}
        // plugins={[plugin.current]}
        className="size-full relative"
      >
        <CarouselContent className="ml-0">
          {hero.background.map((data, index) => {
            if (data.type === "video") {
              videoRefs.current[index] ??= null;
            }

            return (
              <CarouselItem key={index} className="h-176 min-h-screen pl-0">
                <div
                  className="relative flex flex-col justify-center items-center h-full bg-no-repeat bg-center bg-cover gap-32 pb-10"
                  style={
                    data.type === "image"
                      ? {
                          backgroundImage: `url(${isMobile ? "/local/bg.webp" : "/local/bg.webp"})`,
                        }
                      : {}
                  }
                >
                  {data.type === "video" && (
                    <video
                      src={"/local/test.mp4"}
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      autoPlay
                      muted
                      controls={false}
                      playsInline
                      className="absolute inset-0 size-full object-cover pointer-events-none"
                    ></video>
                  )}

                  {/* If each slide have individual content!!! */}
                  {/* <div className="absolute bottom-10 left-10">
                    <Content
                      title={hero.title}
                      description={hero.description}
                    />
                  </div> */}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="absolute z-20 -left-5 lg:left-auto lg:right-0 bottom-6 lg:bottom-10 mx-10">
          <CarouselIndicator
            count={hero.background.length}
            current={current}
            progress={progress}
            onSelect={(i) => api?.scrollTo(i)}
          />
        </div>
      </Carousel>

      {/* If only one content is present in the hero */}
      <div className="absolute z-10 inset-0 flex flex-col lg:flex-row lg:items-end justify-end lg:justify-start gap-10 lg:gap-0 container container-padding-x py-20 lg:py-14">
        <Content title={hero.title} description={hero.description} />
      </div>

      <div className="absolute inset-0 overflow-hidden after:absolute after:w-3/5 after:h-3/5 after:bg-radial after:from-black/60 after:to-transparent after:blur-xl after:-bottom-20 after:-left-32 after:rounded-[100%] before:absolute before:w-[60%] before:h-1/2 before:bg-radial before:from-primary/20 before:to-transparent before:blur-xl before:bottom-[-25%] before:right-[-20%] before:rounded-[100%]"></div>
    </section>
  );
};

export default Hero;

function Content({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-xl space-y-3">
      <h1 className="text-[42px] font-anton leading-12">{title}</h1>
      <p className="font-inter text-sm tracking-[-1%] leading-5">
        {description}
      </p>

      <div className="space-x-3 mt-8">
        <Link href="/contact-us" target="_blank">
          <Button>Explore Products</Button>
        </Link>
        <Link href="/rental-hub" target="_blank">
          <Button variant={"secondary"} className="bg-white">
            Book a Demo
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface CarouselIndicatorProps {
  count: number;
  current: number;
  progress: number; // 0-100, only meaningful for the active dot
  onSelect: (index: number) => void;
}

function CarouselIndicator({
  count,
  current,
  progress,
  onSelect,
}: CarouselIndicatorProps) {
  return (
    <div className="flex w-fit items-center gap-2 rounded-full bg-white/5 backdrop-blur-2xl px-3 py-2">
      {Array.from({ length: count }).map((_, i) => {
        const active = i === current;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={active}
            className="relative h-2.5 shrink-0 overflow-hidden rounded-full bg-white/20 transition-[width] duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ width: active ? 50 : 10 }}
          >
            {active && (
              <span
                className="absolute inset-y-0 left-0 h-full origin-left rounded-full bg-white"
                style={{
                  width: "100%",
                  transform: `scaleX(${progress / 100})`,
                  // short linear smoothing between rAF/timeupdate ticks — 0 on reset avoids a visible snap-back
                  transition: progress > 1 ? "transform 80ms linear" : "none",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
