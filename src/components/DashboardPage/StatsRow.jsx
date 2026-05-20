import { useSelector } from 'react-redux';
import { LuUtensilsCrossed, LuPackage, LuIndianRupee } from 'react-icons/lu';

const StatsRow = () => {
  const foods = useSelector((state) => state.foods);
  const orders = useSelector((state) => state.orders);

  const totalMenuItems = foods.data?.count ?? 0;
  const pendingOrders = orders.data?.filter?.((o) => o.status === 'pending')?.length ?? 0;
  const totalRevenue = orders.data
    ?.filter?.((o) => o.status === 'delivered')
    ?.reduce?.((sum, o) => sum + (o.totalAmount || 0), 0) ?? 0;

  const stats = [
    { label: 'Menu Items', value: totalMenuItems, icon: LuUtensilsCrossed, bgColor: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500' },
    { label: 'Pending Orders', value: pendingOrders, icon: LuPackage, bgColor: 'bg-orange-50 dark:bg-orange-900/20', iconColor: 'text-orange-500' },
    { label: 'Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: LuIndianRupee, bgColor: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-green-500' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-gray-100 dark:border-[#222222] p-4 text-center hover:shadow-md hover:border-[#E23744]/20 transition-all">
            <div className={`w-10 h-10 ${s.bgColor} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsRow;
