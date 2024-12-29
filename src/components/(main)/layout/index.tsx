import Footer from "./footer";
import Header from "./header";
import { ImageSlider } from "./animations/sliders";
import { BrandName } from "./animations/brand-name";
import { MainContentEnterWrapper } from "./animations/enter-wrapper";
import { AnimationExitWrapper } from "./animations/exit-wrapper";

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <AnimationExitWrapper>
        <BrandName />
        <ImageSlider />
      </AnimationExitWrapper>
      <MainContentEnterWrapper>
        <div className="flex min-h-svh flex-col justify-between">
          <Header />
          {children}
          <Footer />
        </div>
      </MainContentEnterWrapper>
    </>
  );
}
