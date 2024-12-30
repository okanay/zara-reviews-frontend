import Footer from "./footer";
import Header from "./header";
import { ImageSlider } from "./animations/sliders";
import { BrandName } from "./animations/brand-name";
import { MainContentEnterWrapper } from "./animations/enter-wrapper";
import { AnimationExitWrapper } from "./animations/exit-wrapper";
import { AuroraBackground } from "../background";

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <AnimationExitWrapper>
        <BrandName />
        <ImageSlider />
      </AnimationExitWrapper>
      <MainContentEnterWrapper>
        <AuroraBackground />
        <div className="relative z-10">
          <Header />
          {children}
          <Footer />
        </div>
      </MainContentEnterWrapper>
    </>
  );
}
