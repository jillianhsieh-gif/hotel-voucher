import { getVoucherById, vouchers } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import BuyButton from "@/components/BuyButton";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return vouchers.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props) {
  const voucher = getVoucherById(params.id);
  if (!voucher) return {};
  return { title: `${voucher.title} | 住宿優惠券` };
}

export default function ProductPage({ params }: Props) {
  const voucher = getVoucherById(params.id);
  if (!voucher) notFound();

  const savings = voucher.originalPrice - voucher.salePrice;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600 transition-colors">首頁</Link>
        <span>›</span>
        <span className="text-gray-600">{voucher.city}</span>
        <span>›</span>
        <span className="text-gray-800 line-clamp-1">{voucher.hotelName}</span>
      </nav>

      {/* Image carousel */}
      <ImageCarousel images={voucher.images} alt={voucher.title} />

      {/* Title & meta */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-purple-50 text-purple-600">{voucher.region}</span>
          <span className="badge bg-gray-100 text-gray-500">{voucher.city}</span>
          {voucher.tags.map((tag) => (
            <span key={tag} className="badge bg-gray-100 text-gray-500">{tag}</span>
          ))}
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
          {voucher.title}
        </h1>
        <p className="text-sm text-purple-500 font-medium">🛏 {voucher.roomType}</p>
        <p className="text-gray-500">{voucher.subtitle}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(voucher.rating) ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="font-medium text-gray-700">{voucher.rating}</span>
          <span className="text-gray-400">({voucher.reviewCount} 則評價)</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400">已售 {voucher.soldCount.toLocaleString()} 張</span>
        </div>
      </div>

      {/* Price card */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-purple-600">
            NT$ {voucher.salePrice.toLocaleString()}
          </span>
          <span className="text-gray-400 line-through text-lg">
            {voucher.originalPrice.toLocaleString()}
          </span>
          <span className="bg-purple-600 text-white text-sm font-bold px-2 py-0.5 rounded-md">
            省 {voucher.discountPercent}%
          </span>
        </div>
        <p className="text-sm text-purple-700 font-medium">
          立省 NT$ {savings.toLocaleString()}！限量優惠，售完為止
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">活動期間：{voucher.validFrom} ~ {voucher.validUntil}</span>
          {voucher.remaining <= 10 && (
            <span className="text-red-500 font-bold">⚡ 僅剩 {voucher.remaining} 張</span>
          )}
        </div>

        {/* Buy button — client component */}
        <BuyButton voucherId={voucher.id} />
      </div>

      {/* Description */}
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 border-l-4 border-purple-600 pl-3">
          民宿介紹
        </h2>
        <p className="text-gray-600 leading-relaxed">{voucher.description}</p>
      </section>

      {/* Includes */}
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 border-l-4 border-purple-600 pl-3">
          包含內容
        </h2>
        <ul className="space-y-1.5">
          {voucher.includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-600">
              <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Usage instructions */}
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 border-l-4 border-purple-600 pl-3">
          使用方式
        </h2>
        <ol className="space-y-2">
          {[
            "購買後電子票券將寄至您的 Email",
            "入住前請向民宿電話預約訂房（注意訂購的時間為住宿券可使用之範圍）",
            "訂房時請說明當天會使用票券入住",
            "入住當天出示票券編號給民宿人員核銷",
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-gray-600">
              <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Notes */}
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 border-l-4 border-purple-600 pl-3">
          注意事項
        </h2>
        <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
          <p className="text-gray-400 text-sm italic">
            此區塊內容由民宿業者於後台上架住宿券時自行設定，每張住宿券的注意事項將依各民宿規定顯示，內容可能包含入退房時間、取消政策、使用限制等。
          </p>
        </div>
      </section>

      {/* Sticky bottom CTA on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">優惠價</span>
          <span className="text-xl font-bold text-purple-600">
            NT$ {voucher.salePrice.toLocaleString()}
          </span>
        </div>
        <BuyButton voucherId={voucher.id} />
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-24 md:hidden" />
    </div>
  );
}
