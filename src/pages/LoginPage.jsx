import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeToggle } from '../redux/themeSlice';
import { loginUser } from '../redux/authThunk';

export default function LoginPage() {
  const dispatch = useDispatch();
  const toggleTheme = () => dispatch(themeToggle());
  const { errors, isLoading: loading, user } = useSelector(state => state.auth);
  const dark = useSelector((state) => state.theme.dark);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData));
  };

  return (
    <div style={{ fontFamily: '\'Outfit\', sans-serif' }} className={dark ? 'dark' : ''}>
      <div className="min-h-screen flex bg-gray-50 dark:bg-[#0f0f0f]">

        {/* ── Left Branding Panel ── */}
        <div className="hidden lg:flex lg:w-[52%] bg-[#E23744] relative overflow-hidden flex-col items-center justify-center p-16 select-none">
          {/* decorative blobs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] rounded-full bg-white/10" />
          <div className="absolute top-1/2 -translate-y-1/2 right-8 w-40 h-40 rounded-full bg-white/5" />

          {/* Logo */}
          <div className="relative z-10 mb-12 flex items-center gap-3">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#E23744]">
                <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 4.5 9.5 9 11 4.5-1.5 9-5.75 9-11 0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7 0 3.96-3.5 7.5-7 9-3.5-1.5-7-5.04-7-9 0-3.87 3.13-7 7-7zm-1 3v5l4 2.5-.75 1.23L10 13V7h1z" />
              </svg>
            </div>
            <span className="text-white text-4xl font-bold tracking-tight">zomato</span>
          </div>

          <div className="relative z-10 text-center text-white max-w-sm">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Hungry? <br />
              <span className="text-red-100">We've got you.</span>
            </h2>
            <p className="text-red-100 text-lg font-light mb-10">
              Order from thousands of restaurants, delivered fast to your doorstep.
            </p>

            {/* Floating food cards */}
            <div className="space-y-3">
              {[
                { emoji: '🍕', name: 'Pepperoni Pizza', resto: 'Pizza Palace', time: '28 min', rating: '4.5' },
                { emoji: '🍔', name: 'Smash Burger', resto: 'Burger Bros', time: '22 min', rating: '4.7' },
                { emoji: '🍜', name: 'Butter Chicken', resto: 'Spice Garden', time: '35 min', rating: '4.3' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white text-sm">{item.name}</p>
                    <p className="text-red-100 text-xs">{item.resto}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-xs font-medium">{item.time}</p>
                    <p className="text-yellow-300 text-xs">★ {item.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Form Panel ── */}
        <div className="w-full lg:w-[48%] flex flex-col items-center justify-center p-8 lg:p-16 bg-white dark:bg-[#141414] relative">

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-[#2a2a2a] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
            title="Toggle theme"
          >
            {dark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.707.707M5.636 18.364l-.707.707M18.364 18.364l-.707-.707M5.636 5.636l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#E23744] rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">Z</span>
            </div>
            <span className="text-[#E23744] text-2xl font-bold">zomato</span>
          </div>

          <div className="w-full max-w-sm">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Welcome back 👋</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Sign in to continue your food journey</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent transition-all text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPass ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <a href="#" className="text-xs text-[#E23744] hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#E23744] hover:bg-[#c8202d] active:scale-95 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-lg shadow-red-200 dark:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
              {errors &&
                <p className='text-red-500 text-center'>{errors}</p>
              }
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-[#2e2e2e]" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-[#2e2e2e]" />
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  ),
                  label: 'Google',
                },
                {
                  icon: (
                    <svg className="w-5 h-5 fill-current text-gray-800 dark:text-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  ),
                  label: 'Facebook',
                },
              ].map((s) => (
                <button
                  key={s.label}
                  className="flex items-center justify-center gap-2.5 py-3 border border-gray-200 dark:border-[#2e2e2e] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-all text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
              New to Zomato?{' '}
              <a href="#" className="text-[#E23744] font-semibold hover:underline">
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
