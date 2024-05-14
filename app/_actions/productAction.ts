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
import { slugify } from "@/lib/utils";
import { Purchase, Size } from "@prisma/client";

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
    await db.products.create({
      data: {
        userId: user.id,
        title: ParsedValues.data.title,
        description: ParsedValues.data.description,
        images: ParsedValues.data.images,
        price: ParsedValues.data.price,
        category: ParsedValues.data.category,
        subCategory: ParsedValues.data.subCategory,
        stock: ParsedValues.data.stock,
        purchaseType: {
          createMany: {
            data: ParsedValues.data.purchaseType.map(
              (purchaseType: Purchase) => ({
                purchase: purchaseType,
              })
            ),
          },
        },
        sizes: {
          createMany: {
            data: ParsedValues.data.sizes.map((size: Size) => ({
              size,
            })),
          },
        },
        salePercent: ParsedValues.data.salePercent,
        slug: slugify(ParsedValues.data.title),
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

const updateProductSchema = z.object({
  id: z.string().min(1),
  product: AddProductSchema,
});
export const updateProductAction = action(updateProductSchema, async values => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "You must be logged in to update a product.",
    };
  }

  if (!checkRole("admin")) {
    return {
      error: "You must be an admin to update a product.",
    };
  }

  const parsedValues = updateProductSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: "Invalid form values.",
    };
  }

  try {
    await db.products.update({
      where: {
        id: parsedValues.data.id,
      },
      data: {
        title: parsedValues.data.product.title,
        description: parsedValues.data.product.description,
        images: parsedValues.data.product.images,
        price: parsedValues.data.product.price,
        category: parsedValues.data.product.category,
        subCategory: parsedValues.data.product.subCategory,
        stock: parsedValues.data.product.stock,
        sizes: {
          createMany: {
            data: parsedValues.data.product.sizes.map((size: Size) => ({
              size,
            })),
          },
        },
        purchaseType: {
          createMany: {
            data: parsedValues.data.product.purchaseType.map(
              (purchaseType: Purchase) => ({
                purchase: purchaseType,
              })
            ),
          },
        },
        salePercent: parsedValues.data.product.salePercent,
      },
    });

    revalidatePath("/admin/dashboard/products");
    return { message: "Product updated successfully." };
  } catch (error) {
    console.log("error", error);
    return getErrorMessage(error);
  }
});
