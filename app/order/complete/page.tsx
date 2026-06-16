import { Suspense } from "react";
import OrderCompleteClient from "@/components/OrderCompleteClient";

export const metadata = { title: "訂購完成 | 住宿優惠券" };

export default function OrderCompletePage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">載入中...</div>}>
      <OrderCompleteClient />
    </Suspense>
  );
}
