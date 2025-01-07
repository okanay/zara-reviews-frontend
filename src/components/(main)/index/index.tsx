import Blogs from "./blogs";
import HeroSection from "./hero";
import Testimonials from "./testimonials";

const IndexPage = () => {
  return (
    <main>
      <HeroSection />
      <Testimonials />
      <Blogs />
    </main>
  );
};

export default IndexPage;
