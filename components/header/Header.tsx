import * as React from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className="z-50 text-stone-400">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
