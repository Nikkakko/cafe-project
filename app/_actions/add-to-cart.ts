"use server";
import db from "@/lib/db";
import { action } from "@/lib/safe-action";
import {
  cartItemSchema,
  deleteCartItemSchema,
  deleteCartItemsSchema,
} from "@/validation/product";
import { cookies } from "next/headers";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/handle-error";
import { currentUser } from "@clerk/nextjs/server";
import { Cart } from "@prisma/client";
import { z } from "zod";

export const addToCart = action(cartItemSchema, async values => {
  noStore();
  const session = await currentUser();

  let newCart: Cart;

  try {
    const parsedValues = cartItemSchema.parse(values);

    const product = await db.products.findUnique({
      where: {
        id: parsedValues.productId,
      },
    });

    if (!product) {
      throw new Error("Product not found, please try again.");
    }

    const cookieStore = cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      const newCart = await db.cart.create({
        data: {
          cartItems: {
            create: {
              product: {
                connect: {
                  id: product.id,
                },
              },
              quantity: 1,
            },
          },
        },

        include: {
          cartItems: true,
        },
      });

      console.log("newCart", newCart);
      cookieStore.set("cartId", newCart.id);
    }

    const cart = await db.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) {
      cookieStore.set({
        name: "cartId",
        value: "",
        expires: new Date(0),
      });

      await db.cart.delete({
        where: {
          id: cartId,
        },
      });

      throw new Error("Cart not found, please try again.");
    }

    if (cart.closed) {
      // await db.delete(carts).where(eq(carts.id, cartId))

      await db.cart.delete({
        where: {
          id: cartId,
        },
      });

      const newCart = await db.cart.create({
        data: {
          cartItems: {
            create: {
              product: {
                connect: {
                  id: product.id,
                },
              },
              quantity: 1,
            },
          },
        },

        include: {
          cartItems: true,
        },
      });

      cookieStore.set("cartId", newCart.id);

      revalidatePath("/");
      return {
        data: newCart,
        error: null,
      };
    }

    // const cartItem = cart.items?.find(
    //   item => item.productId === input.productId
    // );

    const cartItem = cart.cartItems?.find(
      item => item.productId === parsedValues.productId
    );

    if (cartItem) {
      await db.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + 1,
        },
      });
    } else {
      await db.cartItem.create({
        data: {
          cart: {
            connect: {
              id: cart.id,
            },
          },
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity: 1,
        },
      });
    }

    await db.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        cartItems: {
          create: {
            product: {
              connect: {
                id: product.id,
              },
            },
            quantity: 1,
          },
        },
      },
    });

    revalidatePath("/");

    return {
      data: cart.cartItems,
      error: null,
    };
  } catch (error) {
    console.error("Error creating cart:", error);
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
});

export const getCart = async () => {
  noStore();

  const cartId = cookies().get("cartId")?.value;

  if (!cartId) return [];

  try {
    const cart = await db.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
      },
    });

    const productIds = cart?.cartItems?.map(item => item.productId) ?? [];

    if (productIds.length === 0) return [];

    const uniqueProductIds = [...new Set(productIds)];

    /* 
    .where(
        and(
          inArray(products.id, uniqueProductIds),
          input?.storeId ? eq(products.storeId, input.storeId) : undefined
        )
      )
    */

    const cartLineItems = await db.products.findMany({
      where: {
        id: {
          in: uniqueProductIds,
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return cartLineItems;
  } catch (error) {
    console.error("Error getting cart:", error);
    return getErrorMessage(error);
  }
};

export async function deleteCart() {
  noStore();

  try {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      throw new Error("cartId not found, please try again.");
    }

    await db.cart.delete({
      where: {
        id: cartId,
      },
    });

    revalidatePath("/");

    return {
      data: null,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting cart:", error);
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
}

//   export async function deleteCartItem(
//     input: z.infer<typeof deleteCartItemSchema>
//   ) {}
// }

export const deleteCartItems = action(deleteCartItemsSchema, async values => {
  noStore();

  try {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      throw new Error("cartId not found, please try again.");
    }

    const cart = await db.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) return;

    const parsedValues = deleteCartItemsSchema.parse(values);

    const productIds = parsedValues.productIds;

    cart.cartItems =
      cart.cartItems?.filter(
        item => !parsedValues.productIds.includes(item.productId)
      ) ?? [];

    await db.cart.update({
      where: {
        id: cart.id,
      },

      data: {
        cartItems: {
          set: cart.cartItems,
        },
      },
    });

    revalidatePath("/");

    return {
      data: cart.cartItems,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting cart items:", error);
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
});

export const deleteCartItem = action(deleteCartItemSchema, async values => {
  noStore();

  try {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      throw new Error("cartId not found, please try again.");
    }

    const parsedValues = deleteCartItemSchema.parse(values);

    const cart = await db.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) return;

    cart.cartItems =
      cart.cartItems?.filter(
        item => item.productId !== parsedValues.productId
      ) ?? [];

    await db.cart.update({
      where: {
        id: cart.id,
      },

      data: {
        cartItems: {
          set: cart.cartItems,
        },
      },
    });

    revalidatePath("/");

    return {
      data: cart.cartItems,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
});
