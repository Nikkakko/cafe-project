import { Category, SubCategories, Images } from "@prisma/client";
import { z } from "zod";

export const AddProductSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  price: z.number().min(0.01),
  category: z.nativeEnum(Category),
  subCategory: z.nativeEnum(SubCategories),
  images: z.array(z.string().url()).max(5),
  quantity: z.number().min(1),
});
