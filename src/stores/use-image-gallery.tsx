"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GalleryState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  state: {
    status: "idle" | "loading" | "error";
    message: string | null;
  };
}

interface GalleryActions {
  openGallery: (images: string[], startIndex?: number) => void;
  closeGallery: () => void;
  nextImage: () => void;
  previousImage: () => void;
  setCurrentIndex: (index: number) => void;
}

type GalleryStore = GalleryState & GalleryActions;

export const useImageGallery = create<GalleryStore>()(
  immer((set) => ({
    isOpen: false,
    images: [],
    currentIndex: 0,
    state: {
      status: "idle",
      message: null,
    },

    openGallery: (images, startIndex = 0) => {
      set((state) => {
        state.isOpen = true;
        state.images = images;
        state.currentIndex = startIndex;
      });
    },

    closeGallery: () => {
      set((state) => {
        state.isOpen = false;
        state.images = [];
        state.currentIndex = 0;
      });
    },

    nextImage: () => {
      set((state) => {
        if (state.currentIndex < state.images.length - 1) {
          state.currentIndex += 1;
        } else {
          state.currentIndex = 0; // Loop back to first image
        }
      });
    },

    previousImage: () => {
      set((state) => {
        if (state.currentIndex > 0) {
          state.currentIndex -= 1;
        } else {
          state.currentIndex = state.images.length - 1; // Loop to last image
        }
      });
    },

    setCurrentIndex: (index) => {
      set((state) => {
        state.currentIndex = index;
      });
    },
  })),
);
