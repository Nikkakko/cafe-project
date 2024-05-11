"use client";
import Link from "next/link";
import * as React from "react";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex gap-6">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="size-6" aria-hidden="true" />
        <span className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {siteConfig.mainNav.map((item, index) => {
            const hasItems = item.items && item.items.length > 0;
            const isActive = item.href === pathname;
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  hasItems={item.items && item.items.length > 0}
                >
                  {!hasItems ? (
                    <NavigationMenuLink href={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(isActive ? "text-foreground" : "")}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    item.title
                  )}
                </NavigationMenuTrigger>
                {hasItems && (
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {item.items?.map((subItem, index) => (
                        <li
                          key={index}
                          className="hover:bg-stone-100 p-2 rounded-md hover:text-muted transition text-foreground"
                        >
                          <Link href={subItem.href}>{subItem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainNav;
