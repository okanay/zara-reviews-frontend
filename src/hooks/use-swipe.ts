import { RefObject, useState, useCallback, useEffect } from "react";

type UseSwipeParams = {
  ref: RefObject<HTMLDivElement | null>;
  onLeft?: () => void;
  onRight?: () => void;
  minSwipeDistance?: number;
};

export const useSwipe = ({
  ref,
  onLeft,
  onRight,
  minSwipeDistance = 50,
}: UseSwipeParams) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onLeft) {
      onLeft();
    } else if (isRightSwipe && onRight) {
      onRight();
    }
  }, [touchStart, touchEnd, minSwipeDistance, onLeft, onRight]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("touchstart", onTouchStart);
    element.addEventListener("touchmove", onTouchMove);
    element.addEventListener("touchend", onTouchEnd);

    return () => {
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchmove", onTouchMove);
      element.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref, onTouchStart, onTouchMove, onTouchEnd]);
};
