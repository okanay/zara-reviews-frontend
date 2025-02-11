"use client";

import { useReviewStore } from "@/hooks/use-review-search";
import { XCircle } from "lucide-react";

export const MobileFixedClear = () => {
  const {
    status,
    actions: { reset },
  } = useReviewStore();

  return (
    <button
      className={`${status === "FOUND" ? "translate-y-0" : "translate-y-full"} fixed bottom-0 left-0 z-20 flex w-full items-center justify-center gap-2 border-t border-neutral-200 bg-primary-300/70 p-4 text-center shadow-md backdrop-blur transition-transform duration-300 ease-out focus:outline-none focus:ring-0 sm:hidden`}
      onClick={reset}
    >
      <XCircle className="size-4 stroke-primary-50" />
      <span className="font-semibold tracking-wide text-primary-50">
        Clear Search Result
      </span>
    </button>
  );
};
