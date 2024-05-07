import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import { buttonVariants } from "../ui/button";

interface DashboardButtonProps extends React.ComponentPropsWithoutRef<"a"> {
  asLink?: boolean;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({
  asLink,
  ...props
}) => {
  return (
    <Link
      href="/dashboard"
      className={cn(
        !asLink &&
          buttonVariants({
            variant: "outline",
          })
      )}
      {...props}
    >
      Dashboard
    </Link>
  );
};

export default DashboardButton;
