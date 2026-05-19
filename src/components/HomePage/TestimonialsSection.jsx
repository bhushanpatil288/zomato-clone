import { useState, useEffect } from "react";

const TESTIMONIALS = [
  { name: "Priya S.", city: "Mumbai", text: "Zomato is my daily essential. The tracking feature is amazing and delivery is always on time!", avatar: "👩", rating: 5 },
  { name: "Arjun M.", city: "Bangalore", text: "Gold membership is totally worth it. I save at least ₹2000 a month on food. Absolutely love it.", avatar: "👨🏽", rating: 5 },
  { name: "Sneha K.", city: "Delhi", text: "Best food delivery app. Wide variety, great offers, and the app is super smooth. Highly recommend!", avatar: "👩🏻", rating: 5 },
];



const TestimonialsSections = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-14 bg-[#f8f8f8] dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#E23744] text-sm font-semibold mb-1 uppercase tracking-widest">Loved by millions</p>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">What our users say 💬</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-[#141414] rounded-3xl border p-6 transition-all duration-500 ${i === testimonialIdx
                ? "border-[#E23744]/40 shadow-lg dark:shadow-none scale-[1.02]"
                : "border-gray-100 dark:border-[#2e2e2e]"
                }`}
            >
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E23744]/10 rounded-full flex items-center justify-center text-xl">{t.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.city}</p>
                </div>
                {i === testimonialIdx && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#E23744] animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIdx(i)}
              className={`rounded-full transition-all ${i === testimonialIdx ? "w-6 h-2 bg-[#E23744]" : "w-2 h-2 bg-gray-300 dark:bg-[#2e2e2e]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSections