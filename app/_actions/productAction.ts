"use server";
import db from "@/lib/db";
import { AddProductSchema } from "@/validation/addproduct";
import { currentUser } from "@clerk/nextjs/server";
import { action } from "@/lib/safe-action";
import { checkRole } from "@/utils/roles";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/handle-error";
import { getCachedUser } from "@/lib/queries/user";
import { z } from "zod";

export const createProductAction = action(AddProductSchema, async values => {
  const user = await getCachedUser();

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

  if (!checkRole("admin")) {
    return {
      error: "You must be an admin to create a product.",
    };
  }

  try {
    const res = await db.products.create({
      data: {
        userId: user.id,
        title: ParsedValues.data.title,
        description: ParsedValues.data.description,
        images: ParsedValues.data.images,
        price: ParsedValues.data.price,
        category: ParsedValues.data.category,
        subCategory: ParsedValues.data.subCategory,
        quantity: ParsedValues.data.quantity,
      },
    });

    revalidatePath("/admin/dashboard/products");
    return { message: "Product created successfully." };
  } catch (error) {
    console.log("error", error);
    return getErrorMessage(error);
  }

  //only admin can create product
});

export const deleteProductAction = action(z.string(), async id => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "You must be logged in to delete a product.",
    };
  }

  if (!checkRole("admin")) {
    return {
      error: "You must be an admin to delete a product.",
    };
  }

  try {
    await db.products.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/dashboard/products");
    return { message: "Product deleted successfully." };
  } catch (error) {
    return getErrorMessage(error);
  }
});
