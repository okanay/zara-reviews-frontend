import { Quote, Star } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  review: string;
  image: string;
  stars: number;
};

export const DUMMY_TESTIMONIALS = [
  {
    name: "Eleanor",
    review: `SO CUTE but run SO small size up at least one size if not 2. I'm normally size 10, they wouldn't even zip up, size 12 is snug`,
    image:
      "https://static.zara.net/photos/assets/public/d5b5/4f87/efd64fd087b7/b895ed6cd5d6/06045223811-p/w/750/06045223811-p.jpg?ts=1722945459294",
    stars: 2,
  },
  {
    name: "John",
    review:
      "Great quality and fits perfectly. I am very satisfied with my purchase.",
    image:
      "https://static.zara.net/photos/2023/I/0/1/p/3199/802/805/2/w/750/3199802805_1_1_1.jpg?ts=1692865109223",
    stars: 5,
  },
  {
    name: "Alice",
    review:
      "The material is nice but the color is not as vibrant as shown in the picture.",
    image:
      "https://static.zara.net/photos/2024/V/0/2/p/1538/460/800/2/w/750/1538460800_1_1_1.jpg?ts=1707468667945",
    stars: 3,
  },
  {
    name: "Michael",
    review: "Comfortable and stylish. I get compliments every time I wear it.",
    image:
      "https://static.zara.net/photos/2024/V/0/1/p/4365/065/406/12/w/750/4365065406_1_1_1.jpg?ts=1708341528879",
    stars: 4,
  },
  {
    name: "Sophia",
    review: "Not worth the price. The stitching came undone after one wash.",
    image:
      "https://static.zara.net/photos/2024/I/0/1/p/5227/241/800/2/w/750/5227241800_1_1_1.jpg?ts=1731933041594",
    stars: 1,
  },
  {
    name: "David",
    review: "Exceeded my expectations. Will definitely buy again.",
    image:
      "https://static.zara.net/photos/2023/I/1/1/p/6043/210/202/2/w/750/6043210202_1_1_1.jpg?ts=1690466481156",
    stars: 5,
  },
  {
    name: "Emma",
    review: "The fabric is soft and comfortable, but the fit is a bit loose.",
    image:
      "https://static.zara.net/photos/2024/I/0/1/p/8228/221/800/17/w/750/8228221800_1_1_1.jpg?ts=1728046168870",
    stars: 3,
  },
  {
    name: "Liam",
    review: "Stylish and modern. Matches well with my wardrobe.",
    image:
      "https://static.zara.net/photos/2024/V/0/1/p/9929/132/704/18/w/750/9929132704_1_1_1.jpg?ts=1703593994872",
    stars: 4,
  },
  {
    name: "Olivia",
    review: "Not as described. The color faded after a few washes.",
    image:
      "https://static.zara.net/photos/2024/I/1/2/p/2001/420/709/2/w/750/2001420709_2_1_1.jpg?ts=1724054911595",
    stars: 2,
  },
  {
    name: "Noah",
    review: "Perfect fit and excellent quality. Highly recommend.",
    image:
      "https://static.zara.net/photos/2024/I/0/1/p/8338/501/051/2/w/750/8338501051_1_1_1.jpg?ts=1716478166905",
    stars: 5,
  },
  {
    name: "Ava",
    review: "Decent product but overpriced for the quality.",
    image:
      "https://static.zara.net/photos/2024/I/0/1/p/3920/472/712/2/w/750/3920472712_1_1_1.jpg?ts=1729683429099",
    stars: 3,
  },
];

const TestimonialCard = ({ name, review, image, stars }: Props) => {
  return (
    <div className="relative grid w-[440px] shrink-0 grid-cols-[8rem,_1fr] overflow-hidden rounded-lg border border-neutral-200">
      <Image
        src={image}
        alt={`${name}'s review`}
        width={120}
        height={120}
        className="size-full object-cover"
      />
      <div className="bg-neutral-50/5 p-4">
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
