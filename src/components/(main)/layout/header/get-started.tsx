import { RippleButton } from "@/components/globals/ripple-button";

export const GetStarted = () => {
  return (
    <RippleButton className="relative flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-neutral-500 bg-gradient-to-bl from-primary-400 to-primary-500 px-4 text-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:ring-opacity-50 active:scale-95 active:bg-primary-600 sm:h-12">
      <span className="text-xs tracking-tight text-neutral-50 antialiased sm:text-sm">
        Get Started
      </span>
    </RippleButton>
  );
};
