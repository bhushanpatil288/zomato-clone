const categories = [
  { icon: '🍕', label: 'Pizza', key: 'pizza' },
  { icon: '🍔', label: 'Burger', key: 'burger' },
  { icon: '🍛', label: 'Biryani', key: 'biryani' },
  { icon: '🍣', label: 'Sushi', key: 'sushi' },
  { icon: '🥗', label: 'Healthy', key: 'healthy' },
  { icon: '🍜', label: 'Noodles', key: 'noodles' },
  { icon: '🫓', label: 'South Indian', key: 'south-indian' },
  { icon: '🎂', label: 'Desserts', key: 'desserts' },
];

const CategoryPills = ({ setSearch }) => {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">What's on your mind?</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setSearch(c.label)}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
          >
            <div className="w-16 h-16 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2e2e2e] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:shadow-md group-hover:border-[#E23744]/30 transition-all">
              {c.icon}
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-[#E23744] transition-colors whitespace-nowrap">{c.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryPills;
