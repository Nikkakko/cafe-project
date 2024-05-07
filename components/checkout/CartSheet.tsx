import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface CartSheetProps {}

const CartSheet: React.FC<CartSheetProps> = ({}) => {
  const itemCount = 0;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
          <Separator />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
