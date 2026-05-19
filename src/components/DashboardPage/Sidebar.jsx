import { useState } from 'react';
import { useSelector } from 'react-redux';

const navItems = [
  { icon: '🏠', label: 'Home', active: true },
  { icon: '📦', label: 'Orders' },
  { icon: '❤️', label: 'Favourites' },
  { icon: '🎁', label: 'Offers' },
  { icon: '⚙️', label: 'Settings' },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user: userData } = useSelector(state => state.auth);
  console.log(userData)
  const [activeNav, setActiveNav] = useState('Home');
  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#141414] border-r border-gray-100 dark:border-[#2e2e2e] z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 dark:border-[#2e2e2e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#E23744] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span className="text-[#E23744] text-xl font-bold">zomato</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {/* User */}
        <div className="p-4 mx-3 mt-3 rounded-2xl bg-red-50 dark:bg-[#E23744]/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E23744] rounded-full flex items-center justify-center text-white font-bold">R</div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{userData.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Zomato Admin 🌟</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((n) => (
            <button
              key={n.label}
              onClick={() => setActiveNav(n.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeNav === n.label
                ? 'bg-[#E23744] text-white shadow-md shadow-red-200 dark:shadow-none'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e1e1e]'
              }`}
            >
              <span className="text-base">{n.icon}</span>
              {n.label}
              {n.label === 'Orders' && (
                <span className={`ml-auto text-xs rounded-full px-2 py-0.5 font-semibold ${activeNav === n.label ? 'bg-white/20 text-white' : 'bg-[#E23744]/10 text-[#E23744]'}`}>3</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-[#2e2e2e]">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
