import { useState, useEffect } from 'react';

const restaurants = [
  { id: 1, name: 'Burger Republic', cuisine: 'Burgers, American', rating: 4.5, time: '25-30', price: 200, offer: '50% OFF up to ₹100', veg: false, emoji: '🍔', tag: 'Bestseller', category: 'burger' },
  { id: 2, name: 'Spice Garden', cuisine: 'North Indian, Biryani', rating: 4.3, time: '35-40', price: 350, offer: 'FREE delivery', veg: false, emoji: '🍛', tag: 'Popular', category: 'biryani' },
  { id: 3, name: 'Green Bowl', cuisine: 'Salads, Healthy', rating: 4.7, time: '20-25', price: 180, offer: '30% OFF', veg: true, emoji: '🥗', tag: 'Trending', category: 'healthy' },
  { id: 4, name: 'Pizza Planet', cuisine: 'Pizza, Italian', rating: 4.4, time: '30-35', price: 300, offer: 'Buy 1 Get 1', veg: false, emoji: '🍕', tag: 'New', category: 'pizza' },
  { id: 5, name: 'Dosa House', cuisine: 'South Indian, Dosa', rating: 4.6, time: '20-25', price: 150, offer: '20% OFF', veg: true, emoji: '🫓', tag: 'Veg Only', category: 'south-indian' },
  { id: 6, name: 'Sushi Den', cuisine: 'Japanese, Sushi', rating: 4.8, time: '40-45', price: 600, offer: 'Free roll on ₹500+', veg: false, emoji: '🍣', tag: 'Top Rated', category: 'sushi' },
  { id: 7, name: 'Biryani Blues', cuisine: 'Biryani, Mughlai', rating: 4.2, time: '30-40', price: 280, offer: 'Flat ₹50 OFF', veg: false, emoji: '🍲', tag: 'Fan Favourite', category: 'biryani' },
  { id: 8, name: 'The Cake Shop', cuisine: 'Desserts, Bakery', rating: 4.5, time: '15-20', price: 250, offer: 'Free dessert', veg: true, emoji: '🎂', tag: 'Sweet', category: 'desserts' },
];

const categories = [
  { icon: '🍕', label: 'Pizza', key: 'pizza' },
  { icon: '🍔', label: 'Burger', key: 'burger' },
  { icon: '🍛', label: 'Biryani', key: 'biryani' },
  { icon: '🍣', label: 'Sushi', key: 'sushi' },
  { icon: '🥗', label: 'Healthy', key: 'healthy' },
  { icon: '🍜', label: 'Noodles', key: 'noodles' },
  { icon: '🫓', label: 'South Indian', key: 'south-indian' },
  { icon: '🎂', label: 'Desserts', key: 'desserts' },
];

const navItems = [
  { icon: '🏠', label: 'Home', active: true },
  { icon: '📦', label: 'Orders' },
  { icon: '❤️', label: 'Favourites' },
  { icon: '🎁', label: 'Offers' },
  { icon: '⚙️', label: 'Settings' },
];

const recentOrders = [
  { name: 'Butter Chicken + Naan', resto: 'Spice Garden', price: 420, emoji: '🍛', status: 'Delivered', date: 'Yesterday' },
  { name: 'Pepperoni Pizza (L)', resto: 'Pizza Planet', price: 380, emoji: '🍕', status: 'Delivered', date: '2 days ago' },
];

export default function DashboardPage() {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount] = useState(2);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const filters = [
    { label: 'All', key: 'all' },
    { label: '⚡ Fast Delivery', key: 'fast' },
    { label: '🌟 Rating 4.5+', key: 'top' },
    { label: '🌿 Pure Veg', key: 'veg' },
    { label: '💰 Under ₹200', key: 'cheap' },
  ];

  const filtered = restaurants.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (activeFilter === 'fast') return parseInt(r.time) <= 30;
    if (activeFilter === 'top') return r.rating >= 4.5;
    if (activeFilter === 'veg') return r.veg;
    if (activeFilter === 'cheap') return r.price < 200;
    return true;
  });

  return (
    <div style={{ fontFamily: '\'Outfit\', sans-serif' }} className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0f0f0f] flex">

        {/* ══ Sidebar ══ */}
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
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Rahul Shah</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Zomato Gold Member 🌟</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((n) => (
                <button
                  key={n.label}
                  onClick={() => setActiveNav(n.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeNav === n.label
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

        {/* ══ Main Content ══ */}
        <main className="flex-1 min-w-0 flex flex-col">

          {/* ── Top Header ── */}
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
                onClick={() => setDark(!dark)}
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

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-8">

              {/* ── Hero Banner ── */}
              <div className="relative bg-gradient-to-br from-[#E23744] via-[#d42535] to-[#b01020] rounded-3xl overflow-hidden p-6 lg:p-8 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/3" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold mb-3">
                    🔥 Today's Deal
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                    Get 50% OFF <br className="hidden sm:block" />on your next order
                  </h2>
                  <p className="text-red-100 text-sm mb-5">Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded-lg text-white">ZOMATO50</span> · Valid till midnight</p>
                  <button className="bg-white text-[#E23744] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-red-50 transition-all active:scale-95 shadow-lg">
                    Order Now →
                  </button>
                </div>
                <div className="absolute right-6 bottom-0 text-6xl lg:text-8xl select-none opacity-80">🍔</div>
              </div>

              {/* ── Category Pills ── */}
              <section>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">What's on your mind?</h2>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setSearch(c.label)}
                      className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
                    >
                      <div className="w-16 h-16 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2e2e2e] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:shadow-md group-hover:border-[#E23744]/30 transition-all">
                        {c.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-[#E23744] transition-colors whitespace-nowrap">{c.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* ── Reorder section ── */}
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

              {/* ── Stats row ── */}
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

              {/* ── Filter chips ── */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    Restaurants near you
                    <span className="text-sm font-normal text-gray-400 ml-2">{filtered.length} places</span>
                  </h2>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {filters.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setActiveFilter(f.key)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        activeFilter === f.key
                          ? 'bg-[#E23744] text-white border-[#E23744] shadow-md shadow-red-200 dark:shadow-none'
                          : 'bg-white dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#2e2e2e] hover:border-[#E23744]/40'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Restaurant Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <div className="text-5xl mb-3">🔍</div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No restaurants found</p>
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
                      <div className="text-7xl select-none group-hover:scale-110 transition-transform duration-300">{r.emoji}</div>

                      {/* Offer badge */}
                      {r.offer && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                          <span className="text-white text-xs font-bold">{r.offer}</span>
                        </div>
                      )}

                      {/* Tag */}
                      <div className="absolute top-3 left-3 bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                        {r.tag}
                      </div>

                      {/* Veg indicator */}
                      {r.veg && (
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
                          <span>{r.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{r.cuisine}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {r.time} min
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                        <span>₹{r.price} for two</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom padding */}
              <div className="h-4" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
