"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Truck, CreditCard, Lock, Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import StripePaymentForm from "@/components/StripePaymentForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const stripeAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#C9A84C",
    colorBackground: "#fdf9f0",
    colorText: "#3D1F0F",
    colorDanger: "#ef4444",
    fontFamily: "Georgia, serif",
    borderRadius: "12px",
  },
  rules: {
    ".Input": { border: "1px solid rgba(201,168,76,0.4)", boxShadow: "none" },
    ".Input:focus": { border: "1px solid #C9A84C", boxShadow: "0 0 0 3px rgba(201,168,76,0.15)" },
    ".Label": { color: "#3D1F0F", fontWeight: "600", textTransform: "uppercase" as const, fontSize: "11px", letterSpacing: "0.05em" },
    ".Tab": { border: "1px solid rgba(201,168,76,0.3)" },
    ".Tab--selected": { borderColor: "#C9A84C", boxShadow: "none" },
  },
};

type Step = "shipping" | "payment" | "success";

interface ShippingData {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; apt: string; city: string; state: string; zip: string;
}

const emptyShipping: ShippingData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", apt: "", city: "", state: "MI", zip: "",
};

// ── Inner component (needs useSearchParams, so must be inside Suspense) ───────
function CheckoutInner() {
  const { items, totalPrice, clearCart } = useCart();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState<ShippingData>(emptyShipping);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [piError, setPiError] = useState<string | null>(null);
  const [creatingPI, setCreatingPI] = useState(false);

  // Local display values (used in the sidebar before the PI is created)
  const shippingFee = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.06;
  const orderTotal = totalPrice + shippingFee + tax;

  // Server-verified total — read from sessionStorage first so it survives
  // a 3DS redirect (page reloads fresh, React state is reset to null)
  const [verifiedTotal, setVerifiedTotal] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem("shatila-verified-total");
    return stored ? parseFloat(stored) : null;
  });

  const set = (field: keyof ShippingData, value: string) =>
    setShipping((s) => ({ ...s, [field]: value }));

  // ── Handle Stripe redirect return (3DS / bank redirect flow) ──────────────
  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");
    if (redirectStatus === "succeeded") {
      console.log("[checkout] 3DS redirect success, verifiedTotal from sessionStorage:", sessionStorage.getItem("shatila-verified-total"));
      sessionStorage.removeItem("shatila-verified-total");
      clearCart();
      setStep("success");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Create PaymentIntent when shipping is submitted ───────────────────────
  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingPI(true);
    setPiError(null);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.clientSecret) {
        setPiError(data.error ?? "Could not initialise payment. Please try again.");
        setCreatingPI(false);
        return;
      }

      console.log("[checkout] API response:", { total: data.total, subtotal: data.subtotal, shipping: data.shipping, tax: data.tax });
      sessionStorage.setItem("shatila-verified-total", String(data.total));
      setClientSecret(data.clientSecret);
      setVerifiedTotal(data.total);
      setStep("payment");
    } catch {
      setPiError("Network error. Please check your connection and try again.");
    } finally {
      setCreatingPI(false);
    }
  };

  const handlePaymentSuccess = () => {
    sessionStorage.removeItem("shatila-verified-total");
    clearCart();
    setStep("success");
  };

  // ── Step indicator ────────────────────────────────────────────────────────
  const steps = [
    { key: "shipping" as Step, label: "Shipping", icon: <Truck size={15} /> },
    { key: "payment" as Step, label: "Payment", icon: <CreditCard size={15} /> },
  ];
  const stepIndex = steps.findIndex((s) => s.key === step);

  // ── Empty cart guard ──────────────────────────────────────────────────────
  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <p className="font-serif text-2xl text-[#3D1F0F] mb-4">Your cart is empty</p>
          <Link href="/shop" className="btn-gold">Go to Shop</Link>
        </div>
      </div>
    );
  }

  // ── Success screen ────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4 pt-20">
        <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl p-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#3D1F0F] mb-3">
            Payment Confirmed!
          </h1>
          <p className="text-[#3D1F0F]/60 mb-2">
            {shipping.firstName
              ? `Thank you, ${shipping.firstName}! Your order has been placed.`
              : "Your order has been placed!"}
          </p>
          <p className="text-[#3D1F0F]/40 text-sm mb-8">
            {shipping.email && (
              <>A confirmation will be sent to <strong>{shipping.email}</strong>.<br /></>
            )}
            Your sweets are being prepared with love. 🍯
          </p>
          {shipping.address && (
            <div className="bg-[#FDF6EC] rounded-2xl p-4 text-sm text-left mb-8 space-y-1.5">
              <p className="text-[#3D1F0F]/60">
                <span className="font-semibold text-[#3D1F0F]">Order total:</span>{" "}
                ${(verifiedTotal ?? orderTotal).toFixed(2)}
              </p>
              <p className="text-[#3D1F0F]/60">
                <span className="font-semibold text-[#3D1F0F]">Ship to:</span>{" "}
                {shipping.address}{shipping.apt ? `, ${shipping.apt}` : ""},{" "}
                {shipping.city}, {shipping.state} {shipping.zip}
              </p>
            </div>
          )}
          <Link href="/" className="btn-gold w-full block text-center">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Main checkout layout ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#b08a30] text-sm font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <h1 className="font-serif text-4xl font-bold text-[#3D1F0F] mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center mb-10 max-w-xs">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center flex-1">
              <button
                onClick={() => i < stepIndex && setStep(s.key)}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  i === stepIndex ? "text-[#C9A84C]"
                  : i < stepIndex ? "text-[#3D1F0F]/60 cursor-pointer hover:text-[#C9A84C]"
                  : "text-[#3D1F0F]/30"
                }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  i === stepIndex ? "bg-[#C9A84C] border-[#C9A84C] text-white"
                  : i < stepIndex ? "bg-green-500 border-green-500 text-white"
                  : "border-[#3D1F0F]/20 text-[#3D1F0F]/30"
                }`}>
                  {i < stepIndex ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i < stepIndex ? "bg-green-500" : "bg-[#3D1F0F]/15"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Active step ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* Shipping */}
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="font-serif text-xl font-bold text-[#3D1F0F] mb-6 flex items-center gap-2">
                  <Truck size={20} className="text-[#C9A84C]" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">First Name *</label>
                    <input className="input" value={shipping.firstName} onChange={(e) => set("firstName", e.target.value)} required />
                  </div>
                  <div>
                    <label className="label">Last Name *</label>
                    <input className="input" value={shipping.lastName} onChange={(e) => set("lastName", e.target.value)} required />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input className="input" type="email" value={shipping.email} onChange={(e) => set("email", e.target.value)} required />
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input className="input" type="tel" value={shipping.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Street Address *</label>
                    <input className="input" value={shipping.address} onChange={(e) => set("address", e.target.value)} required />
                  </div>
                  <div>
                    <label className="label">Apt / Suite</label>
                    <input className="input" value={shipping.apt} onChange={(e) => set("apt", e.target.value)} />
                  </div>
                  <div>
                    <label className="label">City *</label>
                    <input className="input" value={shipping.city} onChange={(e) => set("city", e.target.value)} required />
                  </div>
                  <div>
                    <label className="label">State</label>
                    <select className="input" value={shipping.state} onChange={(e) => set("state", e.target.value)}>
                      {["MI","OH","IN","IL","WI","MN","IA","MO"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">ZIP Code *</label>
                    <input className="input" value={shipping.zip} onChange={(e) => set("zip", e.target.value.replace(/\D/g, "").slice(0, 5))} required />
                  </div>
                </div>

                {piError && (
                  <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {piError}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={creatingPI}
                    className={`btn-gold flex items-center gap-2 ${creatingPI ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {creatingPI ? (
                      <><Loader2 size={16} className="animate-spin" /> Setting up payment…</>
                    ) : (
                      "Continue to Payment →"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Payment — Elements initialised with a real clientSecret */}
            {step === "payment" && clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance: stripeAppearance }}
              >
                <StripePaymentForm
                  orderTotal={verifiedTotal ?? orderTotal}
                  onSuccess={handlePaymentSuccess}
                  onBack={() => setStep("shipping")}
                />
              </Elements>
            )}
          </div>

          {/* ── Order summary sidebar ─────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-[#3D1F0F] mb-4">Order Summary</h3>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <ProductImagePlaceholder color={item.color} name={item.name} image={item.image} small />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#3D1F0F] truncate">{item.name}</p>
                    </div>
                    <span className="text-sm font-bold text-[#3D1F0F] flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#C9A84C]/20 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-[#3D1F0F]/60">
                  <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#3D1F0F]/60">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? "text-green-600 font-semibold" : ""}>
                    {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#3D1F0F]/60">
                  <span>Tax</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#3D1F0F] pt-2 border-t border-[#C9A84C]/20 text-base">
                  <span>Total</span><span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[#3D1F0F]/30 text-xs">
                <Lock size={11} /> Secured by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .label {
          display: block; font-size: 0.75rem; font-weight: 600;
          color: #3d1f0f; opacity: 0.6; text-transform: uppercase;
          letter-spacing: 0.05em; margin-bottom: 0.375rem;
        }
        .input {
          width: 100%; padding: 0.625rem 0.875rem;
          border: 1px solid rgba(201,168,76,0.4); border-radius: 0.75rem;
          background: #fdf9f0; color: #3d1f0f; font-size: 0.875rem;
          transition: all 0.15s; outline: none;
        }
        .input:focus {
          border-color: #c9a84c;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.15);
          background: #fff;
        }
      `}</style>
    </div>
  );
}

// Suspense boundary required because CheckoutInner uses useSearchParams
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDF6EC]" />}>
      <CheckoutInner />
    </Suspense>
  );
}
