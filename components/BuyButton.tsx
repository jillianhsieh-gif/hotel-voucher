"use client";

import { useRouter } from "next/navigation";

interface Props {
  voucherId: string;
}

export default function BuyButton({ voucherId }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/order?id=${voucherId}`)}
      className="btn-primary text-lg"
    >
      立即購買
    </button>
  );
}
