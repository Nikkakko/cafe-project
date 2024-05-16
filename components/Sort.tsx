"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

interface SortProps {
  title: string;
}

const Sort: React.FC<SortProps> = ({ title }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortOptions = [
    {
      label: "Newest",
      value: "createdAt.desc",
    },
    {
      label: "Oldest",
      value: "createdAt.asc",
    },
    {
      label: "Price: Low to High",
      value: "price.asc",
    },
    {
      label: "Price: High to Low",
      value: "price.desc",
    },
  ];

  const sortParam = searchParams.get("sortBy");

  const handleSort = React.useCallback(
    (value: string) => {
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query:
            sortParam === value ? { sortBy: undefined } : { sortBy: value },
        },
        {
          skipNull: true,
          skipEmptyString: true,
        }
      );

      router.push(url);
    },
    [pathname, router, sortParam]
  );

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-3xl font-semibold text-stone-400">{title}</h1>
      {/* add sort  */}

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="text-stone-400 group">
          <div className="flex items-center gap-1 group-hover:text-white">
            Sort by
            <ChevronDown
              className={cn(
                "w-4 h-4 transition group-hover:text-white",
                isOpen && "transform rotate-180"
              )}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map(option => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                handleSort(option.value);
              }}
              className={cn(
                sortParam === option.value && "bg-stone-100 text-stone-900"
              )}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
