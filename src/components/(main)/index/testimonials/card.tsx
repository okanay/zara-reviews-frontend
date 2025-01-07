import { Hash, Star } from "lucide-react";
import Image from "next/image";

type Props = {
  authorName: string;
  productId: string;
  review: string;
  image: string;
  stars: number;
};

const TestimonialCard = ({
  authorName,
  productId,
  review,
  image,
  stars,
}: Props) => {
  return (
    <div className="relative grid w-[440px] shrink-0 grid-cols-[8rem,_1fr] overflow-hidden rounded-sm border border-neutral-200">
      <Image
        src={image}
        alt={`${authorName}'s review`}
        width={120}
        height={120}
        className="size-full object-cover"
      />
      <div className="bg-neutral-50/5 p-4">
        <p className="block font-serif text-lg">{authorName}</p>
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
      <div className="absolute right-2 top-2 flex h-fit w-fit items-center gap-0.5 stroke-primary-500 text-end text-xs">
        <span>{productId}</span>
        <Hash className="size-3.5 text-xs" />
      </div>
    </div>
  );
};

export default TestimonialCard;
