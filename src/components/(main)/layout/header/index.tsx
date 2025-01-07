import { MainNavigationTabs } from "./tabs";
import { GetStarted } from "./get-started";
import { BrandName } from "./brand-name";

const Header = () => {
  return (
    <header className="absolute my-2 w-full py-2 font-sans">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4">
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
