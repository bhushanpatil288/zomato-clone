const OFFERS = [
  { emoji: '⚡', code: 'ZOMATO50', title: '50% off on first order', desc: 'Up to ₹100 off · Min order ₹199', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50 dark:bg-orange-900/10', border: 'border-orange-200 dark:border-orange-800/30' },
  { emoji: '🚀', code: 'FREEDEL', title: 'Free delivery all week', desc: 'On orders above ₹149 · No max cap', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/10', border: 'border-blue-200 dark:border-blue-800/30' },
  { emoji: '🌟', code: 'GOLD2025', title: '1 month Gold FREE', desc: 'New users only · Unlock member deals', color: 'from-yellow-400 to-orange-400', bg: 'bg-yellow-50 dark:bg-yellow-900/10', border: 'border-yellow-200 dark:border-yellow-800/30' },
];

const OffersSection = () => {
  return (
    <section className="py-14 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#E23744] text-sm font-semibold mb-1 uppercase tracking-widest">Save More</p>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Best deals today 🔥</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OFFERS.map((o) => (
            <div
              key={o.code}
              className={`relative rounded-3xl border ${o.bg} ${o.border} p-6 overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-none transition-all duration-300`}
            >
              {/* Glow bg */}
              <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br ${o.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <div className="text-4xl mb-3">{o.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">{o.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">{o.desc}</p>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r ${o.color} text-white`}>
                    {o.code}
                  </span>
                  <button className="text-xs text-[#E23744] font-semibold hover:underline">Copy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
