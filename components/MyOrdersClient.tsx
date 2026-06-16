"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Order } from "@/lib/types";

const ORDERS_KEY = "hotel_voucher_orders";

export default function MyOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(ORDERS_KEY);
    setOrders(stored ? JSON.parse(stored) : []);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="text-center text-gray-400 py-20">載入中...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-5xl">🎫</p>
        <p className="text-gray-500 text-lg">還沒有訂單記錄</p>
        <Link href="/" className="inline-block btn-primary w-auto px-8">
          去挑選住宿券
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">共 {orders.length} 筆訂單</p>

      {orders.map((order) => (
        <div
          key={order.orderId}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          {/* Order header */}
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-100">
            <span className="text-xs text-gray-400 font-mono">{order.orderId}</span>
            <span className="badge bg-green-100 text-green-600 font-medium">已完成</span>
          </div>

          {/* Voucher info */}
          <div className="p-4 flex gap-4">
            <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={order.voucherImage}
                alt={order.voucherTitle}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm line-clamp-2 leading-snug">
                {order.voucherTitle}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                數量：{order.quantity} 張
              </p>
            </div>
          </div>

          {/* Order details */}
          <div className="px-4 pb-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>訂購人</span>
              <span className="font-medium">{order.name}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>手機</span>
              <span>{order.phone}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>票券寄送</span>
              <span className="text-blue-600 break-all text-right max-w-[60%]">{order.email}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>訂購時間</span>
              <span>{new Date(order.createdAt).toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-100 mt-2">
              <span>實付金額</span>
              <span className="text-purple-600 text-base">NT$ {order.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
