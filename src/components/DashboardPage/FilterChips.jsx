const FilterChips = ({
  filters,
  filtered,
  activeFilter,
  setActiveFilter,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          Your Menu
          <span className="text-sm font-normal text-gray-400 ml-2">{filtered.length} items</span>
        </h2>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activeFilter === f.key
              ? 'bg-[#E23744] text-white border-[#E23744] shadow-md shadow-red-200 dark:shadow-none'
              : 'bg-white dark:bg-[#111111] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#222222] hover:border-[#E23744]/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;
