"use client";
import { Button } from "@/components/ui/button";
import { ProductSize, Products, PurchaseType, Size } from "@prisma/client";
import { ChevronLeft, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import ProductBreadCrumbs from "./ProductBreadCrumbs";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetails from "./ProductDetails";
import ProductForm from "@/components/ProductForm";

interface ProductDetailCardProps {
  product: Products & {
    purchaseType: PurchaseType[];
    sizes: ProductSize[];
  };
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center gap-0 group transition mb-10">
        <ChevronLeft
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
        <div className="flex-1 flex flex-col gap-8">
          <ProductDetails
            title={product.title}
            description={product.description}
            price={product.price}
          />

          <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start mt-auto w-full ">
            <ProductForm
              purchaseType={product.purchaseType}
              sizes={product.sizes}
              productId={product.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
