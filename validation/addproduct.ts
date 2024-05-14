import { $Enums } from "@prisma/client";
import { z } from "zod";

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
