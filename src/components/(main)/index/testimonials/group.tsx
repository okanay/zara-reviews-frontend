"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  rotation: "Left" | "Right";
  copyGroupCount: number;
  element?: {
    group: React.ReactNode;
    width: number;
    gap: number;
    duration: number;
    cardsPerGroup: number;
  };
};

const InfiniteScrollContainer = ({
  rotation = "Left",
  copyGroupCount = 2,
  element,
}: Props) => {
  if (!element) return null;
  const { group, width, gap, duration, cardsPerGroup } = element;

  // Doğru grup genişliği hesaplaması
  const GROUP_WIDTH = cardsPerGroup * (width + gap) - gap;

  // Grupları oluştur
  const groups = Array(copyGroupCount + 1)
    .fill(null)
    .map((_, index) => ({
      id: index,
      content: group,
    }));

  const getAnimationConfig = () => {
    if (rotation === "Left") {
      return {
        initial: { x: 0 },
        animate: { x: -GROUP_WIDTH },
        style: {
          gap: `${gap}px`,
          left: 0,
        },
      };
    } else {
      return {
        initial: { x: -GROUP_WIDTH },
        animate: { x: 0 },
        style: {
          gap: `${gap}px`,
          right: 0,
        },
      };
    }
  };

  const animationConfig = getAnimationConfig();

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex"
        initial={animationConfig.initial}
        animate={animationConfig.animate}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        }}
        style={animationConfig.style}
      >
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex flex-shrink-0"
            style={{
              width: `${GROUP_WIDTH}px`,
              gap: `${gap}px`,
            }}
          >
            {group.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScrollContainer;
