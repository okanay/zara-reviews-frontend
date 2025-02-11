"use client";

import { RippleButton } from "@/components/globals/ripple-button";
import { BlogCards } from "./cards";

const Blogs = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 text-primary-800">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4 text-left">
        <h2
          className="flex flex-col font-serif"
          style={{
            fontSize: "clamp(1.5rem, 0.8182rem + 3.4091vw, 3rem)",
            lineHeight: "clamp(1.5rem, 0.8182rem + 3.4091vw, 3rem)",
          }}
        >
          <span>Learn more about Zara</span>
          <span className="text-primary-500">trending products and more.</span>
        </h2>
        <RippleButton className="relative flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-neutral-400 bg-gradient-to-bl from-primary-300 to-primary-400 px-4 text-center transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-neutral-600 focus:ring-opacity-50 active:scale-95 active:bg-primary-600 md:mr-4">
          <span className="font-sans text-sm tracking-tight text-neutral-50">
            See More
          </span>
        </RippleButton>
      </div>
      <BlogCards />
    </section>
  );
};

export default Blogs;
