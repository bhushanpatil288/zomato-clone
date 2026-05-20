const Header = ({ dark, toggleTheme, search, setSearch, setSidebarOpen, onAddFood }) => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#000000] border-b border-gray-100 dark:border-[#222222] px-4 lg:px-6 py-4 flex items-center gap-4">
      {/* Hamburger */}
      <button className="lg:hidden text-gray-600 dark:text-gray-300" onClick={() => setSidebarOpen(true)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Search */}
      <div className="flex-1 relative max-w-xl">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your menu items..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#111111] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Dark mode */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[#111111] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
        >
          {dark
            ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.707.707M5.636 18.364l-.707.707M18.364 18.364l-.707-.707M5.636 5.636l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" /></svg>
            : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          }
        </button>

        {/* Add Food */}
        {onAddFood && (
          <button
            onClick={onAddFood}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#E23744] text-white text-sm font-semibold rounded-xl hover:bg-[#c8202d] active:scale-95 transition-all shadow-md shadow-red-200 dark:shadow-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            <span className="hidden sm:inline">Add Food</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
