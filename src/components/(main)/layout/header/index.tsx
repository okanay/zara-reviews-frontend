"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RippleButton } from "../../../globals/ripple-button";

const Header = () => {
  const activeLink = usePathname();

  const links = [
    {
      name: "Home",
      href: "/",
      isActive: activeLink === "/",
    },
    {
      name: "Trending",
      href: "/trending",
      isActive: activeLink === "/trending",
    },
    {
      name: "Blog",
      href: "/blog",
      isActive: activeLink === "/blog",
    },
  ];

  return (
    <header className="absolute left-[50%] my-2 w-full max-w-5xl -translate-x-1/2 px-4 py-2 font-sans">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-6">
          <Link
            href="/"
            className="mb-0.5 mr-4 flex flex-col items-center justify-center -space-y-2 font-serif tracking-wider"
          >
            <span className="text-sm font-bold italic">zara</span>
            <span className="text-3xl uppercase">Reviews</span>
          </Link>
          {links.map((link) => (
            <li
              key={link.name}
              className="hidden text-sm tracking-wide transition-all duration-500 hover:scale-105 hover:text-primary-700 active:scale-100 active:text-primary-900 sm:block"
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <RippleButton className="h-10 border-neutral-500 from-neutral-100 to-neutral-50 px-4 shadow shadow-neutral-300 sm:h-12 sm:px-6">
          Get Started
        </RippleButton>
      </nav>
    </header>
  );
};

export default Header;
