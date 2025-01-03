"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { useDebounce } from "./use-debounce";

// type Get = (state: SearchState) => SearchState;
type Status = "SEARCHING" | "FOUND" | "NOT-FOUND" | "IDLE" | "ERROR";

type SearchState = {
  search: string;
  status: Status;
  actions: {
    setSearch: (search: string) => void;
    setStatus: (status: Status) => void;
    reset: () => void;
  };
};

export const useReviewStore = create<SearchState>()((set) => ({
  search: "",
  status: "IDLE",
  actions: {
    setSearch: (search) => set({ search }),
    setStatus: (status) => set({ status }),
    reset: () => set({ search: "", status: "IDLE" }),
  },
}));

export const useReviewSearch = () => {
  const {
    search,
    actions: { setStatus },
  } = useReviewStore();
  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = async () => {
    if (!debouncedSearch) {
      setStatus("IDLE");
      return;
    }

    setStatus("SEARCHING");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("FOUND");
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch]);
};
