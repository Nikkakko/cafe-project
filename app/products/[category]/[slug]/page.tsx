import { Shell } from "@/components/ui/shell";
import * as React from "react";
import db from "@/lib/db";
import { unSlugify } from "@/lib/utils";
import { SubCategories, Category } from "@prisma/client";
import EmptyState from "@/components/EmptyState";

import ProductCard from "../../_components/ProductCard";

interface ProductSlugPageProps {
  params: {
    slug: string;
  };
}

const ProductSlugPage: React.FC<ProductSlugPageProps> = async ({ params }) => {
  const { slug } = params;

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
      createdAt: "asc",
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
    <Shell className="flex flex-col flex-1" variant="container" as="main">
      <Shell variant="productgrid" as="div">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Shell>
    </Shell>
  );
};

export default ProductSlugPage;
