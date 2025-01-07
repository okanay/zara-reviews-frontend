import { ThemeProvider } from "next-themes";
import { DialogueProvider } from "@/components/dialogs";
import { ToastManager } from "./toast";
import { PropsWithChildren } from "react";
import { MainFontWrapper } from "@/assets/fonts";
import { LazyFramerMotion } from "./lazy-motion";

export const MainProviders = async (props: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DialogueProvider>
        <MainFontWrapper>
          <LazyFramerMotion>{props.children}</LazyFramerMotion>
        </MainFontWrapper>
        <ToastManager />
      </DialogueProvider>
    </ThemeProvider>
  );
};
