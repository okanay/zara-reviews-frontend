import Footer from "./footer";
import Header from "./header";
import { AuroraBackground } from "./animations/background";

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
