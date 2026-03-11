"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/data/products";

// ── Types ──────────────────────────────────────────────────────────────────

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "UPDATE_QTY"; id: number; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" };

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// ── Reducer ────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shatila-cart");
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        parsed.forEach((item) => {
          for (let i = 0; i < item.quantity; i++) {
            dispatch({ type: "ADD_ITEM", product: item });
          }
        });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("shatila-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
        updateQuantity: (id, quantity) =>
          dispatch({ type: "UPDATE_QTY", id, quantity }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
        openCart: () => dispatch({ type: "OPEN_CART" }),
        closeCart: () => dispatch({ type: "CLOSE_CART" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
