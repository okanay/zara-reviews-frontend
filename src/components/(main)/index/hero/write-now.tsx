import { RippleButton } from "@/components/globals/ripple-button";
import { Pen } from "lucide-react";

// after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0px_rgb(var(--neutral-200)),inset_0_-2px_0px_rgb(var(--neutral-300))]

export const WriteNow = () => {
  return (
    <div className="mx-auto -mb-4 flex w-fit items-center justify-center">
      <RippleButton
        className="h-10 rounded-3xl px-4 text-xs after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0px_rgb(var(--neutral-100)),inset_0_-2px_0px_rgb(var(--neutral-500))] sm:h-12 sm:px-6"
        rippleColor="rgb(var(--neutral-200))"
      >
        <span className="flex items-center justify-center gap-2">
          <span className="font-mono font-semibold tracking-tight">
            Write Now
          </span>
          <Pen className="size-3 stroke-primary-600" />
        </span>
      </RippleButton>
    </div>
  );
};
