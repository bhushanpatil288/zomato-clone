const RestaurantGrid = ({ filtered, setSearch, setActiveFilter }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {filtered.length === 0 ? (
        <div className="col-span-full text-center py-16">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No foods found</p>
          <button onClick={() => { setSearch(''); setActiveFilter('all'); }} className="mt-3 text-[#E23744] text-sm hover:underline font-semibold">
            Clear filters
          </button>
        </div>
      ) : filtered.map((r) => (
        <div
          key={r.id}
          className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] overflow-hidden hover:shadow-lg dark:hover:shadow-none hover:border-[#E23744]/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
        >
          {/* Image area */}
          <div className="h-36 bg-gradient-to-br from-orange-50 to-red-50 dark:from-[#1e1e1e] dark:to-[#252525] relative flex items-center justify-center overflow-hidden">
            {r.image || r.imageUrl ? (
              <img src={r.image || r.imageUrl} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <div className="text-7xl select-none group-hover:scale-110 transition-transform duration-300">{r.emoji || '🍔'}</div>
            )}

            {/* Offer badge */}
            {(r.offer || r.discount) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                <span className="text-white text-xs font-bold">{r.offer || r.discount}</span>
              </div>
            )}

            {/* Tag */}
            {(r.tag || r.category) && (
              <div className="absolute top-3 left-3 bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                {r.tag || r.category}
              </div>
            )}

            {/* Veg indicator */}
            {(r.veg || r.isVeg) && (
              <div className="absolute top-3 right-3 w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center bg-white">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight group-hover:text-[#E23744] transition-colors">{r.name}</h3>
              <div className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg flex-shrink-0">
                <span>★</span>
                <span>{r.rating || '4.5'}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{r.cuisine || r.description || 'Delicious food'}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {r.time || '20-30'} min
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span>₹{r.price || '200'} for two</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantGrid;
