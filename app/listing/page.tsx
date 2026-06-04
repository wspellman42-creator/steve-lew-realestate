"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid3X3, List, Map } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { mockListings } from "@/lib/mockData";

const sortOptions = ["Default", "Price: Low to High", "Price: High to Low", "Newest"];
const statusFilters = ["All", "Active", "Pending", "Coming Soon"];

export default function ListingPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Default");
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let items = [...mockListings];
    if (statusFilter !== "All") {
      items = items.filter((l) => l.status === statusFilter);
    }
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (l) =>
          l.address.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.zip.includes(q)
      );
    }
    if (sort === "Price: Low to High") items.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") items.sort((a, b) => b.price - a.price);
    return items;
  }, [query, sort, statusFilter]);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Search Bar */}
      <div className="bg-[#0d0d0d] px-4 py-4 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-2">
          <div className="flex flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="City, County, Subdivision, etc"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-white text-gray-900 px-4 py-3 text-sm placeholder:text-gray-400 outline-none"
            />
            <button className="bg-gray-200 px-3 flex items-center justify-center">
              <Search size={16} className="text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 text-xs px-3 py-3 outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-3 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-xs text-gray-400 mr-2 hidden sm:block">View:</span>
            <button
              onClick={() => setView("grid")}
              className={`p-2 border ${view === "grid" ? "border-gray-800 bg-gray-800 text-white" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
            >
              <Grid3X3 size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 border ${view === "list" ? "border-gray-800 bg-gray-800 text-white" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Status Filters */}
        {showFilters && (
          <div className="max-w-[1400px] mx-auto mt-3 flex flex-wrap gap-2">
            {statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs px-4 py-2 border transition-colors ${
                  statusFilter === s
                    ? "border-white bg-white text-black"
                    : "border-white/30 text-white hover:border-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Listings Panel */}
        <div className="flex-1 p-6">
          <div className="max-w-[900px]">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg font-semibold text-gray-900">
                {filtered.length > 0
                  ? `${filtered.length} Propert${filtered.length === 1 ? "y" : "ies"} Available`
                  : "No properties found"}
              </h1>
              <p className="text-xs text-gray-400">10,000+ in MIBOR MLS · Showing mock data</p>
            </div>

            {view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {filtered.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} view="grid" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} view="list" />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <Search size={40} className="mx-auto mb-4 opacity-30" />
                <p>No properties match your search. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Panel */}
        <div className="hidden lg:flex flex-col w-[420px] flex-shrink-0 border-l border-gray-200 sticky top-[72px] h-[calc(100vh-72px)]">
          <div className="flex-1 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Map size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Map view requires MLS/IDX integration</p>
              <p className="text-xs mt-1">Coming soon with MIBOR data feed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
