"use client";

import { RippleButton } from "@/components/globals/ripple-button";

const Blogs = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-primary-800">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4 text-left">
        <h2
          className="flex flex-col font-serif"
          style={{
            fontSize: "clamp(1.75rem, 1.1818rem + 2.8409vw, 3rem)",
            lineHeight: "clamp(1.75rem, 1.1818rem + 2.8409vw, 3rem)",
          }}
        >
          <span>Learn more about Zara</span>
          <span className="text-primary-400">trending products, and more.</span>
        </h2>
        <RippleButton className="relative flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-neutral-500 bg-gradient-to-bl from-primary-400 to-primary-500 px-4 text-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:ring-opacity-50 active:scale-95 active:bg-primary-600 sm:h-12">
          <span className="text-nowrap text-xs tracking-tight text-neutral-50 antialiased sm:text-sm">
            Read More
          </span>
        </RippleButton>
      </div>
    </section>
  );
};

export default Blogs;
