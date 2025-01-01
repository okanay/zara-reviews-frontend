import { Quote, Star } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  review: string;
  image: string;
  stars: number;
};

export const DUMMY_TESTIMONIAL = {
  name: "Eleanor",
  review:
    "SO CUTE but run SO small size up at least one size if not 2. I'm normally size 10, they wouldn't even zip up, size 12 is snug",
  image:
    "https://static.zara.net/photos/assets/public/d5b5/4f87/efd64fd087b7/b895ed6cd5d6/06045223811-p/w/750/06045223811-p.jpg?ts=1722945459294",
  stars: 2,
};

const TestimonialCard = ({ name, review, image, stars }: Props) => {
  return (
    <div className="relative grid w-[440px] shrink-0 grid-cols-[8rem,_1fr] overflow-hidden rounded-lg border border-neutral-200">
      <Image
        src={image}
        alt={`${name}'s review`}
        width={120}
        height={120}
        className="size-full object-cover grayscale"
      />
      <div className="bg-neutral-50 p-4">
        <p className="block font-serif text-lg">{name}</p>
        <div className="mb-2 flex items-center gap-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              data-like={index < stars}
              className="size-4 fill-neutral-500 stroke-neutral-500 data-[like=true]:fill-yellow-500 data-[like=true]:stroke-yellow-500"
            />
          ))}
        </div>
        <p className="line-clamp-3 font-mono text-xs leading-normal tracking-tighter">
          {review}
        </p>
      </div>
      <Quote className="absolute right-2 top-2 size-5 stroke-primary-500" />
    </div>
  );
};

export default TestimonialCard;
