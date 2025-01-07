"use client";

import useClickOutside from "@/hooks/use-click-outside";
import { useReviewSearch, useReviewStore } from "@/hooks/use-review-search";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export const SearchInput = () => {
  const { search, status, actions } = useReviewStore();
  const { setSearch } = actions;

  // This is a custom effect hook that handles the search logic.
  useReviewSearch();

  return (
    <div className="relative">
      <SearchIcon />
      <input
        type="search"
        value={search}
        name="zara-search"
        list="zara-search-suggestions"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="h-12 w-full appearance-none rounded-md border border-primary-200 bg-white px-9 text-sm outline-none transition-all duration-500 hover:border-primary-500 focus:border-primary-500 focus:ring-0"
      />

      {/*  Search or Clear button*/}
      <AnimatePresence>
        {status === "SEARCHING" ? <LoadingIndicator /> : <ClearButton />}
      </AnimatePresence>

      {/* Result Container */}
      <div className="absolute left-0 top-[100%] z-20 mt-0 w-full space-y-3">
        <AnimatePresence mode="wait">
          <StatusMessage />
        </AnimatePresence>
      </div>
    </div>
  );
};

const FoundResults = () => {
  // prettier-ignore
  const { status, actions : { reset } } = useReviewStore();
  const ref = useClickOutside<HTMLDivElement>(reset, status === "FOUND");

  useEffect(() => {
    const top = Number(ref.current?.getBoundingClientRect().top) - 200;

    window.scrollTo({ top, behavior: "smooth" });
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, type: "spring" },
      }}
      exit={{ opacity: 0, y: 0, height: 0 }}
      key="found"
      style={{ scrollbarWidth: "none" }}
      className="relative z-20 mt-3 grid max-h-[520px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] overflow-hidden overflow-y-auto rounded-md border border-neutral-200 bg-white object-top text-start text-sm text-neutral-500"
    >
      <Link href="#" className="group relative h-full w-full">
        <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-primary-500/10" />
        <Image
          src="https://static.zara.net/photos/2024/V/0/2/p/1538/460/800/2/w/750/1538460800_1_1_1.jpg?ts=1707468667945"
          alt="Zara Logo"
          width={240}
          height={360}
          className="h-[360px] w-full object-cover object-top"
        />
        <div className="origin-top px-4 py-4 transition-all duration-300">
          <h3 className="text-sm font-semibold">BAGGY FIT JEANS</h3>
          <p className="text-xs text-neutral-400">
            Baggy jeans. Five pockets. Washed effect. Front zip and button
            closure.
          </p>
        </div>
      </Link>
      <Link href="#" className="group relative h-full w-full">
        <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-primary-500/10" />
        <Image
          src="https://static.zara.net/photos/assets/public/d5b5/4f87/efd64fd087b7/b895ed6cd5d6/06045223811-p/w/750/06045223811-p.jpg?ts=1722945459294"
          alt="Zara Logo"
          width={240}
          height={360}
          className="h-[360px] w-full object-cover object-top"
        />
        <div className="origin-top px-4 py-4 transition-all duration-300">
          <h3 className="text-sm font-semibold">TRF MID-RISE WIDE LEG JEANS</h3>
          <p className="text-xs text-neutral-400">
            Five pocket jeans with a mid waist and belt loops. Front zip and
            metal button closure.
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const StatusMessage = () => {
  const { status } = useReviewStore();

  return (
    <AnimatePresence mode="wait">
      {(() => {
        switch (status) {
          case "SEARCHING":
            return (
              <motion.p
                {...ANIMATION_PROPS}
                key="searching"
                className="mt-3 text-start text-sm text-neutral-500"
              >
                Searching...
              </motion.p>
            );
          case "NOT-FOUND":
            return (
              <motion.p
                {...ANIMATION_PROPS}
                key="not-found"
                className="mt-3 text-start text-sm text-neutral-500"
              >
                No results found.
              </motion.p>
            );
          case "ERROR":
            return (
              <motion.p
                {...ANIMATION_PROPS}
                key="error"
                className="mt-3 text-start text-sm text-neutral-500"
              >
                Something went wrong.
              </motion.p>
            );
          case "FOUND":
            return <FoundResults />;
          default:
            return null;
        }
      })()}
    </AnimatePresence>
  );
};

const ClearButton = () => {
  const { actions } = useReviewStore();
  const { setSearch } = actions;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSearch("")}
      className="absolute right-3 top-[16.5px] focus:outline-none focus:ring-0"
    >
      <XCircle className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
    </motion.button>
  );
};

const LoadingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute right-3 top-[16.5px]"
  >
    <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
  </motion.div>
);

const SearchIcon = () => (
  <Search className="absolute left-3 top-[16.5px] h-4 w-4 text-neutral-400" />
);

const ANIMATION_PROPS = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
} as const;
