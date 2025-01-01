import TestimonialCard, { DUMMY_TESTIMONIALS } from "./card";
import InfiniteScrollContainer from "./group";

const Testimonials = () => {
  return (
    <div className="relative mt-20 flex max-w-[100vw] flex-col gap-4 overflow-hidden">
      <TestimonialScrollRight />
      <TestimonialScrollLeft />
      <TestimonialScrollRight />
    </div>
  );
};

const TestimonialGroup = () => {
  const shuffledTestimonials = [...DUMMY_TESTIMONIALS].sort(
    () => Math.random() - 0.5,
  );
  return (
    <div className="flex gap-4">
      {shuffledTestimonials.map((item, index) => (
        <TestimonialCard key={"a" + index} {...item} />
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
        cardsPerGroup: DUMMY_TESTIMONIALS.length,
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
        cardsPerGroup: DUMMY_TESTIMONIALS.length,
      }}
    />
  );
};

export default Testimonials;
