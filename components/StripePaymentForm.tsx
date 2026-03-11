"use client";

import { useState, FormEvent } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";

interface Props {
  orderTotal: number;
  onSuccess: () => void;
  onBack: () => void;
}

export default function StripePaymentForm({ orderTotal, onSuccess, onBack }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Stripe redirects here if the payment method requires it (e.g. 3DS).
          // The page reads redirect_status on load and shows the success screen.
          return_url: `${window.location.origin}/checkout?redirect_status=succeeded`,
        },
        // For standard cards no redirect is needed — confirmPayment returns
        // immediately with either a paymentIntent or an error object.
        redirect: "if_required",
      });

      if (error) {
        // Card declined, validation error, etc.
        setErrorMessage(error.message ?? "Payment failed. Please try again.");
        setIsProcessing(false);
      } else {
        // Confirmed without redirect → call the parent success handler
        onSuccess();
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-serif text-xl font-bold text-[#3D1F0F] flex items-center gap-2">
          <Lock size={18} className="text-[#C9A84C]" />
          Payment Details
        </h2>
        <div className="flex gap-1.5">
          {["VISA", "MC", "AMEX"].map((b) => (
            <span
              key={b}
              className="text-[9px] font-bold px-1.5 py-1 border border-[#3D1F0F]/20 rounded text-[#3D1F0F]/40"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#3D1F0F]/40 mb-6 flex items-center gap-1">
        <Lock size={11} className="text-green-500" />
        Secured by Stripe · 256-bit TLS encryption
      </p>

      <div className="mb-6">
        <PaymentElement
          options={{
            layout: "tabs",
            fields: { billingDetails: { address: "never" } },
          }}
        />
      </div>

      {errorMessage && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {errorMessage}
        </div>
      )}

      <div className="flex justify-between items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="btn-outline-gold"
        >
          ← Back
        </button>

        <button
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className={`flex-1 flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full transition-all duration-200 ${
            isProcessing || !stripe
              ? "bg-[#C9A84C]/50 text-white cursor-not-allowed"
              : "bg-[#C9A84C] hover:bg-[#b08a30] text-white shadow-md hover:shadow-lg active:scale-95"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <Lock size={16} />
              Pay ${orderTotal.toFixed(2)}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
