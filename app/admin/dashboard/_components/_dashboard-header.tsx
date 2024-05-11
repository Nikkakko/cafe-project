"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface DashboardHeaderProps {}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({}) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const currentPath = pathname.split("/")[1];
  const firstLevel = pathname.split("/")[2];
  const secondLevel = pathname.split("/")[3];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 pb-2 sm:pb-0 border-b bg-background  sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium pt-6">
            {siteConfig.dashboardPageLinks.map(link => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg hover:bg-primary-foreground hover:text-primary-background",
                      isActive
                        ? "bg-primary-foreground text-primary-background"
                        : "text-muted-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.title}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {capitalizeFirstLetter(currentPath)}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/admin/${firstLevel}`}>
                {capitalizeFirstLetter(firstLevel)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {capitalizeFirstLetter(secondLevel)}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div> */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src="/placeholder-user.jpg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  );
};

export default DashboardHeader;
