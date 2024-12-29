"use client";

import { useModal } from "@/components/dialogs/use-modal";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
};

export const DialogueProvider = ({ children }: Props) => {
  const { modal } = useModal();

  const renderDialog = () => {
    switch (modal) {
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
        {renderDialog()}
      </div>
      {children}
    </>
  );
};
