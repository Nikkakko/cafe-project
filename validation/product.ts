import { $Enums } from "@prisma/client";
import { z } from "zod";
import { Sizes, PurchaseTypes } from "@/types";

const { Category, SubCategories, Size, Purchase } = $Enums;

export const AddProductSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title should be at least 3 characters long.",
    })
    .max(255),
  description: z.string().min(3, {
    message: "Description should be at least 3 characters long.",
  }),

  price: z.number().min(1.69, {
    message: "Price should be at least 1.69",
  }),
  category: z.nativeEnum(Category),
  subCategory: z.nativeEnum(SubCategories),
  images: z.array(
    z.string().url({
      message: "Invalid image URL",
    })
  ),
  stock: z.number().min(1, {
    message: "Quantity should be at least 1",
  }),
  sizes: z.array(z.nativeEnum(Size)),
  purchaseType: z.array(z.nativeEnum(Purchase)),
  salePercent: z.number().min(0).max(100),
});

export const addToCartSchema = z.object({
  sizes: z
    .array(z.nativeEnum(Size), {
      required_error: "Please select a size",
      message: "Please select a size",
    })
    .nonempty({
      message: "Please select a size",
    }),
  purchaseType: z
    .array(z.nativeEnum(Purchase), {
      required_error: "Please select a purchase type",
      message: "Please select a purchase type",
    })
    .nonempty({
      message: "Please select a purchase type",
    }),
});

export const cartItemSchema = z.object({
  productId: z.string(),
});
export const deleteCartItemSchema = z.object({
  productId: z.string(),
});

export const deleteCartItemsSchema = z.object({
  productIds: z.array(z.string()),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0).default(1),
});
