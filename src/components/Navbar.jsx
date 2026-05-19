import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeToggle } from '../redux/themeSlice';

/* ─── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = ['Home', 'Explore', 'Offers', 'Zomato Gold', 'Help'];

export default function Navbar() {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.dark);
  const toggleTheme = () => dispatch(themeToggle());

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md shadow-sm border-b border-gray-100/80 dark:border-[#2e2e2e]/80 py-3'
        : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-[#E23744] rounded-xl flex items-center justify-center shadow-md shadow-red-300/50 dark:shadow-none">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors ${scrolled ? 'text-[#E23744]' : 'text-[#E23744]'
              }`}
            >
              zomato
            </span>
          </a>

          {/* Location pill */}
          <button
            className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border ${scrolled
              ? 'border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 hover:border-[#E23744]/50'
              : 'border-white/30 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            <svg className="w-3.5 h-3.5 text-[#E23744]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Surat, GJ
            <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => setActiveLink(l)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${activeLink === l
                  ? scrolled
                    ? 'bg-[#E23744]/10 text-[#E23744]'
                    : 'bg-white/25 text-white'
                  : scrolled
                    ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e1e1e] hover:text-gray-900 dark:hover:text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
              >
                {l}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${scrolled
                ? 'bg-gray-100 dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-300'
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.707.707M5.636 18.364l-.707.707M18.364 18.364l-.707-.707M5.636 5.636l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            {/* Cart */}
            <button
              className={`hidden sm:flex relative w-9 h-9 rounded-xl items-center justify-center transition-all hover:scale-110 ${scrolled
                ? 'bg-[#E23744]/10 text-[#E23744] hover:bg-[#E23744]/20'
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E23744] text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>

            {/* Login */}
            <button
              className={`hidden sm:block px-4 py-2 text-sm font-semibold rounded-xl transition-all ${scrolled
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e1e1e]'
                : 'text-white/90 hover:text-white hover:bg-white/15'
              }`}
            >
              Log in
            </button>

            {/* Signup */}
            <button
              className={`hidden sm:block px-4 py-2 text-sm font-semibold rounded-xl transition-all active:scale-95 ${scrolled
                ? 'bg-[#E23744] text-white hover:bg-[#c8202d] shadow-md shadow-red-200/60 dark:shadow-none'
                : 'bg-white text-[#E23744] hover:bg-red-50 shadow-lg'
              }`}
            >
              Sign up
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all ${scrolled
                ? 'bg-gray-100 dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300'
                : 'bg-white/20 text-white'
              }`}
            >
              {menuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden mt-3 bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] shadow-xl overflow-hidden">
            <div className="p-4 space-y-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  onClick={() => { setActiveLink(l); setMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeLink === l
                    ? 'bg-[#E23744]/10 text-[#E23744]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e1e1e]'
                  }`}
                >
                  {l}
                </button>
              ))}
              <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-[#2e2e2e]">
                <button className="flex-1 py-2.5 border border-gray-200 dark:border-[#2e2e2e] text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-all">Log in</button>
                <button className="flex-1 py-2.5 bg-[#E23744] text-white font-semibold rounded-xl text-sm hover:bg-[#c8202d] transition-all">Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
