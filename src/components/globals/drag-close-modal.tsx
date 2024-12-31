"use client";
import React, { PropsWithChildren, useState, useRef } from "react";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import useMeasure from "react-use-measure";

export const DragCloseDrawer: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [drawerRef, { height }] = useMeasure();
  const [scope, animate] = useAnimate();
  const y = useMotionValue(0);
  const controls = useDragControls();
  const dragButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    await animate("#drawer", {
      y: [yStart, height],
    });
    setOpen(false);
  };

  const handleDragStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    controls.start(e);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 right-0 z-10 bg-neutral-800/20"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-0 h-[75vh] w-full rounded-t-3xl bg-neutral-50"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              const currentY = y.get();
              if (typeof currentY === "number" && currentY >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-50 p-4">
              <button
                ref={dragButtonRef}
                onPointerDown={handleDragStart}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  if (dragButtonRef.current) {
                    const touch = e.touches[0];
                    const pointerEvent = new PointerEvent("pointerdown", {
                      clientX: touch.clientX,
                      clientY: touch.clientY,
                      pointerId: 1,
                    });
                    dragButtonRef.current.dispatchEvent(pointerEvent);
                  }
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-primary-500 transition-all duration-500 focus:outline-none focus:ring-0 active:scale-95 active:cursor-grabbing active:bg-primary-600"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-auto p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
