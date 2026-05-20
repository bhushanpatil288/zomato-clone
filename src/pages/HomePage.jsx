import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getToken } from '../redux/authStorage';

/* ─── PARTNER LANDING PAGE ──────────────────────────────── */
export default function HomePage() {
  const dark = useSelector((state) => state.theme.dark);
  const navigate = useNavigate();

  // If already logged in, go straight to dashboard
  useEffect(() => {
    if (getToken()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:ital,wght@0,700;0,900;1,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const features = [
    {
      icon: '🍽️',
      title: 'Menu Management',
      desc: 'Add, edit, and organise your food items with photos, categories, and pricing. Toggle availability instantly.',
    },
    {
      icon: '📦',
      title: 'Order Tracking',
      desc: 'View incoming orders in real-time. Update status from pending to delivered with one click.',
    },
    {
      icon: '📊',
      title: 'Business Insights',
      desc: 'Track your revenue, monitor pending orders, and understand your performance at a glance.',
    },
    {
      icon: '🚀',
      title: 'Grow Your Reach',
      desc: 'Connect with millions of customers on Zomato. More visibility, more orders, more growth.',
    },
  ];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }} className={dark ? 'dark' : ''}>
      <div className="bg-[#f8f8f8] dark:bg-[#0f0f0f] text-gray-900 dark:text-white">

        {/* ── Hero Section ── */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E23744] via-[#d42535] to-[#b01020]">
          {/* Blobs */}
          <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-white/10" />
          <div className="absolute -bottom-40 -right-20 w-[36rem] h-[36rem] rounded-full bg-white/10" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-[#E23744] text-2xl font-black">Z</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white text-4xl font-bold tracking-tight">zomato</span>
                <span className="text-red-200 text-xs font-semibold uppercase tracking-[0.3em] -mt-1">partner</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Grow your restaurant <br />
              <span className="text-red-200">with Zomato Partner</span>
            </h1>
            <p className="text-red-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Manage your menu, track orders in real-time, and reach millions of customers — all from one powerful dashboard.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-white text-[#E23744] font-bold text-base rounded-2xl hover:bg-red-50 transition-all active:scale-95 shadow-2xl shadow-black/20"
              >
                Register Your Restaurant →
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-semibold text-base rounded-2xl border border-white/30 hover:bg-white/25 transition-all active:scale-95"
              >
                Partner Login
              </button>
            </div>
          </div>

          {/* Floating emojis */}
          <div className="absolute bottom-8 left-8 text-5xl select-none opacity-70 animate-bounce" style={{ animationDuration: '3s' }}>👨‍🍳</div>
          <div className="absolute top-20 right-12 text-5xl select-none opacity-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>🍽️</div>
        </section>

        {/* ── Features Section ── */}
        <section className="py-20 bg-white dark:bg-[#141414]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[#E23744] text-sm font-semibold mb-2 uppercase tracking-widest">Why Partner with Us</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                Everything you need to <span className="text-[#E23744]">succeed</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] p-6 hover:shadow-xl hover:border-[#E23744]/20 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#E23744]/10 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#E23744] transition-colors">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-16 bg-[#f8f8f8] dark:bg-[#0f0f0f]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="bg-gradient-to-br from-[#E23744] to-[#b01020] rounded-3xl p-10 lg:p-14 text-white relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/5 rounded-full" />
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to get started?</h3>
                <p className="text-red-100 mb-8 text-base">Join thousands of restaurant partners already growing with Zomato.</p>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3.5 bg-white text-[#E23744] font-bold text-sm rounded-2xl hover:bg-red-50 transition-all active:scale-95 shadow-xl"
                >
                  Register Now — It's Free
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
