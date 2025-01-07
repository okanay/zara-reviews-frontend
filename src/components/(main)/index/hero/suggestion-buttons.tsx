"use client";

import { useHorizontalWheelScroll } from "@/hooks/use-horizontal-wheel-scroll";
import { useReviewStore } from "@/hooks/use-review-search";
import { useEffect, useRef } from "react";

export const SuggestionsButtons = () => {
  // prettier-ignore
  const { actions: { setSearch }} = useReviewStore();

  const ref = useHorizontalWheelScroll();
  const containerRef = useRef(null);

  const buttonLabels = [
    "SPRAY SWEATER",
    "BAGGY JEANS",
    "WIDE LEG JEANS",
    "SPRAY SWEATER",
    "FIT JEANS",
  ];

  useEffect(() => {
    const scrollToCenter = () => {
      if (ref.current) {
        const { scrollWidth, clientWidth } = ref.current;
        ref.current.scrollLeft = (scrollWidth - clientWidth) / 2;
      }
    };
    if (containerRef.current) {
      const container = containerRef.current as HTMLDivElement;
      container.style.visibility = "hidden";
      scrollToCenter();
      container.style.visibility = "visible";
    }
  }, [ref]);

  return (
    <div className="relative flex flex-col gap-4">
      <div className="pointer-events-none absolute left-0 z-10 flex h-10 w-full items-center justify-between sm:hidden">
        <div className="h-full w-4 bg-gradient-to-r from-white to-transparent" />
        <div className="h-full w-4 bg-gradient-to-l from-white to-transparent" />
      </div>

      <div
        ref={ref}
        className="relative -mb-2.5 flex items-center justify-center gap-4 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {buttonLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => setSearch(label)}
            className="w-fit flex-shrink-0 rounded-sm border border-neutral-200 bg-white p-3 text-xs transition-[color_transform] duration-500 hover:border-primary-500 focus:outline-none focus:ring-0 active:scale-95"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
