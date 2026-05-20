import { useSelector } from 'react-redux';

const StatsRow = () => {
  const foods = useSelector((state) => state.foods);
  const orders = useSelector((state) => state.orders);

  const totalMenuItems = foods.data?.count ?? 0;
  const pendingOrders = orders.data?.filter?.((o) => o.status === 'pending')?.length ?? 0;
  const totalRevenue = orders.data
    ?.filter?.((o) => o.status === 'delivered')
    ?.reduce?.((sum, o) => sum + (o.totalAmount || 0), 0) ?? 0;

  const stats = [
    { label: 'Menu Items', value: totalMenuItems, icon: '🍽️', color: 'blue' },
    { label: 'Pending Orders', value: pendingOrders, icon: '📦', color: 'orange' },
    { label: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: '💰', color: 'green' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] p-4 text-center hover:shadow-md hover:border-[#E23744]/20 transition-all">
          <div className="text-2xl mb-1">{s.icon}</div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
