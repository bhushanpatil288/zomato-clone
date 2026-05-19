import { useRef, useState } from 'react';

const HeroSection = () => {
  const heroRef = useRef(null);
  const [heroSearch, setHeroSearch] = useState('');

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E23744] via-[#d42535] to-[#9e1020]" />

      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-white/5" />
      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-white/5" />
      <div className="absolute -bottom-32 -left-16 w-[500px] h-[500px] rounded-full bg-black/10" />
      <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-white/5" />

      {/* Floating food emojis */}
      {[
        { e: '🍕', x: '80%', y: '15%', size: 'text-5xl', delay: '0s', duration: '6s' },
        { e: '🍔', x: '88%', y: '55%', size: 'text-6xl', delay: '1s', duration: '7s' },
        { e: '🍛', x: '75%', y: '80%', size: 'text-4xl', delay: '2s', duration: '5s' },
        { e: '🌮', x: '92%', y: '35%', size: 'text-3xl', delay: '0.5s', duration: '8s' },
        { e: '🧁', x: '70%', y: '40%', size: 'text-3xl', delay: '3s', duration: '6.5s' },
      ].map((f, i) => (
        <div
          key={i}
          className={`absolute select-none pointer-events-none hidden lg:block ${f.size} opacity-25`}
          style={{
            left: f.x, top: f.y,
            animation: `float ${f.duration} ease-in-out ${f.delay} infinite alternate`,
          }}
        >
          {f.e}
        </div>
      ))}

      <style>{`
            @keyframes float {
              0% { transform: translateY(0px) rotate(-5deg); }
              100% { transform: translateY(-24px) rotate(5deg); }
            }
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .fade-up { animation: fadeUp 0.7s ease both; }
            .fade-up-2 { animation: fadeUp 0.7s ease 0.15s both; }
            .fade-up-3 { animation: fadeUp 0.7s ease 0.3s both; }
            .fade-up-4 { animation: fadeUp 0.7s ease 0.45s both; }
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="fade-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-xs font-semibold">2,500+ restaurants open now</span>
          </div>

          {/* Headline */}
          <h1
            className="fade-up-2 text-white leading-[1.1] mb-6"
            style={{ fontFamily: '\'Fraunces\', serif', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 900 }}
          >
            Discover &<br />
            <span className="italic text-red-200">order food</span>
            <br />you'll love
          </h1>

          <p className="fade-up-3 text-red-100 text-lg mb-8 leading-relaxed max-w-lg">
            From the corner chai shop to 5-star dining — track every bite from kitchen to your door in real time.
          </p>

          {/* Search bar */}
          <div className="fade-up-4 flex gap-3 max-w-xl">
            <div className="flex-1 flex items-center gap-3 bg-white dark:bg-[#141414] rounded-2xl px-4 py-1.5 shadow-2xl">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search for restaurants or dishes..."
                className="flex-1 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
              />
              {heroSearch && (
                <button onClick={() => setHeroSearch('')} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            <button className="px-6 py-3.5 bg-white text-[#E23744] font-bold text-sm rounded-2xl hover:bg-red-50 active:scale-95 transition-all shadow-2xl flex-shrink-0">
              Search
            </button>
          </div>

          {/* Quick chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {['🍕 Pizza', '🍔 Burger', '🍛 Biryani', '🥗 Healthy', '🍣 Sushi'].map((s) => (
              <button
                key={s}
                onClick={() => setHeroSearch(s.split(' ')[1])}
                className="bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-medium px-3.5 py-1.5 rounded-full transition-all backdrop-blur-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 30C1200 70 960 0 720 30C480 60 240 10 0 30L0 80Z" className="fill-[#f8f8f8] dark:fill-[#0f0f0f]" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
