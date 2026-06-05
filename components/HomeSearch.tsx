"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const priceOptions = ["Any Price", "$100,000", "$150,000", "$200,000", "$250,000", "$300,000", "$350,000", "$400,000", "$500,000", "$600,000", "$750,000", "$1,000,000+"];
const bedOptions = ["Any Beds", "1+", "2+", "3+", "4+", "5+"];
const bathOptions = ["Any Baths", "1+", "2+", "3+", "4+"];
const propertyTypes = ["Any Type", "Single Family Home", "Multi-Family", "Condo", "Townhouse", "Manufactured Home", "Vacant Land", "Commercial"];

export default function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("Any Price");
  const [maxPrice, setMaxPrice] = useState("Any Price");
  const [beds, setBeds] = useState("Any Beds");
  const [baths, setBaths] = useState("Any Baths");
  const [propType, setPropType] = useState("Any Type");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (beds !== "Any Beds") params.set("beds", beds);
    if (baths !== "Any Baths") params.set("baths", baths);
    router.push(`/listing?${params.toString()}`);
  };

  return (
    <div className="w-full">
      {/* Main search bar */}
      <div className="flex items-stretch bg-white shadow-xl">
        <input
          type="text"
          placeholder="City, County, Zip Code, Subdivision…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 min-w-0 px-6 py-5 text-base text-gray-800 placeholder:text-gray-400 outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex items-center justify-center px-7 bg-white border-l border-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Search"
        >
          <Search size={22} className="text-gray-500" />
        </button>
      </div>

      {/* Always-visible filter row */}
      <div className="bg-black/60 backdrop-blur-sm border-t border-white/10 p-4 grid grid-cols-2 md:grid-cols-4 gap-3 mt-0">
        <FilterSelect label="Min Price" value={minPrice} options={priceOptions} onChange={setMinPrice} />
        <FilterSelect label="Max Price" value={maxPrice} options={priceOptions} onChange={setMaxPrice} />
        <FilterSelect label="Bedrooms" value={beds} options={bedOptions} onChange={setBeds} />
        <FilterSelect label="Bathrooms" value={baths} options={bathOptions} onChange={setBaths} />
        <FilterSelect label="Property Type" value={propType} options={propertyTypes} onChange={setPropType} />
        <div className="col-span-1 flex flex-col gap-1">
          <label className="text-[10px] text-white/50 tracking-widest uppercase">Status</label>
          <select className="appearance-none bg-white/10 border border-white/20 text-white text-sm px-3 py-3 outline-none">
            <option className="bg-gray-900">Any Status</option>
            <option className="bg-gray-900">Active</option>
            <option className="bg-gray-900">Pending</option>
            <option className="bg-gray-900">Coming Soon</option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-2 flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-white text-gray-900 text-xs tracking-[0.25em] uppercase font-semibold py-3 hover:bg-gray-100 transition-colors shadow"
          >
            SEARCH LISTINGS
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] text-white/50 tracking-widest uppercase">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white/10 border border-white/20 text-white text-sm px-3 py-3 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-gray-900 text-white">{o}</option>
        ))}
      </select>
    </div>
  );
}
