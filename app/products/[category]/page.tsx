import * as React from "react";
import db from "@/lib/db";
import EmptyState from "@/components/EmptyState";
import { Shell } from "@/components/ui/shell";
import Link from "next/link";
import ProductDetailCard from "../_components/ProductDetailCard";

interface ProductCategoryPageProps {
  params: {
    category: string;
  };
}

const ProductCategoryPage: React.FC<ProductCategoryPageProps> = async ({
  params,
}) => {
  const product = await db.products.findFirst({
    where: {
      slug: params.category,
    },
  });

  if (!product) {
    return (
      <EmptyState
        title="No products found"
        description="No products found in this category. Please check back later."
        //center
        className="flex flex-col items-center justify-center h-full"
        homeLink
      />
    );
  }
  return (
    <Shell
      variant={"container"}
      as="main"
      className="flex flex-col flex-1 py-24   w-full"
    >
      <ProductDetailCard product={product} />
    </Shell>
  );
};

export default ProductCategoryPage;
