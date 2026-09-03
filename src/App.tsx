import React, { useState, useEffect } from 'react';
import { MenuItem, Deal, AdminUser } from './types';
import { categories } from './data/categories';
import { subscribeToMenuItems, subscribeToDeals } from './services/menuService';
import { subscribeToAuth } from './services/authService';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Components
import { Navbar } from './components/layout/Navbar';
import { DealsBanner } from './components/deals/DealsBanner';
import { CategoryBar } from './components/menu/CategoryBar';
import { FoodCard } from './components/menu/FoodCard';
import { BottomSheetCustomizer } from './components/customizer/BottomSheetCustomizer';
import { FloatingCartBar } from './components/cart/FloatingCartBar';
import { CheckoutDrawer } from './components/cart/CheckoutDrawer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Search } from 'lucide-react';
import { branches } from './data/branches';

const MainApp: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Modals & Sheets
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Real-time subscriptions with instant fallbacks
  useEffect(() => {
    const unsubMenu = subscribeToMenuItems((items) => setMenuItems(items));
    const unsubDeals = subscribeToDeals((d) => setDeals(d));
    const unsubAuth = subscribeToAuth((admin) => setAdminUser(admin));

    return () => {
      unsubMenu();
      unsubDeals();
      unsubAuth();
    };
  }, []);

  const handleOpenAdminPortal = () => {
    if (adminUser) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // Filter items by category & search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.nameEn.toLowerCase().includes(q) ||
      item.nameAr.toLowerCase().includes(q) ||
      item.descAr?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // Group items by category if 'all' is selected and no search
  const showGrouped = activeCategory === 'all' && !searchQuery.trim();

  return (
    <div className="min-h-screen bg-zinger-bg text-white flex flex-col selection:bg-zinger-yellow selection:text-black">
      {/* 1. Header / Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAdmin={handleOpenAdminPortal}
      />

      {/* 2. Top Deals Carousel */}
      {(!searchQuery.trim() && (activeCategory === 'all' || activeCategory === 'deals')) && (
        <DealsBanner deals={deals} />
      )}

      {/* 3. Sticky Category Navigation */}
      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          if (searchQuery) setSearchQuery('');
        }}
      />

      {/* 4. Menu Items Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 pb-28">
        {showGrouped ? (
          // Grouped Display by Category
          <div className="space-y-10">
            {categories
              .filter((cat) => cat.id !== 'deals')
              .map((cat) => {
                const categoryItems = menuItems.filter((i) => i.category === cat.id);
                if (categoryItems.length === 0) return null;

                return (
                  <section key={cat.id} id={cat.id} className="scroll-mt-32 space-y-3">
                    {/* Category Title Header */}
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-5 bg-zinger-yellow rounded-full inline-block shadow-glow-yellow-sm" />
                        <h2 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                          {cat.nameEn}
                        </h2>
                        <span className="text-xs sm:text-sm font-cairo text-zinger-yellow font-bold">
                          ({cat.nameAr})
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold text-zinc-500">
                        {categoryItems.length} ITEMS
                      </span>
                    </div>

                    {/* Food Items Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {categoryItems.map((item) => (
                        <FoodCard
                          key={item.id}
                          item={item}
                          onOpenCustomizer={(it) => setCustomizerItem(it)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        ) : (
          // Filtered Grid (by selected category or search)
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
              <h2 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
                {searchQuery
                  ? `SEARCH RESULTS FOR "${searchQuery.toUpperCase()}"`
                  : categories.find((c) => c.id === activeCategory)?.nameEn || 'MENU ITEMS'}
              </h2>
              <span className="text-xs font-mono font-bold text-zinc-500">
                {filteredItems.length} ITEMS FOUND
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center mx-auto text-zinc-600">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-zinc-300 uppercase">
                  NO MEALS FOUND
                </h3>
                <p className="text-xs text-zinc-500 font-cairo">
                  لم نعثر على نتائج مطابقة لبحثك. جرب البحث باسم صنف آخر أو اختر من شريط التصنيفات.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinger-yellow font-heading font-bold text-xs uppercase"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredItems.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    onOpenCustomizer={(it) => setCustomizerItem(it)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 5. Footer */}
      <footer className="bg-zinger-surface border-t border-zinc-800/80 py-8 px-4 text-center space-y-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinger-bg border border-zinger-yellow flex items-center justify-center">
              <span className="font-heading font-black text-sm text-zinger-yellow italic">
                Z
              </span>
            </div>
            <span className="font-heading font-black text-lg text-white uppercase tracking-wider">
              ZINGER GOURMET
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-cairo max-w-md mx-auto leading-relaxed">
            أشهى ساندوتشات البرجر الفاخر، الكريب، البيتزا، وتش رول، والوجبات المقرمشة في فاقوس، أبو كبير، والإسماعيلية.
          </p>

          {/* Branches list in footer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-3xl pt-2">
            {branches.map((b) => (
              <div key={b.id} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/60 text-right">
                <span className="font-cairo font-bold text-[11px] text-white block">
                  {b.name}
                </span>
                <span className="font-mono text-[10px] text-zinc-400 block dir-ltr mt-0.5">
                  {b.phone}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-600 font-mono pt-4">
            © {new Date().getFullYear()} ZINGER CAFE & RESTAURANT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* 6. Sticky Floating Cart Button */}
      <FloatingCartBar />

      {/* 7. Bottom Sheet Item Customizer */}
      <BottomSheetCustomizer
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
      />

      {/* 8. Full Checkout Drawer (Branch Selector & 1-Click WhatsApp) */}
      <CheckoutDrawer />

      {/* 9. Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(admin) => {
          setAdminUser(admin);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* 10. Admin Fullscreen Dashboard */}
      {isAdminDashboardOpen && adminUser && (
        <AdminDashboard
          admin={adminUser}
          menuItems={menuItems}
          deals={deals}
          categories={categories}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={() => {
            setAdminUser(null);
            setIsAdminDashboardOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </ToastProvider>
  );
}
