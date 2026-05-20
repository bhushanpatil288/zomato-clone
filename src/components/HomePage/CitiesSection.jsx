
const CITIES = [
  { name: 'Mumbai', count: '12,000+ restaurants', emoji: '🌆' },
  { name: 'Delhi', count: '9,500+ restaurants', emoji: '🏛️' },
  { name: 'Bangalore', count: '8,200+ restaurants', emoji: '🌿' },
  { name: 'Hyderabad', count: '6,100+ restaurants', emoji: '🕌' },
  { name: 'Surat', count: '3,800+ restaurants', emoji: '💎' },
  { name: 'Pune', count: '5,400+ restaurants', emoji: '🏙️' },
];

const CitiesSection = () => {
  return (
    <section className="py-14 bg-white dark:bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#E23744] text-sm font-semibold mb-1 uppercase tracking-widest">We're everywhere</p>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Delivering across India 🇮🇳</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CITIES.map((c) => (
            <button
              key={c.name}
              className="group bg-gray-50 dark:bg-[#000000] border border-gray-100 dark:border-[#222222] rounded-2xl p-4 text-center hover:border-[#E23744]/40 hover:bg-red-50 dark:hover:bg-[#E23744]/5 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none transition-all duration-200"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{c.emoji}</div>
              <p className="font-bold text-gray-800 dark:text-white text-sm group-hover:text-[#E23744] transition-colors">{c.name}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{c.count}</p>
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-5">
          and <span className="text-[#E23744] font-semibold">1,000+ more cities</span> across India
        </p>
      </div>
    </section>
  );
};

export default CitiesSection;
