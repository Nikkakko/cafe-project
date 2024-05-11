import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  homeLink?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  homeLink = false,

  ...props
}) => {
  return (
    <div className={cn("text-center text-stone-400", props.className)}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2">{description}</p>
      {homeLink && (
        <Link
          href="/"
          className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Go back home
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
