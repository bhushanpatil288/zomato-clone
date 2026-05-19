import { useState } from 'react';

const Header = ({ dark, toggleTheme, search, setSearch, setSidebarOpen }) => {
  const [cartCount] = useState(2);
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-[#141414] border-b border-gray-100 dark:border-[#2e2e2e] px-4 lg:px-6 py-4 flex items-center gap-4">
      {/* Hamburger */}
      <button className="lg:hidden text-gray-600 dark:text-gray-300" onClick={() => setSidebarOpen(true)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Location */}
      <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white hover:text-[#E23744] transition-colors group flex-shrink-0">
        <svg className="w-4 h-4 text-[#E23744]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
        <span>Surat, Gujarat</span>
        <svg className="w-3 h-3 text-gray-400 group-hover:text-[#E23744] transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>

      {/* Search */}
      <div className="flex-1 relative max-w-xl">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for restaurants & dishes..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Dark mode */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
        >
          {dark
            ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.707.707M5.636 18.364l-.707.707M18.364 18.364l-.707-.707M5.636 5.636l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" /></svg>
            : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          }
        </button>

        {/* Cart */}
        <button className="relative w-9 h-9 rounded-xl bg-[#E23744]/10 flex items-center justify-center text-[#E23744] hover:bg-[#E23744]/20 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E23744] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
