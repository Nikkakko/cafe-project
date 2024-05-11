import * as React from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import CartSheet from "../checkout/CartSheet";
import { Skeleton } from "../ui/skeleton";
import dynamic from "next/dynamic";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import DashboardButton from "./DashboardButton";

const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
  loading: () => <Skeleton className="w-10 h-10" />,
  ssr: false,
});
const Auth = dynamic(() => import("../Auth"), {
  loading: () => <Skeleton className="w-10 h-10" />,
  ssr: false,
});

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const { userId } = auth();
  return (
    <header className="z-50 text-stone-400">
      <div className="container flex h-16 items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <div className="hidden lg:block">
              {userId && <DashboardButton />}
            </div>
            <ThemeToggle />
            <CartSheet />
            <Auth />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
