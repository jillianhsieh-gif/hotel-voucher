import { Suspense } from "react";
import MyOrdersClient from "@/components/MyOrdersClient";
import AuthGuard from "@/components/AuthGuard";

export const metadata = { title: "我的訂單 | 住宿優惠券" };

export default function MyOrdersPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">載入中...</div>}>
      <AuthGuard>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">我的訂單</h1>
          <MyOrdersClient />
        </div>
      </AuthGuard>
    </Suspense>
  );
}
