import Blogs from "./blogs";
import HeroSection from "./hero";
import Testimonials from "./testimonials";

const IndexPage = () => {
  return (
    <main className="space-y-12 pb-12 md:space-y-16 md:pb-16">
      <HeroSection />
      <Testimonials />
      <Blogs />
    </main>
  );
};

export default IndexPage;
