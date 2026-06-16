"use client";

import type { PaymentMethod } from "@/lib/types";

interface CreditCardFields {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface Props {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  creditCard: CreditCardFields;
  onCreditCardChange: (fields: CreditCardFields) => void;
  errors: Record<string, string>;
}

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  {
    id: "apple_pay",
    label: "Apple Pay",
    icon: (
      // Apple Pay wordmark SVG (monochrome)
      <svg viewBox="0 0 165 42" className="h-7 w-auto" fill="currentColor" aria-hidden>
        <path d="M13.4 6.6c1.4-1.7 2.3-4 2.1-6.3-2 .1-4.5 1.3-5.9 3C8.3 4.8 7.2 7.2 7.5 9.4c2.2.2 4.5-1.1 5.9-2.8zM15.4 10c-3.3-.2-6.1 1.9-7.7 1.9-1.6 0-4-1.8-6.6-1.7C-2 10.3-4.9 13-6.1 16.8c-2.5 7 1.8 17.3 4.2 23 1.1 2.7 2.5 5.5 4.3 5.5 1.7 0 2.4-1.1 4.5-1.1 2.1 0 2.7 1.1 4.5 1.1 1.8 0 3.1-2.6 4.2-5.3.5-1.1.8-2 .8-2-.1 0-4.8-1.8-4.8-7.1 0-4.5 3.6-6.6 3.8-6.7-2.1-3-5.3-3.3-6-3.3zM35.4 3.5h-8.7v22.6h3.4V19h5.4c4.9 0 8.4-3.4 8.4-7.8 0-4.3-3.4-7.7-8.5-7.7zm.5 11.2h-4.7V6.6h4.7c3.2 0 5 1.7 5 4.1s-1.8 4-5 4zM58.3 26.4c-2.4 0-4.1-1.1-5-2.8l-3 1c1.2 2.9 3.9 4.9 7.9 4.9 4.7 0 7.8-2.7 7.8-6.7 0-3.2-1.8-5-5.6-5.9l-2.5-.6c-2.2-.5-3.1-1.4-3.1-2.8 0-1.7 1.4-2.9 3.7-2.9 2.2 0 3.6 1.1 4.3 2.6l2.9-1.1c-1-2.6-3.5-4.5-7.2-4.5-4.3 0-7.2 2.6-7.2 6.2 0 3 1.8 4.9 5.4 5.8l2.5.6c2.4.6 3.3 1.5 3.3 3.1 0 1.9-1.6 3.1-4.2 3.1zM79.6 8.4c-2.4 0-4.4 1.2-5.5 3.1V8.7h-3.2v21.7h3.3V23c1.1 1.8 3 2.9 5.4 2.9 4.4 0 7.5-3.5 7.5-8.7 0-5.2-3.1-8.8-7.5-8.8zm-.8 14.5c-2.8 0-4.7-2.2-4.7-5.7s1.9-5.7 4.7-5.7c2.7 0 4.6 2.2 4.6 5.7s-1.9 5.7-4.6 5.7zM97.2 28.3c-3.2 9.3-4.4 11-8.3 11-1.1 0-2.2-.2-3-.5l.5-2.9c.7.2 1.4.3 2.2.3 1.7 0 2.7-.9 3.5-3.2l.4-1.2-6.6-23.1h3.5l4.7 17.4 4.7-17.4h3.5l-4.6 16.1.3-.5z" />
      </svg>
    ),
  },
  {
    id: "line_pay",
    label: "LINE Pay",
    icon: (
      // LINE Pay: green pill badge
      <span className="inline-flex items-center gap-1 font-extrabold text-[#00B900] text-lg tracking-tight leading-none">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#00B900]" aria-hidden>
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.631.631 0 0 1-.629-.629V8.108c0-.345.282-.63.63-.63h2.386c.348 0 .63.285.63.63 0 .349-.282.63-.63.63H17.61v1.125h1.755zm-3.855 3.016a.63.63 0 0 1-.63.63.624.624 0 0 1-.51-.261l-2.34-3.195v2.826a.629.629 0 0 1-.63.63.628.628 0 0 1-.629-.63V8.108a.63.63 0 0 1 .63-.63.624.624 0 0 1 .51.261l2.34 3.194V8.108a.629.629 0 1 1 1.259 0v4.771zm-5.741 0a.629.629 0 0 1-1.259 0V8.108a.629.629 0 1 1 1.259 0v4.771zm-2.276.63H5.107a.631.631 0 0 1-.63-.63V8.108c0-.345.283-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.108 9.436-7.025C23.176 14.307 24 12.402 24 10.314" />
        </svg>
        LINE Pay
      </span>
    ),
  },
  {
    id: "credit_card",
    label: "信用卡",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <rect x="1" y="4" width="22" height="16" rx="3" />
        <path d="M1 10h22" strokeLinecap="round" />
        <path d="M5 15h4M14 15h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function PaymentSelector({ selected, onSelect, creditCard, onCreditCardChange, errors }: Props) {
  function formatCardNumber(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      <h2 className="font-bold text-gray-800">選擇付款方式</h2>

      {errors.paymentMethod && (
        <p className="text-purple-600 text-xs -mt-2">{errors.paymentMethod}</p>
      )}

      <div className="space-y-3">
        {METHODS.map((method) => {
          const isSelected = selected === method.id;
          return (
            <div key={method.id}>
              {/* Card option */}
              <button
                type="button"
                onClick={() => onSelect(method.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {/* Selection indicator */}
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? "border-purple-500" : "border-gray-300"
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                </div>

                {/* Logo */}
                <div className="flex-shrink-0 w-20 flex items-center">
                  {method.icon}
                </div>

                {/* Label */}
                <span className={`font-medium text-sm ${isSelected ? "text-purple-700" : "text-gray-700"}`}>
                  {method.label}
                </span>
              </button>

              {/* Credit card fields — expand when selected */}
              {method.id === "credit_card" && isSelected && (
                <div className="mt-2 mx-1 p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100">
                  {/* Card number */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">卡號</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={creditCard.cardNumber}
                      onChange={(e) =>
                        onCreditCardChange({ ...creditCard, cardNumber: formatCardNumber(e.target.value) })
                      }
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm tracking-widest focus:outline-none focus:ring-2 transition-colors ${
                        errors.cardNumber ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
                      }`}
                    />
                    {errors.cardNumber && <p className="text-purple-600 text-xs">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Expiry */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">有效期限</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/YY"
                        value={creditCard.expiry}
                        onChange={(e) =>
                          onCreditCardChange({ ...creditCard, expiry: formatExpiry(e.target.value) })
                        }
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${
                          errors.expiry ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
                        }`}
                      />
                      {errors.expiry && <p className="text-purple-600 text-xs">{errors.expiry}</p>}
                    </div>

                    {/* CVV */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">安全碼 CVV</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        placeholder="123"
                        maxLength={4}
                        value={creditCard.cvv}
                        onChange={(e) =>
                          onCreditCardChange({ ...creditCard, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })
                        }
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors ${
                          errors.cvv ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
                        }`}
                      />
                      {errors.cvv && <p className="text-purple-600 text-xs">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 pt-1">
        實際上線將串接 OwlPay，此為示意流程。
      </p>
    </div>
  );
}
