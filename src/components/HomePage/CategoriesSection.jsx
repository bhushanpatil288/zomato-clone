import { useState } from "react";

const CATEGORIES = [
  { icon: "🍕", label: "Pizza" },
  { icon: "🍔", label: "Burgers" },
  { icon: "🍛", label: "Biryani" },
  { icon: "🍜", label: "Noodles" },
  { icon: "🥗", label: "Healthy" },
  { icon: "🍣", label: "Sushi" },
  { icon: "🌮", label: "Tacos" },
  { icon: "🎂", label: "Desserts" },
  { icon: "🥪", label: "Sandwich" },
  { icon: "🍦", label: "Ice Cream" },
  { icon: "☕", label: "Cafe" },
  { icon: "🍗", label: "Chicken" },
];

const CategoriesSection = () => {

  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <section className="py-16 bg-[#f8f8f8] dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#E23744] text-sm font-semibold mb-1 uppercase tracking-widest">Browse By</p>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">What's on your mind?</h2>
          </div>
          <button className="text-sm text-[#E23744] font-semibold hover:underline hidden sm:block">See all cuisines →</button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-12 gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              onClick={() => setActiveCategory(activeCategory === c.label ? null : c.label)}
              className={`flex flex-col items-center gap-2 group`}
            >
              <div
                className={`w-full aspect-square rounded-2xl flex items-center justify-center text-3xl transition-all duration-200 border-2 ${activeCategory === c.label
                  ? "bg-[#E23744]/10 border-[#E23744] scale-95 shadow-md shadow-red-100 dark:shadow-none"
                  : "bg-white dark:bg-[#1a1a1a] border-gray-100 dark:border-[#2e2e2e] hover:border-[#E23744]/40 hover:scale-105 hover:shadow-md dark:hover:shadow-none shadow-sm"
                  }`}
              >
                {c.icon}
              </div>
              <span
                className={`text-[11px] font-semibold transition-colors ${activeCategory === c.label ? "text-[#E23744]" : "text-gray-500 dark:text-gray-400 group-hover:text-[#E23744]"
                  }`}
              >
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection