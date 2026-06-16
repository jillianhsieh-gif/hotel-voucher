"use client";

import { useRouter } from "next/navigation";

interface Props {
  voucherId: string;
}

export default function BuyButton({ voucherId }: Props) {
  const router = useRouter();

  function handleClick() {
    router.push(`/order?id=${voucherId}`);
  }

  return (
    <button onClick={handleClick} className="btn-primary text-lg">
      立即購買
    </button>
  );
}
