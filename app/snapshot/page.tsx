"use client";

import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Home } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const mockStats = {
  medianPrice: 315000,
  avgDaysOnMarket: 18,
  activeListings: 2847,
  soldLastMonth: 412,
  priceChange: 3.2,
  inventoryChange: -8.5,
};

export default function SnapshotPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) setSearched(true);
  };

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Search Bar */}
      <div className="bg-[#0d0d0d] px-4 py-4 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center gap-2">
          <div className="flex flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="City, County, Subdivision, etc"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-white text-gray-900 px-4 py-3 text-sm placeholder:text-gray-400 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-200 px-4 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Search size={16} className="text-gray-600" />
            </button>
          </div>
          <div className="flex gap-2">
            {["Price", "Beds", "Baths", "Property Type"].map((label) => (
              <select
                key={label}
                className="bg-white border border-gray-300 text-gray-700 text-xs px-3 py-3 outline-none"
              >
                <option>{label}</option>
              </select>
            ))}
          </div>
          <button className="bg-white border border-gray-300 text-gray-700 text-xs px-4 py-3 hover:bg-gray-50 transition-colors">
            Save Snapshot
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {!searched ? (
          <>
            {/* Default State */}
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
                  <rect x="10" y="40" width="30" height="50" fill="currentColor" />
                  <rect x="50" y="25" width="30" height="65" fill="currentColor" opacity="0.6" />
                  <rect x="70" y="55" width="20" height="35" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
              <h2 className="font-serif text-3xl text-gray-900 mb-3">MARKET SNAPSHOT</h2>
              <p className="text-xs text-gray-400 mb-2 tracking-widest">
                (LAST 30 DAYS · CENTRAL INDIANA)
              </p>
              <p className="text-gray-400 mb-6">
                Please input a valid location in the search bar to view the local market snapshot.
              </p>
              <button
                onClick={() => { setQuery("Indianapolis, IN"); setSearched(true); }}
                className="border border-gray-300 px-8 py-3 text-xs tracking-widest uppercase text-gray-600 hover:bg-gray-50 transition-colors"
              >
                VIEW INDIANAPOLIS MARKET
              </button>
            </div>

            {/* Subscribe */}
            <div className="border border-gray-200 p-8 max-w-[600px] mx-auto text-center mt-8">
              <h3 className="font-serif text-2xl text-gray-900 mb-3">Subscribe Market Updates</h3>
              <p className="text-sm text-gray-500 mb-6">
                Get the latest market trends delivered to your inbox monthly.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-600"
                />
                <button className="bg-[#0d0d0d] text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Snapshot Results */}
            <div className="mb-8">
              <h2 className="font-serif text-3xl text-gray-900 mb-1">MARKET SNAPSHOT</h2>
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
                {query} · Last 30 Days
              </p>
              <div className="w-12 h-px bg-gray-300 mb-8" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <StatCard
                label="Median Sale Price"
                value={`$${mockStats.medianPrice.toLocaleString()}`}
                change={mockStats.priceChange}
                positive
              />
              <StatCard
                label="Avg Days on Market"
                value={`${mockStats.avgDaysOnMarket} days`}
                change={-2.1}
                positive={false}
              />
              <StatCard
                label="Active Listings"
                value={mockStats.activeListings.toLocaleString()}
                change={mockStats.inventoryChange}
                positive={mockStats.inventoryChange > 0}
              />
              <StatCard
                label="Homes Sold (30 days)"
                value={mockStats.soldLastMonth.toLocaleString()}
                change={5.8}
                positive
              />
              <StatCard
                label="List-to-Sale Ratio"
                value="98.5%"
                change={0.3}
                positive
              />
              <StatCard
                label="New Listings"
                value="524"
                change={-1.2}
                positive={false}
              />
            </div>

            {/* Market Trends Placeholder */}
            <div className="border border-gray-200 p-8 text-center mb-8">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">MARKET TRENDS (Jun 2025 – May 2026)</p>
              <div className="h-48 bg-gray-50 flex items-end justify-around px-8 gap-2">
                {[80, 65, 90, 72, 88, 75, 95, 68, 85, 92, 78, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gray-300 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-1">
                {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <ContactBlock />
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, change, positive }: {
  label: string; value: string; change: number; positive: boolean;
}) {
  return (
    <div className="border border-gray-200 p-6">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <p className="font-serif text-3xl text-gray-900 mb-2">{value}</p>
      <div className={`flex items-center gap-1 text-xs ${positive ? "text-green-600" : "text-red-500"}`}>
        {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {Math.abs(change)}% vs last month
      </div>
    </div>
  );
}

function ContactBlock() {
  return (
    <div className="bg-[#111111] text-white p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-2">FULL-SERVICE</p>
          <h3 className="font-serif text-3xl font-light mb-2">Full-Service Brokerage With Fair Rates</h3>
          <p className="text-sm text-gray-400">+1(317) 868-5478 · info@listwithlew.com</p>
          <p className="text-sm text-gray-400">550 US 31 S., Greenwood, Indiana, 46142</p>
        </div>
        <ContactForm source="Market Snapshot · /snapshot" variant="dark" />
      </div>
    </div>
  );
}
