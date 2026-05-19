import { useState, useEffect } from 'react';
import {
  CategoryPills,
  FilterChips,
  ReorderSection,
  RestaurantGrid,
  StatsRow,
  Header,
  HeroBanner,
  Sidebar,
} from '../components/DashboardPage/';
import { useDispatch, useSelector } from 'react-redux';
import { themeToggle } from '../redux/themeSlice';

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

export default function DashboardPage() {
  const dark = useSelector(state => state.theme.dark);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    dispatch(themeToggle());
  };

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

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* ══ Main Content ══ */}
        <main className="flex-1 min-w-0 flex flex-col">

          {/* ── Top Header ── */}
          <Header
            dark={dark}
            toggleTheme={toggleTheme}
            search={search} setSearch={setSearch}
            setSidebarOpen={setSidebarOpen}
          />

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-8">

              <HeroBanner />

              <CategoryPills setSearch={setSearch} />

              <ReorderSection />

              <StatsRow />

              <FilterChips
                activeFilter={activeFilter}
                filtered={filtered}
                filters={filters}
                setActiveFilter={setActiveFilter}
              />

              <RestaurantGrid
                filtered={filtered}
                setActiveFilter={setActiveFilter}
                setSearch={setSearch}
              />

              <div className="h-4" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
