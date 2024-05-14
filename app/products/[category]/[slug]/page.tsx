import { Shell } from "@/components/ui/shell";
import * as React from "react";
import db from "@/lib/db";
import { unSlugify } from "@/lib/utils";
import { SubCategories, Category } from "@prisma/client";
import EmptyState from "@/components/EmptyState";

import ProductCard from "../../_components/ProductCard";
import Sort from "@/components/Sort";
import { Separator } from "@/components/ui/separator";

interface ProductSlugPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductSlugPage: React.FC<ProductSlugPageProps> = async ({
  params,
  searchParams,
}) => {
  const { slug } = params;
  const sortBy =
    typeof searchParams.sortBy === "string" ? searchParams.sortBy : "newest";

  const sortKey = sortBy?.split(".")[0] as string;
  const sortDirection = sortBy?.split(".")[1] as "asc" | "desc";

  const products = await db.products.findMany({
    where: {
      OR: [
        {
          subCategory:
            SubCategories[
              unSlugify(slug as string) as keyof typeof SubCategories
            ],
        },
        {
          category:
            Category[unSlugify(slug as string) as keyof typeof Category],
        },
      ],
    },
    orderBy: {
      [sortKey]: sortDirection,
    },
  });

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No product found"
        description="No product found for this category"
        homeLink
        className="flex flex-col items-center justify-center h-full"
      />
    );
  }

  return (
    <Shell className="flex flex-col flex-1 py-24" variant="container" as="main">
      <Sort title="Products" />
      <Separator className="mt-4" />
      <Shell variant="productgrid" as="div">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Shell>
    </Shell>
  );
};

export default ProductSlugPage;
