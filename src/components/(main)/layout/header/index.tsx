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
              className="hidden text-sm tracking-wide sm:block"
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <RippleButton>Get Started</RippleButton>
      </nav>
    </header>
  );
};

export default Header;
