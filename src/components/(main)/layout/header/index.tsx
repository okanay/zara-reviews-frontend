import { MainNavigationTabs } from "./tabs";
import { GetStarted } from "./get-started";
import { BrandName } from "./brand-name";

const Header = () => {
  return (
    <header className="absolute left-[50%] my-2 w-full max-w-5xl -translate-x-1/2 px-4 py-2 font-sans">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-6">
          <BrandName />
          <MainNavigationTabs />
        </ul>
        <GetStarted />
      </nav>
    </header>
  );
};

export default Header;
