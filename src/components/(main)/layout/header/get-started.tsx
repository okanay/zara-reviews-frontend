import { RippleButton } from "@/components/globals/ripple-button";

export const GetStarted = () => {
  return (
    <RippleButton className="h-10 border-neutral-500 from-neutral-100 to-neutral-50 px-4 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0px_rgb(var(--neutral-100)),inset_0_-2px_0px_rgb(var(--neutral-500))] sm:h-12 sm:px-6">
      Get Started
    </RippleButton>
  );
};
