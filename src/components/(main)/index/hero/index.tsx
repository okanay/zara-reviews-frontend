import { SearchInput } from "./search-input.tsx/index";
import { WriteNow } from "./write-now";

const HeroSection = () => {
  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6 text-balance px-4 pt-36 text-center">
      <WriteNow />
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

export default HeroSection;
