"use client";

import { useState, useMemo } from "react";
import type { Voucher } from "@/lib/types";
import VoucherCard from "./VoucherCard";
import FilterBar from "./FilterBar";

interface Props {
  initialVouchers: Voucher[];
}

export default function VoucherListClient({ initialVouchers }: Props) {
  const [selectedCity, setSelectedCity] = useState("全部");
  const [selectedSort, setSelectedSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...initialVouchers];

    if (selectedCity !== "全部") {
      result = result.filter((v) => v.city === selectedCity);
    }

    switch (selectedSort) {
      case "price-asc":
        result.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "discount":
        result.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case "popular":
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
    }

    return result;
  }, [initialVouchers, selectedCity, selectedSort]);

  return (
    <>
      <FilterBar
        selectedCity={selectedCity}
        selectedSort={selectedSort}
        onCityChange={setSelectedCity}
        onSortChange={setSelectedSort}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Result count */}
        <p className="text-sm text-gray-500 mb-4">
          共 <span className="font-medium text-gray-700">{filtered.length}</span> 個住宿券
          {selectedCity !== "全部" && (
            <span>
              ，地區：
              <span className="text-purple-600 font-medium">{selectedCity}</span>
            </span>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg">此地區目前沒有住宿券</p>
            <button
              onClick={() => setSelectedCity("全部")}
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
