import { Pen } from "lucide-react";
import { RippleButton } from "../globals/ripple-button";
import { SearchInput } from "./search-input.tsx";

const IndexPage = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start py-44">
      <section className="flex max-w-2xl flex-col gap-6 text-balance px-4 text-center">
        <div className="mx-auto -mb-4 flex w-fit items-center justify-center">
          <RippleButton
            className="h-auto rounded-full border border-neutral-600 from-neutral-100 to-neutral-50 px-6 py-3 text-xs"
            rippleColor="rgb(var(--neutral-200))"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="font-mono font-semibold text-neutral-600">
                Write Now
              </span>
              <Pen className="size-3 stroke-neutral-600" />
            </span>
          </RippleButton>
        </div>
        <h1 className="bg-gradient-to-r from-primary-700 to-primary-950 bg-clip-text text-6xl font-thin text-transparent">
          Find Your Perfect{" "}
          <span className="font-serif font-thin tracking-tight">Zara</span>{" "}
          Style
        </h1>
        <p className="text-lg font-medium leading-relaxed tracking-wider text-neutral-800">
          Get honest <span>reviews</span>, real photos, and{" "}
          <span>community</span> insights about Zara products.{" "}
          <span>Search</span> by product code or URL to start exploring.
        </p>

        <SearchInput />
      </section>
    </main>
  );
};

export default IndexPage;
