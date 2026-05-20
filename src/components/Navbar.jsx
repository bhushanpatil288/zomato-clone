import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeToggle } from '../redux/themeSlice';
import { useNavigate } from 'react-router';
import { getToken } from '../redux/authStorage';

/* ─── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = ['Home', 'Features', 'Support'];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.dark);
  const toggleTheme = () => dispatch(themeToggle());
  const isLoggedIn = !!getToken();

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
        ? 'bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md shadow-sm dark:border-[#2e2e2e]/80 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className={`flex items-center gap-2.5 flex-shrink-0 rounded-3xl py-2 px-3 transition-all ${!scrolled ? 'bg-white/95 dark:bg-[#141414]/95 shadow-sm' : ''}`}>
            <div className="w-9 h-9 bg-[#E23744] rounded-3xl flex items-center justify-center shadow-md shadow-red-300/50 dark:shadow-none">
              <span className="text-white font-black text-sm">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#E23744] text-xl font-extrabold tracking-tight leading-tight">zomato</span>
              <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-[0.25em] -mt-0.5">partner</span>
            </div>
          </a>

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

            {isLoggedIn ? (
              /* Dashboard button (logged in) */
              <button
                className={`hidden sm:block px-4 py-2 text-sm font-semibold rounded-xl transition-all active:scale-95 ${scrolled
                  ? 'bg-[#E23744] text-white hover:bg-[#c8202d] shadow-md shadow-red-200/60 dark:shadow-none'
                  : 'bg-white text-[#E23744] hover:bg-red-50 shadow-lg'
                  }`}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard →
              </button>
            ) : (
              <>
                {/* Login */}
                <button
                  className={`hidden sm:block px-4 py-2 text-sm font-semibold rounded-xl transition-all ${scrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1e1e1e]'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                    }`}
                  onClick={() => navigate('/login')}
                >
                  Log in
                </button>

                {/* Signup */}
                <button
                  className={`hidden sm:block px-4 py-2 text-sm font-semibold rounded-xl transition-all active:scale-95 ${scrolled
                    ? 'bg-[#E23744] text-white hover:bg-[#c8202d] shadow-md shadow-red-200/60 dark:shadow-none'
                    : 'bg-white text-[#E23744] hover:bg-red-50 shadow-lg'
                    }`}
                  onClick={() => navigate('/signup')}
                >
                  Register
                </button>
              </>
            )}

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
                {isLoggedIn ? (
                  <button onClick={() => { navigate('/dashboard'); setMenuOpen(false); }} className="flex-1 py-2.5 bg-[#E23744] text-white font-semibold rounded-xl text-sm hover:bg-[#c8202d] transition-all">Dashboard</button>
                ) : (
                  <>
                    <button onClick={() => { navigate('/login'); setMenuOpen(false); }} className="flex-1 py-2.5 border border-gray-200 dark:border-[#2e2e2e] text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-all">Log in</button>
                    <button onClick={() => { navigate('/signup'); setMenuOpen(false); }} className="flex-1 py-2.5 bg-[#E23744] text-white font-semibold rounded-xl text-sm hover:bg-[#c8202d] transition-all">Register</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
