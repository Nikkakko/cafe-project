import { Shell } from "@/components/ui/shell";
import * as React from "react";
import db from "@/lib/db";
import EmptyState from "@/components/EmptyState";
import ProductCard from "./_components/ProductCard";
import { Separator } from "@/components/ui/separator";
import Sort from "@/components/Sort";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPage: React.FC<ProductsPageProps> = async ({ searchParams }) => {
  const sortBy =
    typeof searchParams.sortBy === "string" ? searchParams.sortBy : "newest";

  const sortKey = sortBy?.split(".")[0] as string;
  const sortDirection = sortBy?.split(".")[1] as "asc" | "desc";

  const products = await db.products.findMany({
    orderBy: {
      [sortKey]: sortDirection,
    },
  });

  if (!products) {
    return (
      <EmptyState
        title="No products found"
        description="No products found in the database"
      />
    );
  }

  return (
    <Shell variant="container" className="flex flex-col flex-1 py-24" as="main">
      <Sort title="Products" />
      <Separator className="mt-4" />
      <Shell variant="productgrid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Shell>
    </Shell>
  );
};

export default ProductsPage;
