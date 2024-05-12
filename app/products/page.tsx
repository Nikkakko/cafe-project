import { Shell } from "@/components/ui/shell";
import * as React from "react";
import db from "@/lib/db";
import EmptyState from "@/components/EmptyState";
import ProductCard from "./_components/ProductCard";

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = async ({}) => {
  const products = await db.products.findMany({
    orderBy: {
      createdAt: "asc",
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
    <Shell variant="container" className="flex flex-col flex-1" as="main">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Shell>
  );
};

export default ProductsPage;
