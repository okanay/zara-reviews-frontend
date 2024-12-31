"use client";

import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props extends React.ComponentProps<"input"> {
  initialChecked?: boolean;
}

export const ToggleButton: React.FC<Props> = ({
  initialChecked = false,
  ...props
}) => {
  const [checked, setChecked] = useState(initialChecked);
  const [isMouseDown, setIsMouseDown] = useState(false);
  return (
    <div
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      className="flex items-center space-x-4 antialiased"
    >
      <label
        className={twMerge(
          "relative flex h-7 w-[60px] cursor-pointer items-center rounded-full border border-transparent px-1 shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] transition duration-200",
          checked ? "bg-primary-500" : "border-neutral-500 bg-neutral-700",
        )}
      >
        <motion.div
          initial={{
            width: "20px",
            x: checked ? 0 : 32,
          }}
          animate={{
            height: isMouseDown ? "16px" : ["20px", "10px", "20px"],
            width: ["20px", "30px", "20px", "20px"],
            x: checked ? 32 : 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          key={String(checked)}
          className={twMerge(
            "z-10 block h-[20px] rounded-full bg-white shadow-md",
          )}
        ></motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="hidden"
          {...props}
        />
      </label>
    </div>
  );
};
