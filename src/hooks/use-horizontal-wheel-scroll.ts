"use client";
import { useCallback, useEffect, useRef } from "react";

export const useHorizontalWheelScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (!ref.current || e.deltaY === 0 || e.deltaX !== 0) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY;
    const currPos = ref.current.scrollLeft;
    const scrollWidth = ref.current.scrollWidth;

    const newPos = Math.max(0, Math.min(scrollWidth, currPos + delta));

    ref.current.scrollLeft = newPos;
  }, []);

  useEffect(() => {
    ref.current?.addEventListener("wheel", (e: WheelEvent) => {
      onWheel(e as unknown as React.WheelEvent<HTMLDivElement>);
    });
  }, [onWheel]);

  return ref;
};
