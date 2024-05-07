"use client";
import * as React from "react";

interface MobileNavProps {}
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { useMediaQuery } from "@/hooks/use-media-query";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";

const MobileNav: React.FC<MobileNavProps> = ({}) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleNavigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (isDesktop) return null;
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0 pt-9">
        <div className="w-full px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Icons.logo className="mr-2 size-4" aria-hidden="true" />
            <span className="font-bold">{siteConfig.name}</span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            {siteConfig.mainNav.map(item => (
              <div
                key={item.title}
                className="block py-1 hover:bg-stone-100"
                onClick={() => handleNavigate(item.href)}
              >
                {item.items && item.items?.length > 0 ? (
                  <>
                    <span className="text-stone-200">{item.title}</span>
                    <ul className="border-l">
                      {item.items.map(subItem => (
                        <li
                          key={subItem.title}
                          className="py-1 text-sm text-stone-500 pl-3"
                        >
                          <Link href={subItem.href}>{subItem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <span className="text-stone-200">{item.title}</span>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
