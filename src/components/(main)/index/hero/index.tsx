import { SearchInput } from "./search-input.tsx/index";
import { SuggestionsButtons } from "./suggestion-buttons";
import { WriteNow } from "./write-now";

const HeroSection = () => {
  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6 text-balance px-4 pt-28 text-center">
      <WriteNow />
      <h1
        className="font-thin tracking-tight"
        style={{
          fontSize: "clamp(2.5rem, 1.1364rem + 6.8182vw, 4rem)",
          lineHeight: "clamp(2.5rem, 1.1364rem + 6.8182vw, 4rem)",
        }}
      >
        Find Your Perfect{" "}
        <span className="font-serif tracking-tight text-neutral-800">Zara</span>{" "}
        Style
      </h1>
      <p
        style={{
          fontSize: "clamp(0.75rem, 0.3409rem + 2.0455vw, 1.2rem)",
        }}
        className="text-pretty font-light leading-relaxed tracking-wider text-neutral-950"
      >
        Get honest <span>reviews</span>, real photos, and <span>community</span>{" "}
        insights about Zara products. <span>Search</span> by product code or URL
        to start exploring.
      </p>
      <SuggestionsButtons />
      <SearchInput />
    </section>
  );
};

export default HeroSection;
