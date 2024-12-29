"use client";
import { motion } from "framer-motion";

const CONFIG = {
  ANIMATION: {
    DURATION: 0.8,
    BASE_DELAY: 0.65,
    STEP_DELAY: 0.04,
  },
  STYLE: {
    INITIAL: {
      y: "100%",
      color: "rgba(0,0,0)",
      filter: "blur(12px)",
      scale: 1.45,
    },
    FINAL: {
      y: 0,
      color: "rgba(255,255,255)",
      filter: "blur(0px)",
      scale: 1,
    },
  },
  EASE: "easeOut",
} as const;

// Bu fonksiyon merkeze olan uzaklığı hesaplar
const getDistanceFromCenter = (index: number, total: number) => {
  const center = Math.floor(total / 2);
  return Math.abs(center - index);
};

// Bu fonksiyon merkeze olan uzaklığa göre gecikme süresini hesaplar
const calculateDelay = (index: number, total: number) => {
  const distanceFromCenter = getDistanceFromCenter(index, total);
  return (
    CONFIG.ANIMATION.BASE_DELAY +
    distanceFromCenter * CONFIG.ANIMATION.STEP_DELAY
  );
};

// Animasyon geçiş ayarlarını oluşturur
const createTransition = (delay: number) => ({
  y: { duration: CONFIG.ANIMATION.DURATION, delay, ease: CONFIG.EASE },
  color: {
    duration: CONFIG.ANIMATION.DURATION,
    delay: delay + 0.35,
    ease: CONFIG.EASE,
  },
  filter: {
    duration: CONFIG.ANIMATION.DURATION,
    delay: delay + 0.25,
    ease: CONFIG.EASE,
  },
  scale: {
    duration: CONFIG.ANIMATION.DURATION,
    delay: delay + 0.45,
    ease: CONFIG.EASE,
  },
});

const renderLetters = (text: string[]) => (
  <div className="relative z-30 flex justify-center">
    {text.map((letter, index) => {
      const delay = calculateDelay(index, text.length);

      return (
        <span key={index} className="relative overflow-hidden tracking-widest">
          <span className="invisible">{letter}</span>
          <motion.span
            initial={CONFIG.STYLE.INITIAL}
            animate={CONFIG.STYLE.FINAL}
            transition={createTransition(delay)}
            className="absolute left-0 top-0 font-serif"
          >
            {letter}
          </motion.span>
        </span>
      );
    })}
  </div>
);

export const BrandName = () => {
  const nameUp = "ZARA".split("");
  const nameDown = "REVIEWS".split("");

  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-black text-center text-6xl font-bold lg:text-7xl">
      {renderLetters(nameUp)}
      {renderLetters(nameDown)}
    </div>
  );
};
