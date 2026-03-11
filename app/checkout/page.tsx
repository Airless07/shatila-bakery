"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Lock, CreditCard, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";

type Step = "shipping" | "payment" | "review";

interface FormData {
  // Shipping
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  // Payment
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apt: "",
  city: "",
  state: "MI",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

function formatCardNumber(val: string) {
  return val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.06;
  const orderTotal = totalPrice + shipping + tax;

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl p-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#3D1F0F] mb-3">
            Order Placed!
          </h1>
          <p className="text-[#3D1F0F]/60 mb-2">
            Thank you, {form.firstName}! Your order has been received.
          </p>
          <p className="text-[#3D1F0F]/40 text-sm mb-8">
            A confirmation will be sent to <strong>{form.email}</strong>.
            Your sweets are being prepared with love. 🍯
          </p>
          <div className="bg-[#FDF6EC] rounded-2xl p-4 text-sm text-left mb-8 space-y-1">
            <p className="text-[#3D1F0F]/60">
              <span className="font-semibold text-[#3D1F0F]">Order total:</span>{" "}
              ${orderTotal.toFixed(2)}
            </p>
            <p className="text-[#3D1F0F]/60">
              <span className="font-semibold text-[#3D1F0F]">Shipping to:</span>{" "}
              {form.address}, {form.city}, {form.state} {form.zip}
            </p>
          </div>
          <Link href="/" className="btn-gold w-full block text-center">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <p className="font-serif text-2xl text-[#3D1F0F] mb-4">
            Your cart is empty
          </p>
          <Link href="/shop" className="btn-gold">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "shipping", label: "Shipping", icon: <Truck size={16} /> },
    { key: "payment", label: "Payment", icon: <CreditCard size={16} /> },
    { key: "review", label: "Review", icon: <CheckCircle size={16} /> },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#b08a30] text-sm font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <h1 className="font-serif text-4xl font-bold text-[#3D1F0F] mb-8">
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-0 flex-1">
              <button
                onClick={() => i < stepIndex && setStep(s.key)}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  i === stepIndex
                    ? "text-[#C9A84C]"
                    : i < stepIndex
                    ? "text-[#3D1F0F]/60 cursor-pointer hover:text-[#C9A84C]"
                    : "text-[#3D1F0F]/30"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                    i === stepIndex
                      ? "bg-[#C9A84C] border-[#C9A84C] text-white"
                      : i < stepIndex
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-[#3D1F0F]/20 text-[#3D1F0F]/30"
                  }`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-colors ${
                    i < stepIndex ? "bg-green-500" : "bg-[#3D1F0F]/15"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Shipping Step */}
            {step === "shipping" && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="font-serif text-xl font-bold text-[#3D1F0F] mb-6 flex items-center gap-2">
                  <Truck size={20} className="text-[#C9A84C]" />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">First Name *</label>
                    <input
                      className="input"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Last Name *</label>
                    <input
                      className="input"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input
                      className="input"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input
                      className="input"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Street Address *</label>
                    <input
                      className="input"
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Apt / Suite</label>
                    <input
                      className="input"
                      value={form.apt}
                      onChange={(e) => set("apt", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">City *</label>
                    <input
                      className="input"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">State</label>
                    <select
                      className="input"
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                    >
                      {["MI", "OH", "IN", "IL", "WI", "MN", "IA", "MO"].map(
                        (s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="label">ZIP Code *</label>
                    <input
                      className="input"
                      value={form.zip}
                      onChange={(e) =>
                        set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      if (
                        form.firstName &&
                        form.lastName &&
                        form.email &&
                        form.address &&
                        form.city &&
                        form.zip
                      ) {
                        setStep("payment");
                      }
                    }}
                    className="btn-gold"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="font-serif text-xl font-bold text-[#3D1F0F] mb-2 flex items-center gap-2">
                  <CreditCard size={20} className="text-[#C9A84C]" />
                  Payment Details
                </h2>
                <p className="text-xs text-[#3D1F0F]/40 mb-6 flex items-center gap-1">
                  <Lock size={12} className="text-green-500" /> Your payment
                  information is encrypted and secure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="label">Name on Card *</label>
                    <input
                      className="input"
                      value={form.cardName}
                      onChange={(e) => set("cardName", e.target.value)}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Card Number *</label>
                    <input
                      className="input font-mono tracking-widest"
                      value={form.cardNumber}
                      onChange={(e) =>
                        set("cardNumber", formatCardNumber(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Expiry *</label>
                    <input
                      className="input font-mono"
                      value={form.expiry}
                      onChange={(e) =>
                        set("expiry", formatExpiry(e.target.value))
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">CVV *</label>
                    <input
                      className="input font-mono"
                      value={form.cvv}
                      onChange={(e) =>
                        set("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      placeholder="•••"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep("shipping")}
                    className="btn-outline-gold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      if (
                        form.cardName &&
                        form.cardNumber.length >= 19 &&
                        form.expiry.length === 5 &&
                        form.cvv.length >= 3
                      ) {
                        setStep("review");
                      }
                    }}
                    className="btn-gold"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Review Step */}
            {step === "review" && (
              <form onSubmit={handlePlaceOrder}>
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
                  <h2 className="font-serif text-xl font-bold text-[#3D1F0F]">
                    Review Your Order
                  </h2>

                  {/* Shipping summary */}
                  <div className="bg-[#FDF6EC] rounded-xl p-4 text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-[#3D1F0F]">
                        Ship to
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep("shipping")}
                        className="text-[#C9A84C] text-xs hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-[#3D1F0F]/70">
                      {form.firstName} {form.lastName}
                    </p>
                    <p className="text-[#3D1F0F]/70">
                      {form.address}
                      {form.apt ? `, ${form.apt}` : ""}, {form.city},{" "}
                      {form.state} {form.zip}
                    </p>
                    <p className="text-[#3D1F0F]/70">{form.email}</p>
                  </div>

                  {/* Payment summary */}
                  <div className="bg-[#FDF6EC] rounded-xl p-4 text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-[#3D1F0F]">Payment</p>
                      <button
                        type="button"
                        onClick={() => setStep("payment")}
                        className="text-[#C9A84C] text-xs hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-[#3D1F0F]/70 font-mono">
                      •••• •••• •••• {form.cardNumber.slice(-4)}
                    </p>
                    <p className="text-[#3D1F0F]/70">{form.cardName}</p>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep("payment")}
                      className="btn-outline-gold"
                    >
                      ← Back
                    </button>
                    <button type="submit" className="btn-gold flex items-center gap-2">
                      <Lock size={16} /> Place Order — ${orderTotal.toFixed(2)}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-[#3D1F0F] mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <ProductImagePlaceholder
                        color={item.color}
                        name={item.name}
                        image={item.image}
                        small
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#3D1F0F] truncate">
                        {item.name}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#3D1F0F] flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#C9A84C]/20 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#3D1F0F]/60">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#3D1F0F]/60">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#3D1F0F]/60">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#3D1F0F] pt-2 border-t border-[#C9A84C]/20 text-base">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input styles scoped to this page */}
      <style jsx global>{`
        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #3D1F0F;
          opacity: 0.6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.375rem;
        }
        .input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 0.75rem;
          background: #fdf9f0;
          color: #3D1F0F;
          font-size: 0.875rem;
          transition: all 0.15s;
          outline: none;
        }
        .input:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.15);
          background: #fff;
        }
      `}</style>
    </div>
  );
}
