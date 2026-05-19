

const ZomatoGoldBanner = () => {
  return (
    <section className="py-14 bg-[#f8f8f8] dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-3xl overflow-hidden p-8 lg:p-12">
          {/* Decorative stars */}
          {["top-4 left-8", "top-12 right-24", "bottom-8 left-1/3", "top-1/2 right-16"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} text-yellow-400 opacity-60 text-xl select-none`}>★</div>
          ))}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <span className="text-yellow-900 font-black text-sm">G</span>
                </div>
                <span className="text-yellow-400 text-2xl font-extrabold">Zomato Gold</span>
              </div>
              <h3 className="text-white text-3xl font-bold mb-3 leading-tight">
                Upgrade your <br className="hidden sm:block" />
                food game 🚀
              </h3>
              <p className="text-blue-200 text-sm max-w-md leading-relaxed mb-5">
                Get unlimited free delivery, exclusive discounts, complimentary dishes, and priority support — all for just ₹149/month.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Free delivery forever", "Up to 40% off", "Complimentary dishes", "24/7 priority support"].map((f) => (
                  <span key={f} className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full">
                    <span className="text-yellow-400">✓</span> {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-sm">
                <p className="text-blue-200 text-xs mb-1">Starting at just</p>
                <div className="flex items-start gap-1 justify-center">
                  <span className="text-white text-xl font-bold mt-1">₹</span>
                  <span className="text-white text-5xl font-black leading-none">149</span>
                  <span className="text-blue-200 text-sm self-end mb-1">/mo</span>
                </div>
                <p className="text-blue-200 text-xs mt-1 mb-4">Billed annually · Save 20%</p>
                <button className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-extrabold text-sm rounded-2xl transition-all active:scale-95">
                  Try Gold FREE for 30 days
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ZomatoGoldBanner