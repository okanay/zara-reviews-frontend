"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useImageGallery } from "./use-image-gallery";
import useClickOutside from "@/hooks/use-click-outside";

export const ImageGalleryModal = () => {
  const {
    images,
    currentIndex,
    closeGallery,
    nextImage,
    previousImage,
    isOpen,
  } = useImageGallery();
  const ref = useClickOutside<HTMLImageElement>(closeGallery, isOpen);

  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          previousImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "Escape":
          closeGallery();
          break;
        default:
          break;
      }
    },
    [nextImage, previousImage, closeGallery],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950">
      {/* Close button */}
      <button
        onClick={closeGallery}
        className="absolute right-3 top-3 z-50 rounded-full border border-neutral-400 bg-neutral-50 p-px transition-opacity hover:opacity-100 sm:right-6 sm:top-6 md:opacity-50"
        aria-label="Close gallery"
      >
        <X className="size-6 stroke-neutral-950 sm:size-8" />
      </button>

      {/* Main content wrapper */}
      <div className="relative flex h-full w-full items-center justify-center px-16">
        {/* Image container with max dimensions */}
        <div className="relative h-[85vh] w-full max-w-[1200px]">
          <Image
            ref={ref}
            src={currentImage}
            alt={`Image ${currentIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain"
            quality={100}
          />
        </div>

        {/* Navigation buttons - Positioned outside image container */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="group absolute left-1 flex h-full w-16 items-center justify-start px-2 transition-opacity hover:opacity-100 sm:left-4 md:opacity-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6 stroke-neutral-50 transition-colors group-hover:text-white sm:size-8" />
            </button>
            <button
              onClick={nextImage}
              className="group absolute right-1 flex h-full w-16 items-center justify-end px-2 transition-opacity hover:opacity-100 sm:right-4 md:opacity-50"
              aria-label="Next image"
            >
              <ChevronRight className="size-6 stroke-neutral-50 transition-colors group-hover:text-white sm:size-8" />
            </button>
          </>
        )}

        {/* Image counter - Minimal design */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-neutral-400 sm:bottom-6">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Keyboard navigation hint - Optional */}
      <div className="absolute bottom-6 left-6 hidden text-xs text-neutral-500 sm:block">
        Use arrow keys to navigate
      </div>
    </div>
  );
};
