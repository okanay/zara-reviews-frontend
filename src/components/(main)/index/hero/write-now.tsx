import { RippleButton } from "@/components/globals/ripple-button";
import { Pen } from "lucide-react";

export const WriteNow = () => {
  return (
    <div className="mx-auto -mb-4 flex w-fit items-center justify-center">
      <RippleButton
        className="relative flex h-10 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-neutral-600 bg-gradient-to-bl from-neutral-50 to-neutral-100 px-5 text-center text-sm tracking-tight text-neutral-700 antialiased transition-all duration-300 ease-in-out after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0px_rgb(var(--neutral-100)),inset_0_-2px_0px_rgb(var(--neutral-500))] focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-50 active:scale-95 active:bg-primary-600 sm:h-12"
        rippleColor="rgb(var(--neutral-200))"
      >
        <span className="flex items-center justify-center gap-2">
          <span className="font-sans font-semibold tracking-tight">
            Write Now
          </span>
          <Pen className="size-3 stroke-primary-600" />
        </span>
      </RippleButton>
    </div>
  );
};
