import VoucherListClient from "@/components/VoucherListClient";
import { vouchers } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div>
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">精選飯店住宿券</h1>
          <p className="text-red-100 text-sm md:text-base">
            最低 5 折入住台灣各地精選飯店，限量搶購中！
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">5 折</span>
              <span className="text-red-200">最高優惠</span>
            </div>
            <div className="w-px bg-red-400" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">5+</span>
              <span className="text-red-200">精選飯店</span>
            </div>
            <div className="w-px bg-red-400" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">6,448</span>
              <span className="text-red-200">張已售出</span>
            </div>
          </div>
        </div>
      </div>

      {/* Voucher list with filter */}
      <VoucherListClient initialVouchers={vouchers} />
    </div>
  );
}
