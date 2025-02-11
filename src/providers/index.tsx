import { ThemeProvider } from "next-themes";
import { ModalProvider } from "@/components/modals";
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
      <MainFontWrapper>
        <LazyFramerMotion>
          <ModalProvider>{props.children}</ModalProvider>
        </LazyFramerMotion>
      </MainFontWrapper>
      <ToastManager />
    </ThemeProvider>
  );
};
