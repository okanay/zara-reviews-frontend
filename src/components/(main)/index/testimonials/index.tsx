import TestimonialCard from "./card";
import InfiniteScrollContainer from "./group";
import { TESTIMONIALS } from "@/constants/testimonials";

const Testimonials = () => {
  return (
    <section className="relative mt-20 flex max-w-[100vw] flex-col gap-4 overflow-hidden">
      <TestimonialScrollRight />
      <TestimonialScrollLeft />
    </section>
  );
};

const TestimonialGroup = () => {
  const shuffledTestimonials = [...TESTIMONIALS].sort(
    () => Math.random() - 0.5,
  );

  const currentTime = new Date().getTime();
  const uniqueKey = (index: number) => `a${index}-${currentTime}`;

  return (
    <div className="flex gap-4">
      {shuffledTestimonials.map((item, index) => (
        <TestimonialCard key={uniqueKey(index)} {...item} />
      ))}
    </div>
  );
};

const TestimonialScrollRight = () => {
  return (
    <InfiniteScrollContainer
      rotation="Right"
      copyGroupCount={1}
      element={{
        group: <TestimonialGroup />,
        width: 440,
        gap: 16,
        duration: 160,
        cardsPerGroup: TESTIMONIALS.length,
      }}
    />
  );
};

const TestimonialScrollLeft = () => {
  return (
    <InfiniteScrollContainer
      rotation="Left"
      copyGroupCount={1}
      element={{
        group: <TestimonialGroup />,
        width: 440,
        gap: 16,
        duration: 160,
        cardsPerGroup: TESTIMONIALS.length,
      }}
    />
  );
};

export default Testimonials;
