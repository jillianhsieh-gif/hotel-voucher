import { Suspense } from "react";
import MyOrdersClient from "@/components/MyOrdersClient";

export const metadata = { title: "我的訂單 | 住宿優惠券" };

export default function MyOrdersPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">我的訂單</h1>
      <Suspense fallback={<div className="text-center text-gray-400 py-20">載入中...</div>}>
        <MyOrdersClient />
      </Suspense>
    </div>
  );
}
