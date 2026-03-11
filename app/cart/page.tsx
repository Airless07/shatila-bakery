"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.06;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-[#3D1F0F]">
            Shopping Cart
          </h1>
          {items.length > 0 && (
            <p className="text-[#3D1F0F]/60 mt-1">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag
              size={80}
              className="text-[#C9A84C]/30 mb-6"
              strokeWidth={1}
            />
            <h2 className="font-serif text-2xl text-[#3D1F0F] mb-3">
              Your cart is empty
            </h2>
            <p className="text-[#3D1F0F]/50 max-w-xs mb-8">
              Add some of our delicious Lebanese sweets to get started.
            </p>
            <Link href="/shop" className="btn-gold inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-xs uppercase tracking-widest text-[#3D1F0F]/40 font-semibold pb-2 border-b border-[#C9A84C]/20">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-12 gap-4 items-center"
                >
                  {/* Image + name */}
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <ProductImagePlaceholder
                        color={item.color}
                        name={item.name}
                        image={item.image}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#C9A84C] font-semibold uppercase tracking-wider mb-0.5">
                        {item.category}
                      </p>
                      <p className="font-serif font-bold text-[#3D1F0F] leading-tight">
                        {item.name}
                      </p>
                      {item.weight && (
                        <p className="text-xs text-[#3D1F0F]/40 mt-0.5">
                          {item.weight}
                        </p>
                      )}
                      {/* Mobile remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="md:hidden mt-1 text-xs text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit price */}
                  <div className="col-span-4 md:col-span-2 text-center">
                    <p className="text-sm font-semibold text-[#3D1F0F]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-4 md:col-span-2 flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-[#3D1F0F]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-[#C9A84C] text-[#C9A84C] flex items-center justify-center hover:bg-[#C9A84C] hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Line total + remove */}
                  <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-3">
                    <span className="font-bold text-[#3D1F0F]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="hidden md:flex text-[#3D1F0F]/30 hover:text-red-500 transition-colors"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Action row */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#b08a30] font-semibold transition-colors"
                >
                  <ArrowLeft size={16} /> Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-[#3D1F0F]/40 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <Trash2 size={14} /> Clear Cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h2 className="font-serif text-xl font-bold text-[#3D1F0F] mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-[#3D1F0F]/70">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#3D1F0F]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3D1F0F]/70">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0
                          ? "text-green-600 font-semibold"
                          : "font-semibold text-[#3D1F0F]"
                      }
                    >
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3D1F0F]/70">
                    <span>Tax (6%)</span>
                    <span className="font-semibold text-[#3D1F0F]">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-[#C9A84C] bg-[#C9A84C]/10 rounded-lg px-3 py-2">
                      Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <div className="border-t border-[#C9A84C]/20 pt-3 flex justify-between font-bold text-[#3D1F0F] text-base">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-gold w-full text-center block mb-3 flex items-center justify-center gap-2">
                  Checkout <ArrowRight size={16} />
                </Link>

                {/* Payment icons */}
                <div className="flex justify-center gap-2 mt-4">
                  {["VISA", "MC", "AMEX", "PayPal"].map((brand) => (
                    <span
                      key={brand}
                      className="text-[9px] font-bold px-1.5 py-1 border border-[#3D1F0F]/20 rounded text-[#3D1F0F]/40"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
