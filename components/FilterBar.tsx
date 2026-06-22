"use client";

import { regions } from "@/lib/mockData";

interface Props {
  selectedRegion: string;
  selectedSort: string;
  onRegionChange: (region: string) => void;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: "default", label: "預設排序" },
  { value: "price-asc", label: "價格低到高" },
  { value: "price-desc", label: "價格高到低" },
  { value: "discount", label: "折扣最多" },
  { value: "popular", label: "最受歡迎" },
  { value: "remaining", label: "剩餘張數少" },
];

export default function FilterBar({ selectedRegion, selectedSort, onRegionChange, onSortChange }: Props) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Region filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => onRegionChange(r)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === r
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-500 flex-shrink-0">排序：</span>
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
