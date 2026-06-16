"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

interface Props {
  voucherId: string;
}

export default function BuyButton({ voucherId }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  function handleClick() {
    const destination = `/order?id=${voucherId}`;
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(destination)}`);
    } else {
      router.push(destination);
    }
  }

  return (
    <button onClick={handleClick} className="btn-primary text-lg">
      立即購買
    </button>
  );
}
