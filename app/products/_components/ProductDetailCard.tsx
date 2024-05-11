"use client";
import { Button } from "@/components/ui/button";
import { Products } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import ProductBreadCrumbs from "./ProductBreadCrumbs";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetails from "./ProductDetails";

interface ProductDetailCardProps {
  product: Products;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center gap-0 group transition mb-10">
        <MoveLeft
          size={24}
          className="text-stone-400 group-hover:text-foreground group-hover:animate-pulse group-hover:cursor-pointer"
        />
        <Button
          onClick={() => router.back()}
          variant={"link"}
          size="sm"
          className="text-stone-400 uppercase  group-hover:text-foreground "
        >
          go back
        </Button>
      </div>
      <ProductBreadCrumbs slug={product.slug} />
      <div className="flex flex-col gap-8 lg:flex-row-reverse">
        <ProductImageGallery images={product.images} />
        <ProductDetails
          title={product.title}
          description={product.description}
          price={product.price}
        />
      </div>
    </div>
  );
};

export default ProductDetailCard;
