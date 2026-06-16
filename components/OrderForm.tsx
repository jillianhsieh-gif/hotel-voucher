"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getVoucherById } from "@/lib/mockData";
import { useAuth } from "@/lib/AuthContext";
import PaymentSelector from "./PaymentSelector";
import type { Order, PaymentMethod } from "@/lib/types";

const ORDERS_KEY = "hotel_voucher_orders";

interface Props {
  isGuest: boolean;
}

export default function OrderForm({ isGuest }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const voucherId = searchParams.get("id") ?? "1";
  const voucher = getVoucherById(voucherId);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: "",
    email: user?.email ?? "",
  });
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [creditCard, setCreditCard] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!voucher) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>找不到商品</p>
        <Link href="/" className="text-purple-600 underline mt-2 block">回首頁</Link>
      </div>
    );
  }

  const total = voucher.salePrice * quantity;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "請填寫姓名";
    if (!/^09\d{8}$/.test(form.phone)) e.phone = "請填寫正確的手機號碼（09xxxxxxxx）";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "請填寫正確的 Email";
    if (!paymentMethod) {
      e.paymentMethod = "請選擇付款方式";
    } else if (paymentMethod === "credit_card") {
      if (creditCard.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "請輸入完整卡號";
      if (!/^\d{2}\/\d{2}$/.test(creditCard.expiry)) e.expiry = "請輸入正確格式 MM/YY";
      if (creditCard.cvv.length < 3) e.cvv = "請輸入 CVV";
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!voucher) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1400));

    const orderId = "ORD" + Date.now().toString().slice(-8);
    const method = paymentMethod!;

    // Only save to localStorage for logged-in members
    if (!isGuest) {
      const newOrder: Order = {
        orderId,
        voucherId: voucher.id,
        voucherTitle: voucher.title,
        voucherImage: voucher.images[0],
        name: form.name,
        phone: form.phone,
        email: form.email,
        quantity,
        totalPrice: voucher.salePrice * quantity,
        createdAt: new Date().toISOString(),
        paymentMethod: method,
      };
      const existing: Order[] = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
      localStorage.setItem(ORDERS_KEY, JSON.stringify([newOrder, ...existing]));
    }

    const guestParam = isGuest ? "&guest=1" : "";
    router.push(
      `/order/complete?orderId=${orderId}&email=${encodeURIComponent(form.email)}&payment=${method}${guestParam}`
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Guest banner */}
      {isGuest && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          <span className="text-lg">👤</span>
          <p>
            您正以訪客身份下單。
            <Link
              href={`/login?redirect=${encodeURIComponent(`/order?id=${voucherId}`)}`}
              className="underline font-medium ml-1"
            >
              登入會員
            </Link>
            可自動帶入資料並保存訂單記錄。
          </p>
        </div>
      )}

      {/* Voucher summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
        <div className="relative w-24 h-18 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={voucher.images[0]}
            alt={voucher.title}
            width={96}
            height={72}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 text-sm line-clamp-2">{voucher.title}</p>
          <p className="text-purple-600 font-bold mt-1">NT$ {voucher.salePrice.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-0.5">活動期間至 {voucher.validUntil}</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
        <h2 className="font-bold text-gray-800">選擇數量</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-300 text-xl font-bold text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center"
          >
            −
          </button>
          <span className="text-xl font-bold w-8 text-center">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-300 text-xl font-bold text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center"
          >
            ＋
          </button>
          <span className="text-sm text-gray-400">（最多 10 張）</span>
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-800">訂購人資料</h2>
          {!isGuest && user && (
            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              ✓ 已自動帶入會員資料
            </span>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            姓名 <span className="text-purple-600">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
            placeholder="請輸入真實姓名"
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.name ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {errors.name && <p className="text-purple-600 text-xs">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            手機號碼 <span className="text-purple-600">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
            placeholder="09xxxxxxxx"
            maxLength={10}
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.phone ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {errors.phone && <p className="text-purple-600 text-xs">{errors.phone}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Email <span className="text-purple-600">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
            placeholder="ticket@example.com"
            className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.email ? "border-purple-400 focus:ring-purple-300" : "border-gray-300 focus:ring-purple-400"
            }`}
          />
          {errors.email && <p className="text-purple-600 text-xs">{errors.email}</p>}
          <p className="text-xs text-gray-400">電子票券將寄送至此 Email</p>
        </div>
      </div>

      {/* Payment method */}
      <PaymentSelector
        selected={paymentMethod}
        onSelect={(m) => { setPaymentMethod(m); setErrors({ ...errors, paymentMethod: "" }); }}
        creditCard={creditCard}
        onCreditCardChange={setCreditCard}
        errors={errors}
      />

      {/* Order summary */}
      <div className="bg-gray-50 rounded-xl p-5 space-y-2">
        <h2 className="font-bold text-gray-800 mb-3">訂單明細</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>住宿券 × {quantity}</span>
          <span>NT$ {(voucher.salePrice * quantity).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>手續費</span>
          <span className="text-green-600">免費</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-800">
          <span>應付金額</span>
          <span className="text-purple-600 text-xl">NT$ {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Terms */}
      <p className="text-xs text-gray-400 text-center">
        按下確認付款即表示您同意本站
        <span className="text-purple-400 cursor-pointer"> 服務條款 </span>
        與
        <span className="text-purple-400 cursor-pointer"> 隱私政策</span>
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            付款處理中...
          </>
        ) : (
          `確認付款 NT$ ${total.toLocaleString()}`
        )}
      </button>
    </form>
  );
}
