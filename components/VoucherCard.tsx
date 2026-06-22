import Image from "next/image";
import Link from "next/link";
import type { Voucher } from "@/lib/types";

interface Props {
  voucher: Voucher;
}

export default function VoucherCard({ voucher }: Props) {
  const isLow = voucher.remaining <= 5;

  return (
    <Link href={`/product/${voucher.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden card-shadow border border-gray-100">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={voucher.images[0]}
            alt={voucher.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Discount badge */}
          <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            省 {voucher.discountPercent}%
          </div>
          {/* Remaining / sold */}
          <div className={`absolute bottom-3 right-3 text-white text-xs px-2 py-1 rounded-full ${
            isLow ? "bg-red-500" : "bg-black/60"
          }`}>
            {isLow ? `⚡ 僅剩 ${voucher.remaining} 張` : `已售 ${voucher.soldCount.toLocaleString()}`}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Region + tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="badge bg-purple-50 text-purple-600">{voucher.region}</span>
            <span className="badge bg-gray-100 text-gray-500">{voucher.city}</span>
            {voucher.tags.slice(0, 1).map((tag) => (
              <span key={tag} className="badge bg-gray-100 text-gray-500">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
            {voucher.title}
          </h3>

          {/* Room type */}
          <p className="text-xs text-purple-500 font-medium">🛏 {voucher.roomType}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm">
            <span className="text-yellow-400">★</span>
            <span className="font-medium text-gray-700">{voucher.rating}</span>
            <span className="text-gray-400">({voucher.reviewCount} 則評價)</span>
          </div>

          {/* Price */}
          <div className="pt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-600">
              NT$ {voucher.salePrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {voucher.originalPrice.toLocaleString()}
            </span>
          </div>

          {/* Activity period */}
          <p className="text-xs text-gray-400">
            活動期間：{voucher.validFrom} ~ {voucher.validUntil}
          </p>
        </div>
      </div>
    </Link>
  );
}
