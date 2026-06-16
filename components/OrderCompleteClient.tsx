"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { PaymentMethod } from "@/lib/types";

const PAYMENT_LABELS: Record<PaymentMethod, { label: string; icon: string }> = {
  apple_pay:   { label: "Apple Pay",  icon: "" },
  line_pay:    { label: "LINE Pay",   icon: "💚" },
  credit_card: { label: "信用卡",     icon: "💳" },
};

export default function OrderCompleteClient() {
  const searchParams = useSearchParams();
  const orderId   = searchParams.get("orderId") ?? "ORD00000000";
  const email     = searchParams.get("email")   ?? "";
  const isGuest   = searchParams.get("guest")   === "1";
  const payment   = (searchParams.get("payment") ?? "") as PaymentMethod | "";
  const paymentInfo = payment && PAYMENT_LABELS[payment] ? PAYMENT_LABELS[payment] : null;

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
      {/* Success icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">付款成功！</h1>
        <p className="text-gray-500">感謝您的購買，電子票券已寄出</p>
      </div>

      {/* Order info card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 text-left">
        {/* Order ID */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-sm text-gray-500">訂單編號</span>
          <span className="font-bold text-gray-800 tracking-wider">{orderId}</span>
        </div>

        <div className="space-y-3">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">電子票券已寄送至</p>
              <p className="text-sm text-blue-600 break-all">{email || "您填寫的 Email"}</p>
            </div>
          </div>

          {/* Payment method */}
          {paymentInfo && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="3" strokeWidth={2} />
                  <path d="M1 10h22" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">付款方式</p>
                <p className="text-sm text-gray-600">
                  {paymentInfo.icon && <span className="mr-1">{paymentInfo.icon}</span>}
                  {paymentInfo.label}
                </p>
              </div>
            </div>
          )}

          {/* Wait time */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">收信時間</p>
              <p className="text-sm text-gray-500">通常在 5 分鐘內送達，請也檢查垃圾郵件夾</p>
            </div>
          </div>

          {/* Usage */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">使用方式</p>
              <p className="text-sm text-gray-500">入住前請致電民宿預約，並出示 Email 中的 QR Code 核銷</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guest hint */}
      {isGuest && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 text-left space-y-1">
          <p className="font-medium">📋 訂單資訊已寄送至您的 Email</p>
          <p className="text-amber-700">
            如需在網站上查看訂單記錄，請
            <Link href="/login" className="underline font-medium mx-1">登入</Link>
            或
            <Link href="/login" className="underline font-medium mx-1">註冊會員</Link>
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <Link href="/" className="btn-primary block">
          回首頁繼續購買
        </Link>
        <button
          onClick={() => window.print()}
          className="w-full border border-gray-300 text-gray-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          列印訂單
        </button>
      </div>

      <p className="text-xs text-gray-400">
        如有任何問題，請聯繫客服：<br />
        <span className="text-gray-600">service@hotelvoucher.tw</span>
      </p>
    </div>
  );
}
