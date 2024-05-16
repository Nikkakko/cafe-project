import { CartItemTypes } from "@/types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Type = "increment" | "decrement";
interface CartStore {
  items: CartItemTypes[];
  addItem: (item: CartItemTypes) => void;
  updateItemQuantity: (id: string, type: Type) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    set => ({
      items: [],
      addItem: item =>
        set(state => {
          const existingItemIndex = state.items.findIndex(
            i => i.id === item.id
          );

          if (existingItemIndex !== -1) {
            // Item already exists in the cart, increment the quantity by one
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;

            return { items: newItems };
          } else {
            // Item doesn't exist in the cart, add it
            return { items: [...state.items, item] };
          }
        }),
      removeItem: id =>
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),

      updateItemQuantity: (id, type) => {
        set(state => {
          const itemIndex = state.items.findIndex(i => i.id === id);
          const newItems = [...state.items];

          if (type === "increment") {
            newItems[itemIndex].quantity += 1;
          } else {
            newItems[itemIndex].quantity -= 1;
          }

          // Remove the item from the cart if the quantity is 0
          if (newItems[itemIndex].quantity === 0) {
            newItems.splice(itemIndex, 1);
          }

          return { items: newItems };
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
