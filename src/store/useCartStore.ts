import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/Home/ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cartItems.find(item => item.productId === product.productId);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(item => 
                item.productId === product.productId 
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
        });
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.productId !== productId)
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.productId === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        }));
      },
      
      clearCart: () => set({ cartItems: [] }),
      
      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
