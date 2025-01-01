import TestimonialCard, { DUMMY_TESTIMONIAL } from "./card";
import InfiniteScrollContainer from "./group";

const Testimonials = () => {
  return (
    <div className="relative mt-16 flex max-w-[100vw] flex-col gap-4 overflow-hidden sm:mt-24">
      <TestimonialScrollRight />
      <TestimonialScrollLeft />
      <TestimonialScrollRight />
    </div>
  );
};

const TestimonialGroup = () => {
  return [...Array(5)].map((_, index) => (
    <TestimonialCard key={index} {...DUMMY_TESTIMONIAL} />
  ));
};

const TestimonialScrollRight = () => {
  return (
    <InfiniteScrollContainer
      rotation="Right"
      copyGroupCount={2}
      element={{
        group: <TestimonialGroup />,
        width: 440,
        gap: 16,
        duration: 60,
        cardsPerGroup: 5,
      }}
    />
  );
};

const TestimonialScrollLeft = () => {
  return (
    <InfiniteScrollContainer
      rotation="Left"
      copyGroupCount={2}
      element={{
        group: <TestimonialGroup />,
        width: 440,
        gap: 16,
        duration: 60,
        cardsPerGroup: 5,
      }}
    />
  );
};

export default Testimonials;
