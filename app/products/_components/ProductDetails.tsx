import { formatPrice } from "@/lib/utils";
import { Products } from "@prisma/client";
import * as React from "react";

interface ProductDetailsProps {
  title: string;
  description: string;
  price: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  description,
  price,
}) => {
  return (
    <>
      <div className="lg:max-w-xl"></div>
      <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
        <div className="mt-4">
          <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h3>
        </div>
        <section className="mt-4">
          <p className="mt-6 space-y-6 text-base text-stone-500 ">
            {description}
          </p>

          <p className="mt-6 text-2xl font-semibold">
            {formatPrice(price, {
              currency: "USD",
              minimumFractionDigits: 2,
              style: "currency",
            })}
          </p>
        </section>
      </div>
    </>
  );
};

export default ProductDetails;
