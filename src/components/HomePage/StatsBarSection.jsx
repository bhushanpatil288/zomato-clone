
const StatsBarSection = () => {
  return (
    <section className="bg-white dark:bg-[#000000] border-b border-gray-100 dark:border-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 dark:divide-[#111111]">
          {[
            { value: '50M+', label: 'Happy customers', icon: '😊' },
            { value: '3,00,000+', label: 'Restaurant partners', icon: '🍽️' },
            { value: '1000+', label: 'Cities covered', icon: '📍' },
            { value: '30 min', label: 'Avg delivery time', icon: '⚡' },
          ].map((s) => (
            <div key={s.label} className="py-6 px-6 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBarSection;
