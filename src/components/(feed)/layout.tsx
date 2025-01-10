import { AuroraBackground } from "@/components/globals/background";
import Footer from "../footer";
import Header from "../header";

export default function FeedLayout({ children }: LayoutProps) {
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
