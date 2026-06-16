import Image from "next/image";
import Link from "next/link";
import type { Voucher } from "@/lib/types";

interface Props {
  voucher: Voucher;
}

export default function VoucherCard({ voucher }: Props) {
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
          {/* Sold count */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            已售 {voucher.soldCount.toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* City tag */}
          <div className="flex items-center gap-2">
            <span className="badge bg-purple-50 text-purple-600">{voucher.city}</span>
            {voucher.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="badge bg-gray-100 text-gray-500">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
            {voucher.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-1">{voucher.subtitle}</p>

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

          {/* Valid until */}
          <p className="text-xs text-gray-400">活動期間至 {voucher.validUntil}</p>
        </div>
      </div>
    </Link>
  );
}
