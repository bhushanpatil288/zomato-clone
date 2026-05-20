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
import { getFoods } from '../redux/authThunk';


export default function DashboardPage() {
  const dark = useSelector(state => state.theme.dark);
  const foodsState = useSelector(state => state.foods);
  const foodCount = foodsState.data?.count ?? 0;
  const foodsLoading = foodsState.isLoading;
  const foodsError = foodsState.errors;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const category = '';
  const isAvailable = true;

  useEffect(() => {
    dispatch(getFoods({ category: category || undefined, isAvailable, search: search || undefined }));
  }, [dispatch, category, isAvailable, search]);

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

  const foodsList = foodsState.data?.data || [];

  const filtered = foodsList.filter((f) => {
    const searchStr = search.toLowerCase();
    const nameMatch = f.name?.toLowerCase().includes(searchStr);
    const categoryMatch = f.category?.toLowerCase().includes(searchStr);
    const descriptionMatch = f.description?.toLowerCase().includes(searchStr);
    
    const matchSearch = nameMatch || categoryMatch || descriptionMatch;
    
    if (!matchSearch) return false;
    // Assuming API might not have all these fields natively, we do best-effort filtering
    if (activeFilter === 'fast') return true; // Mock fast delivery
    if (activeFilter === 'top') return f.rating >= 4.5;
    if (activeFilter === 'veg') return f.isVeg || f.veg;
    if (activeFilter === 'cheap') return f.price < 200;
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
              <div className="rounded-2xl border border-gray-200 dark:border-[#2e2e2e] bg-white/80 dark:bg-[#161616] p-4 text-sm text-gray-700 dark:text-gray-200 shadow-sm">
                {foodsLoading ? 'Fetching available foods…' : foodsError ? `Could not load foods: ${foodsError}` : `${foodCount} food items available for your restaurant`}
              </div>

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
