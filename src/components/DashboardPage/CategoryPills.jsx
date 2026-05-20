import { LuFlame, LuChefHat, LuCake, LuCoffee, LuPopcorn, LuLayoutList, LuLayoutGrid } from 'react-icons/lu';

const categories = [
  { icon: LuFlame, label: 'Starter', key: 'Starter' },
  { icon: LuChefHat, label: 'Main Course', key: 'Main Course' },
  { icon: LuCake, label: 'Dessert', key: 'Dessert' },
  { icon: LuCoffee, label: 'Beverages', key: 'Beverages' },
  { icon: LuPopcorn, label: 'Snacks', key: 'Snacks' },
  { icon: LuLayoutList, label: 'Other', key: 'Other' },
  { icon: LuLayoutGrid, label: 'All', key: '' },
];

const CategoryPills = ({ activeCategory, onCategoryChange }) => {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Filter by category</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.key}
              onClick={() => onCategoryChange(c.key)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-16 h-16 rounded-2xl shadow-sm border flex items-center justify-center transition-all
                ${activeCategory === c.key
                  ? 'bg-[#E23744]/10 border-[#E23744] shadow-sm scale-100'
                  : 'bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-[#2e2e2e] group-hover:shadow-sm group-hover:border-[#E23744]/30'
                }`}
              >
                <Icon className={`w-7 h-7 transition-colors ${activeCategory === c.key ? 'text-[#E23744]' : 'text-gray-500 dark:text-gray-400 group-hover:text-[#E23744]'}`} />
              </div>
              <span className={`text-xs font-medium transition-colors whitespace-nowrap
                ${activeCategory === c.key
                  ? 'text-[#E23744] font-semibold'
                  : 'text-gray-600 dark:text-gray-400 group-hover:text-[#E23744]'
                }`}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryPills;
