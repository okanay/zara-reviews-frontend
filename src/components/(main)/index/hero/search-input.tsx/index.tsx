"use client";

import { useReviewSearch, useReviewStore } from "@/hooks/use-review-search";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, XCircle } from "lucide-react";

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
        data-result={status === "FOUND" || status === "NOT-FOUND"}
        className="h-12 w-full appearance-none rounded-md border border-primary-200 bg-white px-9 text-sm outline-none transition-all duration-500 focus:border-primary-500 focus:ring-0 data-[result=true]:rounded-b-none data-[result=true]:border-primary-500"
      />

      {/*  Search or Clear button*/}
      <AnimatePresence>
        {status === "SEARCHING" ? (
          <LoadingIndicator />
        ) : (
          search && <ClearButton />
        )}
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

const StatusMessage = () => {
  const { status } = useReviewStore();

  const statusMessages = {
    SEARCHING: "Searching...",
    FOUND: "Found!",
    "NOT-FOUND": "No results found.",
    ERROR: "Something went wrong.",
    IDLE: null,
  };

  const message = statusMessages[status];

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          key={status}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-3 text-start text-sm text-neutral-500"
        >
          {message}
        </motion.p>
      )}
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
