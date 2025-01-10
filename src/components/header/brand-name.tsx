import Link from "next/link";

export const BrandName = () => {
  return (
    <Link
      href="/"
      className="mr-4 flex flex-col items-center justify-center font-serif tracking-wider"
    >
      <span className="text-sm font-bold italic">zara</span>
      <span className="-mt-2 text-3xl uppercase">Reviews</span>
    </Link>
  );
};
