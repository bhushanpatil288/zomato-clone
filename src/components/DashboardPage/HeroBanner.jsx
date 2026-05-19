
const HeroBanner = () => {
  return (
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
  );
};

export default HeroBanner;
