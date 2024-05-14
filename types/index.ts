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

export type Sizes = {
  value: z.infer<typeof AddProductSchema>["sizes"][0];
  label: string;
};

export type PurchaseTypes = {
  value: z.infer<typeof AddProductSchema>["purchaseType"][0];
  label: string;
};
