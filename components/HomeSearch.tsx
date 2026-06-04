"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

const priceOptions = ["Any", "$100,000", "$150,000", "$200,000", "$400,000", "$800,000"];
const bedOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
const bathOptions = ["Any", "1+", "2+", "3+", "4+"];
const propertyTypes = [
  "Any",
  "Single Family Home",
  "Multi-Family",
  "Condo",
  "Townhouse",
  "Manufactured Home",
  "Vacant Land",
  "Commercial",
];

export default function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("Any");
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [propType, setPropType] = useState("Any");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (minPrice !== "Any") params.set("minPrice", minPrice);
    if (maxPrice !== "Any") params.set("maxPrice", maxPrice);
    if (beds !== "Any") params.set("beds", beds);
    if (baths !== "Any") params.set("baths", baths);
    if (propType !== "Any") params.set("type", propType);
    router.push(`/listing?${params.toString()}`);
  };

  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4">
      {/* Main Search Row */}
      <div className="flex gap-0">
        <input
          type="text"
          placeholder="City, County, Subdivision, etc"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 bg-white text-gray-900 px-4 py-3.5 text-sm placeholder:text-gray-400 outline-none"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-300 transition-colors border-l border-gray-300"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
        <button
          onClick={handleSearch}
          className="bg-white px-5 flex items-center justify-center border-l border-gray-300 hover:bg-gray-100 transition-colors"
          aria-label="Search"
        >
          <Search size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-2">
          <FilterSelect label="Min Price" value={minPrice} options={priceOptions} onChange={setMinPrice} />
          <FilterSelect label="Max Price" value={maxPrice} options={priceOptions} onChange={setMaxPrice} />
          <FilterSelect label="Beds" value={beds} options={bedOptions} onChange={setBeds} />
          <FilterSelect label="Baths" value={baths} options={bathOptions} onChange={setBaths} />
          <FilterSelect label="Property Type" value={propType} options={propertyTypes} onChange={setPropType} />
        </div>
      )}

      {/* Quick action */}
      <div className="mt-3 text-center">
        <button
          onClick={handleSearch}
          className="bg-white text-black text-xs tracking-widest uppercase px-10 py-3 hover:bg-gray-100 transition-colors"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white/10 border border-white/20 text-white text-xs px-3 py-2.5 outline-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-gray-900 text-white">
            {label === "Min Price" || label === "Max Price" ? o : o}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown size={12} className="text-white/60" />
      </div>
      <label className="absolute -top-2 left-2 text-[9px] text-white/50 tracking-wider bg-transparent px-1">
        {label}
      </label>
    </div>
  );
}
