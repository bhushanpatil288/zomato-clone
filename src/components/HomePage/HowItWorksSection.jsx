const HOW_IT_WORKS = [
  { step: '01', icon: '📍', title: 'Set your location', desc: 'Tell us where you are — we\'ll show the best restaurants nearby delivering to you right now.' },
  { step: '02', icon: '🍽️', title: 'Choose your meal', desc: 'Browse menus, filter by cuisine, rating, or delivery time. Thousands of options every day.' },
  { step: '03', icon: '⚡', title: 'Fast delivery', desc: 'Track your order live on the map. Average delivery under 30 minutes, guaranteed fresh.' },
];

const HowItWorksSections = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E23744]/3 dark:bg-[#E23744]/5 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#E23744]/3 dark:bg-[#E23744]/5 translate-y-1/2 -translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <p className="text-[#E23744] text-sm font-semibold mb-2 uppercase tracking-widest">Simple as 1-2-3</p>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">How Zomato works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#E23744]/20 via-[#E23744]/40 to-[#E23744]/20" />
          {HOW_IT_WORKS.map((s, i) => (
            <div key={s.step} className="relative group">
              <div className="bg-gray-50 dark:bg-[#141414] rounded-3xl p-7 border border-gray-100 dark:border-[#2e2e2e] hover:border-[#E23744]/30 hover:shadow-xl dark:hover:shadow-none transition-all duration-300 text-center h-full">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 bg-[#E23744]/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#E23744] rounded-full flex items-center justify-center">
                    <span className="text-white text-[9px] font-black">{i + 1}</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSections;
