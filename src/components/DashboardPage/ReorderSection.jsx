const recentOrders = [
  { name: 'Butter Chicken + Naan', resto: 'Spice Garden', price: 420, emoji: '🍛', status: 'Delivered', date: 'Yesterday' },
  { name: 'Pepperoni Pizza (L)', resto: 'Pizza Planet', price: 380, emoji: '🍕', status: 'Delivered', date: '2 days ago' },
];

const ReorderSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Order again</h2>
        <button className="text-[#E23744] text-sm font-semibold hover:underline">See all</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recentOrders.map((o, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] p-4 flex items-center gap-3 hover:shadow-md dark:hover:shadow-none hover:border-[#E23744]/20 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gray-50 dark:bg-[#252525] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              {o.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{o.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{o.resto} · {o.date}</p>
              <p className="text-xs font-semibold text-[#E23744] mt-0.5">₹{o.price}</p>
            </div>
            <button className="flex-shrink-0 px-3 py-1.5 bg-[#E23744]/10 text-[#E23744] text-xs font-semibold rounded-lg group-hover:bg-[#E23744] group-hover:text-white transition-all">
              Reorder
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReorderSection;
