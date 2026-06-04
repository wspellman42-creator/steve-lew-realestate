"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

const bathOptions = ["Baths", "1+", "2+", "3+", "4+"];
const priceOptions = ["Any", "$100,000", "$200,000", "$300,000", "$400,000", "$500,000", "$800,000", "$1,000,000+"];
const bedOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
const propertyTypes = [
  "Any", "Single Family Home", "Multi-Family", "Condo",
  "Townhouse", "Manufactured Home", "Vacant Land", "Commercial",
];

export default function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [baths, setBaths] = useState("Baths");
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("Any");
  const [beds, setBeds] = useState("Any");
  const [propType, setPropType] = useState("Any");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (baths !== "Baths") params.set("baths", baths);
    router.push(`/listing?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {/* Primary search row — matches original's single-row layout */}
      <div className="flex items-stretch bg-white shadow-lg">
        <input
          type="text"
          placeholder="City, County, Subdivision, etc"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 min-w-0 px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
        />
        {/* Baths dropdown */}
        <div className="relative border-l border-gray-200">
          <select
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            className="h-full appearance-none px-4 pr-8 text-sm text-gray-700 bg-white outline-none cursor-pointer"
          >
            {bathOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
        </div>
        {/* Filters toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-5 border-l border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Filters</span>
        </button>
        {/* Search button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center px-6 bg-white border-l border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Search"
        >
          <Search size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Expanded filter row */}
      {showFilters && (
        <div className="bg-black/70 backdrop-blur-sm border-t border-white/10 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <FilterSelect label="Min Price" value={minPrice} options={priceOptions} onChange={setMinPrice} />
          <FilterSelect label="Max Price" value={maxPrice} options={priceOptions} onChange={setMaxPrice} />
          <FilterSelect label="Beds" value={beds} options={bedOptions} onChange={setBeds} />
          <FilterSelect label="Property Type" value={propType} options={propertyTypes} onChange={setPropType} />
        </div>
      )}

      {/* Search button below — matches original */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-white text-gray-900 text-[11px] tracking-[0.25em] uppercase font-semibold px-14 py-3.5 hover:bg-gray-100 transition-colors shadow"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

function FilterSelect({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] text-white/50 tracking-widest uppercase">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white/10 border border-white/20 text-white text-xs px-3 py-2.5 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-gray-900 text-white">{o}</option>
        ))}
      </select>
    </div>
  );
}
