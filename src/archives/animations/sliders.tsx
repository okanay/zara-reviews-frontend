"use client";

import Image2 from "../../../../../public/image-2.jpg";
import Image3 from "../../../../../public/image-3.jpg";
import Image4 from "../../../../../public/image-4.jpg";
import Image7 from "../../../../../public/image-7.jpg";
import Image6 from "../../../../../public/image-6.jpg";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const ImageSlider = () => {
  return (
    <AnimatePresence>
      <section className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          initial={{ filter: "blur(0px)", opacity: 0 }}
          animate={{
            opacity: [1, 0],
            filter: "blur(1.3px) contrast(10%) brightness(10%)",
            y: "-100%",
          }}
          transition={{
            y: { delay: 0.9, ease: "easeInOut", duration: 0.65 },
            opacity: { delay: 0.9, ease: "easeInOut", duration: 0.65 },
            filter: { delay: 0.25, ease: "linear", duration: 1 },
          }}
          className="h-full w-full bg-gray-200"
        >
          <Image
            src={Image7}
            alt="image-1"
            placeholder="blur"
            priority
            quality={60}
            fetchPriority="high"
            className="h-screen w-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ filter: "blur(0px)", opacity: 0 }}
          animate={{
            opacity: [1, 0],
            filter: "blur(1.3px) contrast(10%) brightness(10%)",
            y: "-100%",
          }}
          transition={{
            y: { delay: 1, ease: "easeInOut", duration: 0.65 },
            opacity: { delay: 0.9, ease: "easeInOut", duration: 0.65 },
            filter: { delay: 0.25, ease: "linear", duration: 1 },
          }}
          className="h-full w-full bg-gray-200"
        >
          <Image
            src={Image4}
            alt="image-1"
            placeholder="blur"
            priority
            quality={60}
            fetchPriority="high"
            className="h-screen w-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{
            width: "0%",
            filter: "blur(2px) contrast(50%) brightness(50%)",
            opacity: 0,
          }}
          animate={{
            width: "var(--width-to)",
            filter: "blur(0px) contrast(100%) brightness(100%)",
            opacity: [0, 1],
            y: "-135%",
            zoom: "125%",
          }}
          transition={{
            y: { delay: 1.1, ease: "easeInOut", duration: 0.65 },
            width: { delay: 0.15, ease: "easeInOut", duration: 0.65 },
            opacity: { delay: 0.3, ease: "easeInOut", duration: 0.65 },
            zoom: { delay: 0.65, ease: "easeInOut", duration: 0.1 },
            filter: { delay: 0.25, ease: "linear", duration: 1 },
          }}
          className="h-full flex-shrink-0 bg-gray-400 object-right [--width-to:75%] sm:[--width-to:55%]"
        >
          <Image
            src={Image2}
            alt="image-1"
            placeholder="blur"
            priority
            quality={60}
            fetchPriority="high"
            className="h-screen w-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ filter: "blur(0px)", opacity: 0 }}
          animate={{
            opacity: [1, 0],
            filter: "blur(1.3px) contrast(10%) brightness(10%)",
            y: "-100%",
          }}
          transition={{
            y: { delay: 1, ease: "easeInOut", duration: 0.65 },
            opacity: { delay: 0.9, ease: "easeInOut", duration: 0.65 },
            zoom: { delay: 0.65, ease: "easeInOut", duration: 0.1 },
            filter: { delay: 0.25, ease: "linear", duration: 1 },
          }}
          className="h-full w-full bg-gray-200"
        >
          <Image
            src={Image3}
            alt="image-1"
            placeholder="blur"
            priority
            quality={60}
            fetchPriority="high"
            className="h-screen w-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ filter: "blur(0px)", opacity: 0 }}
          animate={{
            opacity: [1, 0],
            filter: "blur(1.3px) contrast(10%) brightness(10%)",
            y: "-100%",
          }}
          transition={{
            y: { delay: 0.9, ease: "easeInOut", duration: 0.65 },
            opacity: { delay: 0.9, ease: "easeInOut", duration: 0.65 },
            zoom: { delay: 0.65, ease: "easeInOut", duration: 0.1 },
            filter: { delay: 0.25, ease: "linear", duration: 1 },
          }}
          className="h-full w-full bg-gray-200"
        >
          <Image
            src={Image6}
            alt="image-1"
            placeholder="blur"
            priority
            quality={60}
            fetchPriority="high"
            className="h-screen w-full object-cover object-[75%]"
          />
        </motion.div>
      </section>
    </AnimatePresence>
  );
};
