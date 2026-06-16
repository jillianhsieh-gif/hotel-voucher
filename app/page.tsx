import VoucherListClient from "@/components/VoucherListClient";
import { vouchers } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div>
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">精選民宿住宿券</h1>
          <p className="text-purple-100 text-sm md:text-base">
            最低 5 折入住台灣各地精選民宿，限量搶購中！
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">5 折</span>
              <span className="text-purple-200">最高優惠</span>
            </div>
            <div className="w-px bg-purple-400" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">5+</span>
              <span className="text-purple-200">精選民宿</span>
            </div>
            <div className="w-px bg-purple-400" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">6,448</span>
              <span className="text-purple-200">張已售出</span>
            </div>
          </div>
        </div>
      </div>

      {/* Voucher list with filter */}
      <VoucherListClient initialVouchers={vouchers} />
    </div>
  );
}
