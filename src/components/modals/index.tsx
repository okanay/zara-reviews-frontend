"use client";

import { useModal } from "@/stores/use-modal-store";
import { twMerge } from "tailwind-merge";
import { ImageGalleryModal } from "./image-gallery";
import { ImageGalleryInit } from "./image-gallery/init";

type Props = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const { modal } = useModal();

  const renderModal = () => {
    switch (modal) {
      case "image-gallery":
        return <ImageGalleryModal />;
      default:
        return null;
    }
  };

  return (
    <ImageGalleryInit>
      <div
        className={twMerge(
          "absolute left-0 top-0 h-screen w-full overflow-y-auto",
          modal === "idle" ? "hidden" : "block",
        )}
      >
        {renderModal()}
      </div>
      {children}
    </ImageGalleryInit>
  );
};
