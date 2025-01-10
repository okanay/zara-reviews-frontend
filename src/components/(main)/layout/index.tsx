import Footer from "@/components/footer";
import Header from "@/components/header";
import { AuroraBackground } from "@/components/globals/background";

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
