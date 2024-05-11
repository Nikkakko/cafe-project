import { AddProductSchema } from "@/validation/addproduct";
import * as z from "zod";

export type Categories = {
  value: z.infer<typeof AddProductSchema>["category"];
  label: string;
};

export type Subcategories = {
  value: z.infer<typeof AddProductSchema>["subCategory"];
  label: string;
};
