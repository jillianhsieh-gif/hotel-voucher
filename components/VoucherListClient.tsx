"use client";

import { useState, useMemo } from "react";
import type { Voucher } from "@/lib/types";
import VoucherCard from "./VoucherCard";
import FilterBar from "./FilterBar";

interface Props {
  initialVouchers: Voucher[];
}

export default function VoucherListClient({ initialVouchers }: Props) {
  const [selectedRegion, setSelectedRegion] = useState("全部地區");
  const [selectedSort, setSelectedSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...initialVouchers];

    if (selectedRegion !== "全部地區") {
      result = result.filter((v) => v.region === selectedRegion);
    }

    switch (selectedSort) {
      case "price-asc":    result.sort((a, b) => a.salePrice - b.salePrice); break;
      case "price-desc":   result.sort((a, b) => b.salePrice - a.salePrice); break;
      case "discount":     result.sort((a, b) => b.discountPercent - a.discountPercent); break;
      case "popular":      result.sort((a, b) => b.soldCount - a.soldCount); break;
      case "remaining":    result.sort((a, b) => a.remaining - b.remaining); break;
    }

    return result;
  }, [initialVouchers, selectedRegion, selectedSort]);

  return (
    <>
      <FilterBar
        selectedRegion={selectedRegion}
        selectedSort={selectedSort}
        onRegionChange={setSelectedRegion}
        onSortChange={setSelectedSort}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          共 <span className="font-medium text-gray-700">{filtered.length}</span> 個住宿券
          {selectedRegion !== "全部地區" && (
            <span>，地區：<span className="text-purple-600 font-medium">{selectedRegion}</span></span>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg">此地區目前沒有住宿券</p>
            <button
              onClick={() => setSelectedRegion("全部地區")}
              className="mt-4 text-purple-600 underline text-sm"
            >
              查看全部住宿券
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((voucher) => (
              <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
