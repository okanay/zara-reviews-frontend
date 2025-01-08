import { RippleButton } from "@/components/globals/ripple-button";

export const GetStarted = () => {
  return (
    <RippleButton className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-neutral-500 bg-gradient-to-bl from-primary-400 to-primary-500 px-4 py-2 text-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:ring-opacity-50 active:scale-95 active:bg-primary-600 sm:py-3.5">
      <span className="font-sans text-xs tracking-tight text-neutral-50 antialiased sm:text-sm">
        Get Started
      </span>
    </RippleButton>
  );
};
