"use server";
import db from "@/lib/db";
import { action } from "@/lib/safe-action";
import {
  cartItemSchema,
  deleteCartItemSchema,
  deleteCartItemsSchema,
  CartLineItemSchema,
} from "@/validation/product";
import { cookies } from "next/headers";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/handle-error";

export const addToCart = action(cartItemSchema, async values => {
  noStore();

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

      cookieStore.set("cartId", newCart.id, {
        // expires in 7 days
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
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

      cookieStore.set("cartId", newCart.id, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      revalidatePath("/");
      return {
        data: newCart,
        error: null,
      };
    }

    const cartItem = cart.cartItems?.find(
      item => item.productId === parsedValues.productId
    );

    if (!cartItem) {
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

      revalidatePath("/");
    } else {
      await db.cartItem.update({
        where: {
          productId: parsedValues.productId,
          cartId: cart.id,
          id: cartItem.id,
        },

        data: {
          quantity: cartItem.quantity + 1,
        },
      });

      revalidatePath("/");
    }

    await db.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        cartItems: {
          update: {
            where: {
              id: cartItem?.id,
            },
            data: {
              product: {
                connect: {
                  id: product.id,
                },
              },
              quantity: cartItem ? cartItem.quantity + 1 : 1,
            },
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

export const getCart = async (): Promise<CartLineItemSchema[]> => {
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

    const cartItems = cartLineItems.map(product => {
      // const quantity = productIds.filter(id => id === product.id).length;

      const quantity = cart?.cartItems?.find(
        item => item.productId === product.id
      )?.quantity;

      return {
        ...product,
        quantity: quantity ?? 0,
      };
    });

    return cartItems;
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
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

    // cart.cartItems =
    //   cart.cartItems?.filter(
    //     item => !parsedValues.productIds.includes(item.productId)
    //   ) ?? [];

    await db.cart.update({
      where: {
        id: cart.id,
      },

      data: {
        cartItems: {
          deleteMany: {
            productId: {
              in: productIds,
            },
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

    const updatedCartItems = (cart.cartItems =
      cart.cartItems?.filter(
        item => item.productId !== parsedValues.productId
      ) ?? []);

    await db.cart.update({
      where: {
        id: cart.id,
      },

      data: {
        cartItems: {
          deleteMany: {
            productId: parsedValues.productId,
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
    console.error("Error deleting cart item:", error);
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
});

export const updateCartItem = action(cartItemSchema, async values => {
  noStore();

  try {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      throw new Error("cartId not found, please try again.");
    }

    const parsedValues = cartItemSchema.parse(values);

    const cart = await db.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) return;

    const cartItem = cart.cartItems?.find(
      item => item.productId === parsedValues.productId
    );

    if (!cartItem) return;

    await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: parsedValues.quantity,
      },
    });

    //update cartItems in product

    revalidatePath("/");

    return {
      data: cart.cartItems,
      error: null,
    };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
});
