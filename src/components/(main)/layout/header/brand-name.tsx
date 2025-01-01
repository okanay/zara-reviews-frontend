import Link from "next/link";

export const BrandName = () => {
  return (
    <Link
      href="/"
      className="mb-0.5 mr-4 flex flex-col items-center justify-center -space-y-2 font-serif tracking-wider"
    >
      <span className="text-sm font-bold italic">zara</span>
      <span className="text-3xl uppercase">Reviews</span>
    </Link>
  );
};
