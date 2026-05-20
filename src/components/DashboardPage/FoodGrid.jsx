import { useDispatch } from 'react-redux';
import { deleteFood, updateFood } from '../../redux/authThunk';
import { LuCheck, LuX, LuPencil, LuTrash2, LuImageOff, LuSearch } from 'react-icons/lu';

const FoodGrid = ({ filtered, onEdit, search, setSearch, setActiveFilter }) => {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL?.replace('/api', '') || '';

  const handleToggleAvailability = (food) => {
    const formData = new FormData();
    formData.append('isAvailable', !food.isAvailable);
    dispatch(updateFood({ id: food._id, formData }));
  };

  const handleDelete = (food) => {
    if (window.confirm(`Delete "${food.title}"? This cannot be undone.`)) {
      dispatch(deleteFood(food._id));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {filtered.length === 0 ? (
        <div className="col-span-full text-center py-16">
          <div className="w-16 h-16 bg-gray-100 dark:bg-[#1e1e1e] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LuSearch className="w-7 h-7 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No food items found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try changing your filters or add a new item</p>
          {search && (
            <button onClick={() => { setSearch(''); setActiveFilter('all'); }} className="mt-3 text-[#E23744] text-sm hover:underline font-semibold">
              Clear filters
            </button>
          )}
        </div>
      ) : filtered.map((food) => (
        <div
          key={food._id}
          className={`bg-white dark:bg-[#1a1a1a] rounded-2xl border overflow-hidden hover:shadow-lg dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-200 group ${
            food.isAvailable
              ? 'border-gray-100 dark:border-[#2e2e2e] hover:border-[#E23744]/20'
              : 'border-orange-200 dark:border-orange-900/30 opacity-75'
          }`}
        >
          {/* Image area */}
          <div className="h-36 bg-gradient-to-br from-orange-50 to-red-50 dark:from-[#1e1e1e] dark:to-[#252525] relative flex items-center justify-center overflow-hidden">
            {food.image ? (
              <img
                src={`${baseUrl}${food.image}`}
                alt={food.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <LuImageOff className="w-10 h-10 text-gray-300 dark:text-gray-600" />
            )}

            {/* Category badge */}
            <div className="absolute top-3 left-3 bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
              {food.category}
            </div>

            {/* Price badge */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
              <span className="text-white text-sm font-bold">₹{food.price}</span>
            </div>

            {/* Availability indicator */}
            {!food.isAvailable && (
              <div className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <LuX className="w-3 h-3" />
                Unavailable
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight group-hover:text-[#E23744] transition-colors">{food.title}</h3>
            </div>
            {food.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-3">{food.description}</p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-[#2e2e2e]">
              {/* Toggle availability */}
              <button
                onClick={() => handleToggleAvailability(food)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  food.isAvailable
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                    : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                }`}
              >
                {food.isAvailable ? <LuCheck className="w-3.5 h-3.5" /> : <LuX className="w-3.5 h-3.5" />}
                {food.isAvailable ? 'Available' : 'Unavailable'}
              </button>

              {/* Edit */}
              <button
                onClick={() => onEdit(food)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-50 dark:bg-[#252525] text-gray-600 dark:text-gray-400 hover:bg-[#E23744]/10 hover:text-[#E23744] transition-all"
              >
                <LuPencil className="w-3.5 h-3.5" />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(food)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-50 dark:bg-[#252525] text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
              >
                <LuTrash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodGrid;
