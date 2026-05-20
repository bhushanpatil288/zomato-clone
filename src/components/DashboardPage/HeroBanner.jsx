import { useSelector } from 'react-redux';
import { LuChefHat } from 'react-icons/lu';

const HeroBanner = () => {
  const { user } = useSelector((state) => state.auth);
  const restaurantName = user?.name || 'Partner';

  return (
    <div className="relative bg-gradient-to-br from-[#E23744] via-[#d42535] to-[#b01020] rounded-3xl overflow-hidden p-6 lg:p-8 text-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/3" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold mb-3">
          <LuChefHat className="w-3.5 h-3.5" />
          Restaurant Partner
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
          Welcome back, <br className="hidden sm:block" />{restaurantName}!
        </h2>
        <p className="text-red-100 text-sm mb-1">Manage your menu, track orders, and grow your business — all in one place.</p>
      </div>
      <div className="absolute right-6 bottom-4 opacity-20">
        <LuChefHat className="w-24 h-24 lg:w-32 lg:h-32" />
      </div>
    </div>
  );
};

export default HeroBanner;
