"use client";

import { useModal } from "@/components/modals/use-modal";
import { twMerge } from "tailwind-merge";
import { ImageGalleryModal } from "./image-gallery-modal";

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
    <>
      <div
        className={twMerge(
          "absolute left-0 top-0 h-screen w-full overflow-y-auto",
          modal === "idle" ? "hidden" : "block",
        )}
      >
        {renderModal()}
      </div>
      {children}
    </>
  );
};
