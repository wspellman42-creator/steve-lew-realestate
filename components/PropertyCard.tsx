"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Bed, Bath, Maximize2 } from "lucide-react";
import { Listing, formatPrice } from "@/lib/mockData";
import { useUser } from "@/lib/userContext";

interface PropertyCardProps {
  listing: Listing;
  view?: "grid" | "list";
}

const statusColor: Record<string, string> = {
  Active: "bg-green-600",
  Pending: "bg-orange-500",
  "Coming Soon": "bg-blue-600",
  Sold: "bg-gray-500",
};

export default function PropertyCard({ listing, view = "grid" }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useUser();
  const fav = isFavorite(listing.id);

  if (view === "list") {
    return (
      <div className="flex gap-4 bg-white border border-gray-200 hover:shadow-md transition-shadow">
        <div className="relative w-24 h-20 flex-shrink-0">
          <Image
            src={listing.image}
            alt={listing.address}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 py-2 pr-4">
          <Link href={`/listing/${listing.id}`} className="hover:underline">
            <p className="text-sm font-medium text-gray-900">
              {listing.address}, {listing.city}, {listing.state} {listing.zip}
            </p>
          </Link>
          <p className="text-base font-bold text-gray-900 mt-0.5">{formatPrice(listing.price)}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
            {listing.beds !== null && <span>{listing.beds} Beds</span>}
            <span>{listing.baths} Baths</span>
            <span>{listing.sqft.toLocaleString()} SqFt</span>
            <span
              className={`text-white text-[10px] px-1.5 py-0.5 rounded-sm ${statusColor[listing.status] || "bg-gray-500"}`}
            >
              {listing.status}
            </span>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(listing.id)}
          className={`flex-shrink-0 pr-4 self-center transition-colors ${fav ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}
          aria-label={fav ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart size={16} fill={fav ? "currentColor" : "none"} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white group relative shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <Link href={`/listing/${listing.id}`}>
        <div className="relative h-52 overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.address}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className={`absolute top-3 left-3 text-white text-[11px] font-medium px-2.5 py-1 tracking-wide ${statusColor[listing.status] || "bg-gray-500"}`}
          >
            {listing.status}
          </div>
          {listing.openHouse && (
            <div className="absolute bottom-3 left-3 bg-black/80 text-white text-[10px] px-2 py-1">
              {listing.openHouse}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-lg font-bold text-gray-900">{formatPrice(listing.price)}</p>
          <button
            onClick={() => toggleFavorite(listing.id)}
            className={`transition-colors flex-shrink-0 mt-0.5 ${fav ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}
            aria-label={fav ? "Remove from favorites" : "Save to favorites"}
          >
            <Heart size={16} fill={fav ? "currentColor" : "none"} />
          </button>
        </div>
        <Link href={`/listing/${listing.id}`}>
          <p className="text-sm text-gray-700 hover:text-gray-900 mt-1 leading-snug">
            {listing.address}, {listing.city}, {listing.state} {listing.zip}
          </p>
        </Link>
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          {listing.beds !== null && (
            <span className="flex items-center gap-1">
              <Bed size={12} />
              {listing.beds} Beds
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={12} />
            {listing.baths} Baths
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={12} />
            {listing.sqft.toLocaleString()} SqFt
          </span>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 truncate">Listed by {listing.listedBy}</p>
      </div>
    </div>
  );
}
