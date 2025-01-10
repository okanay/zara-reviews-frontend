"use client";
/* eslint-disable */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useModal } from "@/stores/use-modal-store";
import { useEffect } from "react";

declare module "@/stores/use-modal-store" {
  interface ModalStore {
    modal: ModalType;
    setModal: (modal: ModalType) => void;
    closeModal: () => void;
  }
}

interface GalleryState {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  modalStore: any;
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
  setModalStore: (store: any) => void;
}

type GalleryStore = GalleryState & GalleryActions;

export const useImageGallery = create<GalleryStore>()(
  immer((set, get) => ({
    isOpen: false,
    images: [],
    currentIndex: 0,
    modalStore: null,
    state: {
      status: "idle",
      message: null,
    },

    setModalStore: (store) => {
      set((state) => {
        state.modalStore = store;
      });
    },

    openGallery: (images, startIndex = 0) => {
      const { modalStore } = get();

      set((state) => {
        state.isOpen = true;
        state.images = images;
        state.currentIndex = startIndex;
      });

      modalStore?.setModal("image-gallery");
    },

    closeGallery: () => {
      const { modalStore } = get();

      set((state) => {
        state.isOpen = false;
        state.images = [];
        state.currentIndex = 0;
      });

      modalStore?.closeModal();
    },

    nextImage: () => {
      set((state) => {
        if (state.currentIndex < state.images.length - 1) {
          state.currentIndex += 1;
        } else {
          state.currentIndex = 0;
        }
      });
    },

    previousImage: () => {
      set((state) => {
        if (state.currentIndex > 0) {
          state.currentIndex -= 1;
        } else {
          state.currentIndex = state.images.length - 1;
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

// Helper hook to initialize modalStore
export const useInitImageGallery = () => {
  const modalStore = useModal();
  const setModalStore = useImageGallery((state) => state.setModalStore);

  // Set modal store reference when component mounts
  useEffect(() => {
    setModalStore(modalStore);
  }, [modalStore, setModalStore]);
};
