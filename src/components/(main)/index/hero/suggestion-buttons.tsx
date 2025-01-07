"use client";

import { useHorizontalWheelScroll } from "@/hooks/use-horizontal-wheel-scroll";
import { useReviewStore } from "@/hooks/use-review-search";

export const SuggestionsButtons = () => {
  const {
    actions: { setSearch },
  } = useReviewStore();
  const ref = useHorizontalWheelScroll();

  const buttonLabels = [
    "SPRAY SWEATER",
    "BAGGY JEANS",
    "WIDE LEG JEANS",
    "SPRAY SWEATER",
    "FIT JEANS",
  ];

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        className="-mb-2.5 flex items-center justify-center gap-4 overflow-x-auto"
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
