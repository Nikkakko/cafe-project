"user server";
import db from "@/lib/db";
import { AddProductSchema } from "@/validation/addproduct";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { action } from "@/lib/safe-action";

// export async function createProductAction(
//   values: z.infer<typeof AddProductSchema>
// ) {
//   const user = await currentUser();

//   if (!user) {
//     return {
//       error: "You must be logged in to create a product.",
//     };
//   }

//   const ParsedValues = AddProductSchema.safeParse(values);

//   if (!ParsedValues.success) {
//     return {
//       error: "Invalid form values.",
//     };
//   }
// }

export const createProductAction = action(AddProductSchema, async values => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "You must be logged in to create a product.",
    };
  }

  const ParsedValues = AddProductSchema.safeParse(values);

  if (!ParsedValues.success) {
    return {
      error: "Invalid form values.",
    };
  }

  //only admin can create product
});
