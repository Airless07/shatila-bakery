"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductImagePlaceholder from "./ProductImagePlaceholder";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#C9A84C]/30 bg-[#3D1F0F]">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag size={20} className="text-[#C9A84C]" />
            <h2 className="font-serif text-lg">Your Cart</h2>
            {items.length > 0 && (
              <span className="ml-1 text-sm text-white/60">
                ({items.length} item{items.length !== 1 ? "s" : ""})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <ShoppingBag size={64} className="text-[#C9A84C]/30 mb-4" />
              <p className="text-[#3D1F0F] font-serif text-xl mb-2">
                Your cart is empty
              </p>
              <p className="text-[#3D1F0F]/60 text-sm mb-6">
                Add some of our delicious sweets to get started.
              </p>
              <button onClick={closeCart} className="btn-gold">
                Browse Shop
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white rounded-xl p-3 shadow-sm"
              >
                {/* Thumb */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ProductImagePlaceholder
                    color={item.color}
                    name={item.name}
                    image={item.image}
                    small
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#3D1F0F] text-sm leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="text-[#C9A84C] font-bold text-sm mt-0.5">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-6 h-6 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-white transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-[#3D1F0F]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-6 h-6 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-white transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <span className="ml-auto text-[#3D1F0F]/50 text-xs">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="self-start p-1 text-[#3D1F0F]/30 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#C9A84C]/30 bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#3D1F0F]/60 text-sm">Subtotal</span>
              <span className="text-[#3D1F0F] font-bold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-[#3D1F0F]/40 text-xs mb-4">
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-gold block text-center w-full mb-2"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-outline-gold block text-center w-full text-sm"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
