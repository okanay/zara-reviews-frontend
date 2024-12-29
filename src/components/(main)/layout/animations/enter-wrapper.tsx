"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export const MainContentEnterWrapper = ({ children }: Props) => {
  return (
    <motion.main
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{
        opacity: 1,
        pointerEvents: "auto",
      }}
      transition={{
        duration: 0.5,
        delay: 2.5,
        pointerEvents: { delay: 2.35 }, // pointerEvents'in de delay'i olsun
      }}
      className="relative z-40 bg-white text-gray-800"
    >
      {children}
    </motion.main>
  );
};
