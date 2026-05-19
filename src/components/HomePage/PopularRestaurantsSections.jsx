import { useState } from "react";

const RESTAURANTS = [
  { id: 1, name: "Burger Republic", cuisine: "Burgers · American", rating: 4.5, time: "25-30 min", price: "₹200 for two", offer: "50% OFF up to ₹100", emoji: "🍔", tag: "Bestseller", veg: false, promoted: true },
  { id: 2, name: "Spice Garden", cuisine: "North Indian · Biryani", rating: 4.3, time: "35-40 min", price: "₹350 for two", offer: "FREE delivery", emoji: "🍛", tag: "Popular", veg: false, promoted: false },
  { id: 3, name: "Green Bowl Co.", cuisine: "Salads · Healthy Bowls", rating: 4.7, time: "20-25 min", price: "₹180 for two", offer: "30% OFF", emoji: "🥗", tag: "Trending", veg: true, promoted: false },
  { id: 4, name: "Pizza Planet", cuisine: "Pizza · Italian · Pasta", rating: 4.4, time: "30-35 min", price: "₹300 for two", offer: "Buy 1 Get 1", emoji: "🍕", tag: "Gold", veg: false, promoted: true },
  { id: 5, name: "Dosa House", cuisine: "South Indian · Dosa", rating: 4.6, time: "20-25 min", price: "₹150 for two", offer: "20% OFF", emoji: "🫓", tag: "Pure Veg", veg: true, promoted: false },
  { id: 6, name: "Sushi Den", cuisine: "Japanese · Sushi · Ramen", rating: 4.8, time: "40-45 min", price: "₹600 for two", offer: "Free roll on ₹500+", emoji: "🍣", tag: "Top Rated", veg: false, promoted: false },
];

/* ─── RESTAURANT CARD ─────────────────────────────────── */
function RestaurantCard({ r }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] overflow-hidden hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 hover:border-[#E23744]/20 transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="h-44 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-[#1e1e1e] dark:via-[#222] dark:to-[#252525] relative flex items-center justify-center overflow-hidden">
        <div className="text-8xl select-none group-hover:scale-110 transition-transform duration-500">{r.emoji}</div>

        {/* Offer badge */}
        {r.offer && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-3">
            <span className="text-white text-xs font-bold">{r.offer}</span>
          </div>
        )}

        {/* Promoted tag */}
        {r.promoted && (
          <div className="absolute top-3 left-3 bg-white dark:bg-[#2a2a2a] text-[#E23744] text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm border border-red-100 dark:border-[#3e2e2e]">
            Ad
          </div>
        )}

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-[#2a2a2a] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <span className={`text-sm transition-all ${liked ? "scale-125" : ""}`}>{liked ? "❤️" : "🤍"}</span>
        </button>

        {/* Veg indicator */}
        {r.veg && (
          <div className="absolute top-3 right-12 w-6 h-6 border-2 border-green-500 rounded bg-white dark:bg-[#2a2a2a] flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#E23744] transition-colors truncate">{r.name}</h3>
          <div className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg flex-shrink-0">
            <span>★</span><span>{r.rating}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">{r.cuisine}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {r.time}
            </span>
            <span>·</span>
            <span>{r.price}</span>
          </div>
          <span className="text-[10px] bg-gray-100 dark:bg-[#252525] text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full font-medium">{r.tag}</span>
        </div>
      </div>
    </div>
  );
}


const PopularRestaurantsSections = () => {
  return (
    <section className="py-14 bg-[#f8f8f8] dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#E23744] text-sm font-semibold mb-1 uppercase tracking-widest">Trending Now</p>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Popular near you</h2>
          </div>
          <button className="text-sm text-[#E23744] font-semibold hover:underline hidden sm:block">View all →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESTAURANTS.map((r) => <RestaurantCard key={r.id} r={r} />)}
        </div>
        <div className="mt-8 text-center">
          <button className="px-8 py-3.5 border-2 border-[#E23744] text-[#E23744] font-bold text-sm rounded-2xl hover:bg-[#E23744] hover:text-white transition-all active:scale-95">
            Explore all restaurants
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularRestaurantsSections

