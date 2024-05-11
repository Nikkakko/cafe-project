import { formatPrice } from "@/lib/utils";
import { Products } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface ProductCardProps {
  product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative rounded-lg overflow-hidden"
    >
      <div className="aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-lg group-hover:opacity-90 transition">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(min-width: 1540px) 293px, (min-width: 1280px) 256px, (min-width: 400px) 293px, calc(31.25vw + 174px)"
          priority
          quality={100}
        />
      </div>
      <div className="mx-1 mt-4 flex items-center justify-between gap-4 ">
        <h3 className="text-lg font-semibold text-stone-400 ">
          {product.title}
        </h3>
        <p className="text-sm font-semibold ">
          {formatPrice(product.price, {
            currency: "USD",
            minimumFractionDigits: 2,
            style: "currency",
          })}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
