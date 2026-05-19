import { useSelector } from "react-redux";
const FOOTER_LINKS = {
  Company: ["About Us", "Team", "Careers", "Blog", "Press Kit"],
  "For Foodies": ["Zomato Gold", "App Download", "Gift Cards", "Order Food"],
  "For Restaurants": ["Partner With Us", "Apps for Business", "Advertise", "Restaurant Login"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy", "Security"],
};

export default function Footer() {
  const dark = useSelector((state) => state.theme.dark);
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-[#1e1e1e]">
      {/* App CTA strip */}
      <div className="bg-gradient-to-r from-[#E23744] to-[#c8202d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white text-2xl font-bold mb-1">Get the Zomato app</h3>
            <p className="text-red-100 text-sm">Order faster with the app. Available on iOS & Android.</p>
          </div>
          <div className="flex gap-3">
            {[
              { label: "App Store", icon: "🍎", sub: "Download on the" },
              { label: "Google Play", icon: "▶", sub: "Get it on" },
            ].map((a) => (
              <button
                key={a.label}
                className="flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-4 py-3 rounded-2xl transition-all group"
              >
                <span className="text-2xl">{a.icon}</span>
                <div className="text-left">
                  <p className="text-[10px] text-white/70 leading-none">{a.sub}</p>
                  <p className="text-sm font-bold leading-tight mt-0.5">{a.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#E23744] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">Z</span>
              </div>
              <span className="text-[#E23744] text-xl font-bold">zomato</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Delivering happiness to millions of food lovers across India. From your favourite local joints to premium dining — all at your fingertips.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                { icon: "f", label: "Facebook", color: "hover:bg-blue-600" },
                { icon: "𝕏", label: "Twitter", color: "hover:bg-black dark:hover:bg-white dark:hover:text-black" },
                { icon: "in", label: "LinkedIn", color: "hover:bg-blue-700" },
                { icon: "▶", label: "YouTube", color: "hover:bg-red-600" },
                { icon: "📸", label: "Instagram", color: "hover:bg-pink-600" },
              ].map((s) => (
                <button
                  key={s.label}
                  title={s.label}
                  className={`w-9 h-9 rounded-xl bg-gray-100 dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400 text-xs font-bold flex items-center justify-center transition-all hover:text-white ${s.color} hover:scale-110`}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-[#E23744] dark:hover:text-[#E23744] transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Zomato Media Pvt. Ltd. · Made with ❤️ in India
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://flagcdn.com/w40/in.png"
              alt="India"
              className="w-5 h-3.5 object-cover rounded-sm opacity-80"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span className="text-sm text-gray-400 dark:text-gray-500">India</span>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <a href="#" className="text-sm text-gray-400 dark:text-gray-500 hover:text-[#E23744] transition-colors">Change country</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
