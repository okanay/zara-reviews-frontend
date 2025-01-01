"use client";
import Link from "next/link";
// import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
    // isActive: activeLink === "/",
  },
  {
    name: "Trending",
    href: "/trending",
    // isActive: activeLink === "/trending",
  },
  {
    name: "Blog",
    href: "/blog",
    // isActive: activeLink === "/blog",
  },
];

export const MainNavigationTabs = () => {
  // const activeLink = usePathname();

  return (
    <>
      {links.map((link) => (
        <li
          key={link.name}
          className="hidden text-sm tracking-wide transition-all duration-500 hover:scale-105 hover:text-primary-700 active:scale-100 active:text-primary-900 sm:block"
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </>
  );
};
