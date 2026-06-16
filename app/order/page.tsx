import { Suspense } from "react";
import OrderForm from "@/components/OrderForm";
import AuthGuard from "@/components/AuthGuard";

export const metadata = { title: "訂購填寫 | 住宿優惠券" };

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">載入中...</div>}>
      <AuthGuard>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">填寫訂購資料</h1>
          <OrderForm />
        </div>
      </AuthGuard>
    </Suspense>
  );
}
