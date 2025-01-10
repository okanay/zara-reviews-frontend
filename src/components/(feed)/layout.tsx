import { AuroraBackground } from "@/components/globals/background";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
