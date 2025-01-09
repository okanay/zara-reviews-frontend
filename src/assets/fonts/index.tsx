import React, { PropsWithChildren } from "react";

import { Noto_Serif } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";

const serif = Noto_Serif({
  subsets: ["latin-ext"],
  weight: ["100", "300", "500", "700"],
  fallback: ["serif"],
  variable: "--font-serif",
  preload: true,
});

export const mono = Geist_Mono({
  subsets: ["latin-ext"],
  weight: ["400"],
  fallback: ["monospace"],
  variable: "--font-mono",
  preload: true,
});

export const sans = Geist({
  subsets: ["latin-ext"],
  weight: ["200", "400", "600", "800"],
  fallback: ["sans-serif"],
  variable: "--font-sans",
  preload: true,
});

export const MainFontWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={`${serif.variable} ${mono.variable} ${sans.variable} antialiased`}
    >
      {children}
    </div>
  );
};
