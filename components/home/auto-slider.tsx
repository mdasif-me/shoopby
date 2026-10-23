"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export function AutoSlider({
  items,
  label,
}: {
  items: ReactNode[];
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isVisibleRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slider = trackRef.current?.parentElement;
    if (!slider) return;

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(slider);

    const interval = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || document.hidden || !isVisibleRef.current) return;

      const nextIndex = (activeIndexRef.current + 1) % items.length;
      activeIndexRef.current = nextIndex;
      track.scrollTo({
        left: nextIndex * track.clientWidth,
        behavior: "smooth",
      });
    }, 5000);

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [items.length, paused]);

  function updateActiveSlide() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    activeIndexRef.current = Math.round(track.scrollLeft / track.clientWidth);
  }

  return (
    <div
      className="sm:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={updateActiveSlide}
      >
        {items.map((item, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            className="w-full shrink-0 snap-center"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
