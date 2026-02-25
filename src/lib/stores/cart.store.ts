import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  productId: number;
  amount: number;
  price: number;
}

interface CartState {
  items: CartItem[];

  increaseAmount: (id: number, price: number) => void;
  decreaseAmount: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      increaseAmount: (id, price) =>
        set((state) => {
          const item = state.items.find((item) => item.productId === id);

          if (item) {
            return {
              items: state.items.map((item) =>
                item.productId === id ? { ...item, amount: item.amount + 1 } : item
              ),
            };
          }

          return {
            items: [...state.items, { productId: id, amount: 1, price }],
          };
        }),

      decreaseAmount: (id) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.productId === id ? { ...item, amount: item.amount - 1 } : item))
            .filter((item) => item.amount > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== id),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
