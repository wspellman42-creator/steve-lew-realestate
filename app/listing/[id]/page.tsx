import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, Phone, Mail, ArrowLeft } from "lucide-react";
import { mockListings, formatPrice } from "@/lib/mockData";

export function generateStaticParams() {
  return mockListings.map((l) => ({ id: l.id }));
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);
  if (!listing) notFound();

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Back */}
      <div className="bg-[#0d0d0d] px-6 py-3">
        <Link
          href="/listing"
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={12} />
          Back to Listings
        </Link>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-gray-100">
        {listing.images.map((img, i) => (
          <div key={i} className={`relative ${i === 0 ? "h-80 md:h-[550px] md:col-span-1" : "h-48 md:h-[270px]"}`}>
            <Image src={img} alt={`${listing.address} - photo ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Detail Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid md:grid-cols-3 gap-12">
        {/* Main */}
        <div className="md:col-span-2">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="font-serif text-3xl text-gray-900">
              {formatPrice(listing.price)}
            </h1>
            <span className={`text-xs px-3 py-1.5 text-white ${
              listing.status === "Active" ? "bg-green-600" :
              listing.status === "Pending" ? "bg-orange-500" :
              listing.status === "Coming Soon" ? "bg-blue-600" : "bg-gray-500"
            }`}>
              {listing.status}
            </span>
          </div>
          <p className="text-lg text-gray-700 mb-4">
            {listing.address}, {listing.city}, {listing.state} {listing.zip}
          </p>

          <div className="flex items-center gap-6 py-5 border-y border-gray-200 mb-8">
            {listing.beds !== null && (
              <div className="flex items-center gap-2">
                <Bed size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">{listing.beds} Bedrooms</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Bath size={18} className="text-gray-400" />
              <span className="text-sm text-gray-700">{listing.baths} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize2 size={18} className="text-gray-400" />
              <span className="text-sm text-gray-700">{listing.sqft.toLocaleString()} SqFt</span>
            </div>
          </div>

          {listing.description && (
            <>
              <h2 className="font-serif text-xl text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{listing.description}</p>
            </>
          )}

          <p className="text-xs text-gray-400 border-t border-gray-100 pt-4">
            Listed by {listing.listedBy}
          </p>
          <p className="text-[10px] text-gray-300 mt-2">
            Based on information submitted to the MLS GRID. IDX information is provided exclusively
            for consumers&apos; personal, non-commercial use.
          </p>
        </div>

        {/* Contact Sidebar */}
        <div>
          <div className="border border-gray-200 p-6 sticky top-[90px]">
            <h3 className="font-serif text-xl text-gray-900 mb-1">Get More Information</h3>
            <p className="text-xs text-gray-500 mb-5">Contact Steve Lew Real Estate Group</p>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-600"
              />
              <input
                type="email"
                placeholder="Email*"
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-600"
              />
              <input
                type="tel"
                placeholder="Phone*"
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-600"
              />
              <textarea
                placeholder="Message"
                rows={4}
                defaultValue={`I am interested in ${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`}
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-600 resize-none"
              />
              <button
                type="submit"
                className="bg-[#0d0d0d] text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
            <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col gap-2">
              <a href="tel:+13178685478" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <Phone size={14} className="text-gray-400" />
                +1(317) 868-5478
              </a>
              <a href="mailto:info@listwithlew.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <Mail size={14} className="text-gray-400" />
                info@listwithlew.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
