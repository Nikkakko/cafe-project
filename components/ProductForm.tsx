"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ProductSize, PurchaseType } from "@prisma/client";
import { addToCartSchema, cartItemSchema } from "@/validation/product";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { siteConfig } from "@/config/site";
import { cn, slugify, unSlugify, unSlugifyTitle } from "@/lib/utils";
import { Icons } from "./icons";

import { useToast } from "./ui/use-toast";
import { addToCart } from "@/app/_actions/add-to-cart";

interface ProductFormProps {
  purchaseType: PurchaseType[];
  sizes: ProductSize[];
  productId: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  purchaseType,
  sizes,
  productId,
}) => {
  const checkSizes = sizes.length > 0;
  const checkPurchaseType = purchaseType.length > 0;

  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof cartItemSchema>>({
    resolver: zodResolver(cartItemSchema),
    defaultValues: {
      // sizes: checkSizes ? [sizes[0].size] : [],
      // purchaseType: checkPurchaseType ? [purchaseType[0].purchase] : [],
      productId: productId,
    },
  });

  function onSubmit(values: z.infer<typeof cartItemSchema>) {
    startTransition(async () => {
      try {
        await addToCart(values);
        toast({
          title: "Added to cart",
          description: "Product added to cart successfully",
        });

        form.reset();
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while adding to cart",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex flex-col"
      >
        {/* Purchase Type */}
        {/* {purchaseType.length > 0 && (
          <FormField
            control={form.control}
            name="purchaseType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Purchase Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={
                      field.value.length > 0 ? field.value[0] : undefined
                    }
                    className="flex items-center gap-2"
                  >
                    {purchaseType.map(item => (
                      <FormItem
                        key={item.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={item.purchase}
                            className="border-stone-300 text-sky-600 focus:ring-sky-600 "
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {unSlugifyTitle(item.purchase)}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}

        {/* Sizes */}
        {/* {sizes.length > 0 && (
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    {sizes.map(item => (
                      <div
                        className={cn(
                          "relative block cursor-pointer rounded-lg border  p-4 focus:outline-none border-stone-300 dark:border-stone-600",
                          field.value.includes(item.size) &&
                            "border-sky-500 border-2 dark:border-sky-500 dark:border-2"
                        )}
                        key={item.id}
                        onClick={() => {
                          //set the value of the field to the selected size
                          field.onChange(item.size);
                        }}
                      >
                        <p
                          className={cn(
                            "0 text-sm font-medium",
                            field.value.includes(item.size)
                              ? "text-foreground"
                              : "text-stone-500 dark:text-stone-500"
                          )}
                        >
                          {unSlugify(item.size)}
                        </p>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}

        <Button
          type="submit"
          className="w-full bg-sky-500 text-white hover:bg-sky-600"
          disabled={isPending}
        >
          Add to Cart
          <Icons.cart className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
