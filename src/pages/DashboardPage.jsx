import { useState, useEffect } from 'react';
import {
  CategoryPills,
  FilterChips,
  FoodGrid,
  FoodFormModal,
  OrdersPanel,
  StatsRow,
  Header,
  HeroBanner,
  Sidebar,
} from '../components/DashboardPage/';
import { useDispatch, useSelector } from 'react-redux';
import { themeToggle } from '../redux/themeSlice';
import { getFoods, getOrders } from '../redux/authThunk';
import { useNavigate } from 'react-router';
import { getToken } from '../redux/authStorage';

export default function DashboardPage() {
  const dark = useSelector((state) => state.theme.dark);
  const foodsState = useSelector((state) => state.foods);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  // Auth guard
  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  }, [navigate]);

  // Font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Fetch foods when filters change
  useEffect(() => {
    const params = { isAvailable: undefined };
    if (activeCategory) params.category = activeCategory;
    if (search) params.search = search;
    dispatch(getFoods(params));
  }, [dispatch, activeCategory, search]);

  // Fetch orders for stats (initial load)
  useEffect(() => {
    dispatch(getOrders({ limit: 100 }));
  }, [dispatch]);

  const toggleTheme = () => dispatch(themeToggle());

  // Filter food items by availability
  const foodsList = foodsState.data?.data || [];
  const filtered = foodsList.filter((f) => {
    if (activeFilter === 'available') return f.isAvailable === true;
    if (activeFilter === 'unavailable') return f.isAvailable === false;
    return true;
  });

  const filters = [
    { label: 'All', key: 'all' },
    { label: '✓ Available', key: 'available' },
    { label: '✗ Unavailable', key: 'unavailable' },
  ];

  const handleAddFood = () => {
    setEditingFood(null);
    setModalOpen(true);
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingFood(null);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
  };

  // Determine which view to show
  const showMenu = activeView === 'menu' || activeView === 'dashboard';
  const showOrders = activeView === 'orders';

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }} className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#000000] flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeView={activeView}
          setActiveView={setActiveView}
        />

        {/* ══ Main Content ══ */}
        <main className="flex-1 min-w-0 flex flex-col">
          <Header
            dark={dark}
            toggleTheme={toggleTheme}
            search={search}
            setSearch={setSearch}
            setSidebarOpen={setSidebarOpen}
            onAddFood={showMenu ? handleAddFood : undefined}
          />

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-8">

              {showOrders ? (
                <OrdersPanel />
              ) : (
                <>
                  <HeroBanner />

                  <StatsRow />

                  <CategoryPills
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                  />

                  <FilterChips
                    activeFilter={activeFilter}
                    filtered={filtered}
                    filters={filters}
                    setActiveFilter={setActiveFilter}
                  />

                  {foodsState.isLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin w-8 h-8 border-3 border-[#E23744] border-t-transparent rounded-full mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">Loading menu...</p>
                    </div>
                  ) : foodsState.errors ? (
                    <div className="text-center py-12">
                      <p className="text-red-500 text-sm">{foodsState.errors}</p>
                    </div>
                  ) : (
                    <FoodGrid
                      filtered={filtered}
                      onEdit={handleEditFood}
                      search={search}
                      setSearch={setSearch}
                      setActiveFilter={setActiveFilter}
                    />
                  )}
                </>
              )}

              <div className="h-4" />
            </div>
          </div>
        </main>

        {/* Food Modal */}
        <FoodFormModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          editingFood={editingFood}
        />
      </div>
    </div>
  );
}
