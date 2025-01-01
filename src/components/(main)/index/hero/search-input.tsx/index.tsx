"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useState, useEffect } from "react";
import { Search, Loader2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SearchInput() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      setIsSearching(true);
      setNotFound(false);

      setTimeout(() => {
        const dummyResults = [
          `Result 1 for "${debouncedSearch}"`,
          `Result 2 for "${debouncedSearch}"`,
          `Result 3 for "${debouncedSearch}"`,
        ];

        setResults(dummyResults);
        setIsSearching(false);
        setNotFound(dummyResults.length === 0);
      }, 1000);
    } else {
      setResults([]);
      setNotFound(false);
    }
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-[16.5px] h-4 w-4 text-neutral-400" />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="h-12 w-full rounded-md border border-primary-200 bg-white px-9 text-sm outline-none transition-colors duration-500 focus:border-primary-500 focus:ring-0"
      />
      <AnimatePresence>
        {isSearching ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-3 top-[16.5px]"
          >
            <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
          </motion.div>
        ) : (
          search && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearch("")}
              className="absolute right-3 top-[16.5px] focus:outline-none focus:ring-0"
            >
              <XCircle className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
            </motion.button>
          )
        )}
      </AnimatePresence>

      <div className="absolute left-0 top-[100%] z-20 mt-3 space-y-3">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.p
              key="searching"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-sm text-neutral-500"
            >
              Searching...
            </motion.p>
          ) : notFound ? (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 text-sm text-neutral-500"
            >
              <XCircle className="h-4 w-4" />
              <span>No results found</span>
            </motion.div>
          ) : (
            results.map((result, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-sm"
              >
                {result}
              </motion.p>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
