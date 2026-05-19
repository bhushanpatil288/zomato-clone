const StatsRow = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Orders Placed', value: '47', icon: '📦', color: 'blue' },
        { label: 'Total Saved', value: '₹2.4k', icon: '💰', color: 'green' },
        { label: 'Favourites', value: '12', icon: '❤️', color: 'red' },
      ].map((s) => (
        <div key={s.label} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] p-4 text-center">
          <div className="text-2xl mb-1">{s.icon}</div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
