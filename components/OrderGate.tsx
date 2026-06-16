"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import OrderForm from "./OrderForm";

export default function OrderGate() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const voucherId = searchParams.get("id") ?? "1";

  // 'choose' | 'guest' — member goes straight to form
  const [mode, setMode] = useState<"choose" | "guest">("choose");

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 text-gray-400">
        <svg className="animate-spin w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        載入中...
      </div>
    );
  }

  // Already logged in — go straight to the form
  if (user) {
    return <OrderForm isGuest={false} />;
  }

  // Guest mode selected
  if (mode === "guest") {
    return <OrderForm isGuest={true} />;
  }

  // Not logged in → show identity choice
  return (
    <div className="space-y-4">
      {/* Tip */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-sm text-purple-700">
        登入會員可自動帶入資料，並在「我的訂單」查看所有訂購記錄。
      </div>

      {/* Option 1: Member login */}
      <button
        onClick={() =>
          router.push(`/login?redirect=${encodeURIComponent(`/order?id=${voucherId}`)}`)
        }
        className="w-full flex items-center justify-between bg-white border-2 border-purple-500 text-purple-600 font-bold rounded-xl px-6 py-4 hover:bg-purple-50 transition-colors"
      >
        <div className="text-left">
          <p className="font-bold">會員登入</p>
          <p className="text-xs font-normal text-gray-500 mt-0.5">自動帶入資料，訂單永久保存</p>
        </div>
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Option 2: Guest checkout */}
      <button
        onClick={() => setMode("guest")}
        className="w-full flex items-center justify-between bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <p className="font-bold">以訪客身份繼續</p>
          <p className="text-xs font-normal text-gray-500 mt-0.5">無需登入，手動填寫訂購資料</p>
        </div>
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex items-center gap-3 text-xs text-gray-300">
        <div className="flex-1 h-px bg-gray-200" />
        <span>或</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    </div>
  );
}
