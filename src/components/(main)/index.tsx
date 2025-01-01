import { Pen } from "lucide-react";
import { RippleButton } from "../globals/ripple-button";
import { SearchInput } from "./search-input.tsx";
import InfiniteScrollContainer from "./testimonials/group";
import TestimonialCard, { DUMMY_TESTIMONIAL } from "./testimonials/card";

const IndexPage = () => {
  return (
    <main className="pt-44">
      <HeroSection />

      <div className="relative mt-16 flex max-w-[100vw] flex-col gap-4 overflow-hidden sm:mt-24">
        <TestimonialScrollRight />
        <TestimonialScrollLeft />
        <TestimonialScrollRight />
      </div>
    </main>
  );
};

const HeroSection = () => {
  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6 text-balance px-4 text-center">
      <div className="mx-auto -mb-4 flex w-fit items-center justify-center">
        <RippleButton
          className="h-10 rounded-3xl px-4 text-xs after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0px_rgb(var(--neutral-50)),inset_0_-2px_0px_rgb(var(--primary-700))] sm:h-12 sm:px-6"
          rippleColor="rgb(var(--neutral-200))"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="font-mono font-semibold tracking-tight">
              Write Now
            </span>
            <Pen className="size-3 stroke-neutral-800" />
          </span>
        </RippleButton>
      </div>
      <h1
        style={{
          fontSize: "clamp(2rem, -0.0192rem + 8.9744vw, 3.75rem)",
          lineHeight: "clamp(2.25rem, -0.0192rem + 8.9744vw, 4rem)",
        }}
        className="bg-gradient-to-r from-primary-700 to-primary-950 bg-clip-text font-thin text-transparent"
      >
        Find Your Perfect{" "}
        <span className="font-serif font-thin tracking-tight">Zara</span> Style
      </h1>
      <p
        style={{
          fontSize: "clamp(0.85rem, 0.5038rem + 1.5385vw, 1.15rem)",
          lineHeight: "clamp(1.35rem, 0.3885rem + 2.0513vw, 1.75rem)",
        }}
        className="font-medium leading-relaxed tracking-wider text-neutral-800"
      >
        Get honest <span>reviews</span>, real photos, and <span>community</span>{" "}
        insights about Zara products. <span>Search</span> by product code or URL
        to start exploring.
      </p>

      <SearchInput />
    </section>
  );
};

const TestimonialGroup = () => {
  return [...Array(5)].map((_, index) => (
    <TestimonialCard key={index} {...DUMMY_TESTIMONIAL} />
  ));
};

const TestimonialScrollRight = () => {
  return (
    <InfiniteScrollContainer
      rotation="Right"
      copyGroupCount={2}
      element={{
        group: <TestimonialGroup />,
        width: 440,
        gap: 16,
        duration: 45,
        cardsPerGroup: 5,
      }}
    />
  );
};

const TestimonialScrollLeft = () => {
  return (
    <InfiniteScrollContainer
      rotation="Left"
      copyGroupCount={2}
      element={{
        group: <TestimonialGroup />,
        width: 440,
        gap: 16,
        duration: 45,
        cardsPerGroup: 5,
      }}
    />
  );
};

export default IndexPage;
