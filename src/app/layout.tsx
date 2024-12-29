import type { Metadata } from "next";
import "../assets/styles/globals.css";
import { MainProviders } from "@/providers";

export const metadata: Metadata = {
  title: "Zara Reviews",
  description: "Reviews of Zara products.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainProviders>{children}</MainProviders>
      </body>
    </html>
  );
}

declare global {
  type LayoutProps = Readonly<{
    children: React.ReactNode;
  }>;
}
