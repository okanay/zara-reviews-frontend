import { MainNavigationTabs } from "./tabs";
import { GetStarted } from "./get-started";
import { BrandName } from "./brand-name";

const Header = () => {
  return (
    <header className="absolute w-full max-w-[100vw] font-sans">
      <nav className="mx-auto my-2 flex max-w-7xl items-center justify-between px-4 py-2">
        <ul className="flex items-center gap-8">
          <BrandName />
          <MainNavigationTabs />
        </ul>
        <GetStarted />
      </nav>
    </header>
  );
};

export default Header;
