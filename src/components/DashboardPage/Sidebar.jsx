import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../redux/authSlice';
import { LuLayoutDashboard, LuUtensilsCrossed, LuPackage, LuSettings, LuLogOut, LuX } from 'react-icons/lu';

const navItems = [
  { icon: LuLayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: LuUtensilsCrossed, label: 'Menu', key: 'menu' },
  { icon: LuPackage, label: 'Orders', key: 'orders' },
  { icon: LuSettings, label: 'Settings', key: 'settings' },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeView, setActiveView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders);
  const pendingCount = orders.data?.filter?.((o) => o.status === 'pending')?.length || 0;

  const baseUrl = import.meta.env.VITE_BASE_URL?.replace('/api', '') || '';

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#000000] border-r border-gray-100 dark:border-[#222222] z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 dark:border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-[#E23744] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#E23744] text-lg font-bold leading-tight">zomato</span>
              <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest -mt-0.5">partner</span>
            </div>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="p-4 mx-3 mt-3 rounded-2xl bg-red-50 dark:bg-[#E23744]/10 flex items-center gap-3">
          {userData?.image ? (
            <img
              src={`${baseUrl}${userData.image}`}
              alt={userData.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#E23744]/30"
            />
          ) : (
            <div className="w-10 h-10 bg-[#E23744] rounded-full flex items-center justify-center text-white font-bold">
              {userData?.name?.[0]?.toUpperCase() || 'R'}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{userData?.name ?? 'Restaurant'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Restaurant Partner</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.key}
                onClick={() => { setActiveView(n.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeView === n.key
                  ? 'bg-[#E23744] text-white shadow-md shadow-red-200 dark:shadow-none'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#111111]'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {n.label}
                {n.key === 'orders' && pendingCount > 0 && (
                  <span className={`ml-auto text-xs rounded-full px-2 py-0.5 font-semibold ${activeView === n.key ? 'bg-white/20 text-white' : 'bg-[#E23744]/10 text-[#E23744]'}`}>
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-[#222222]">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#111111] transition-all"
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}>
            <LuLogOut className="w-[18px] h-[18px]" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
