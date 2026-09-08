import React, { useState, useEffect } from 'react';
import { MenuItem, Deal, AdminUser } from './types';
import { categories } from './data/categories';
import { getDealImage } from './data/dealsData';
import { subscribeToMenuItems, subscribeToDeals } from './services/menuService';
import { subscribeToAuth } from './services/authService';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Components
import { Navbar } from './components/layout/Navbar';
import { DealsBanner } from './components/deals/DealsBanner';
import { DealsShowcaseCard } from './components/deals/DealsShowcaseCard';
import { DealsPage } from './components/deals/DealsPage';
import { CategoryGrid } from './components/category/CategoryGrid';
import { FeaturedSection } from './components/menu/FeaturedSection';
import { ProductPage } from './components/product/ProductPage';
import { CategoryPage } from './components/category/CategoryPage';
import { MiniCartButton } from './components/cart/MiniCartButton';
import { CheckoutDrawer } from './components/cart/CheckoutDrawer';
import { Footer } from './components/layout/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

type ViewState =
  | { type: 'home' }
  | { type: 'category'; categoryId: string }
  | { type: 'product'; productId: string }
  | { type: 'deals' };

function parseHash(): ViewState {
  const hash = window.location.hash;
  if (hash.startsWith('#/category/')) {
    const categoryId = hash.replace('#/category/', '');
    return { type: 'category', categoryId };
  }
  if (hash.startsWith('#/product/')) {
    const productId = hash.replace('#/product/', '');
    return { type: 'product', productId };
  }
  if (hash === '#/deals') {
    return { type: 'deals' };
  }
  return { type: 'home' };
}

const MainApp: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Hash-based Page Navigation State (Synchronized with Phone Hardware Back Button)
  const [currentView, setCurrentView] = useState<ViewState>(() => parseHash());

  // Admin Modals
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Listen to Browser / Phone Hardware Back Button
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(parseHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Real-time subscriptions
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

  const navigateToHome = () => {
    window.location.hash = '#/';
  };

  const navigateToCategory = (catId: string) => {
    window.location.hash = `#/category/${catId}`;
  };

  const navigateToProduct = (item: MenuItem) => {
    window.location.hash = `#/product/${item.id}`;
  };

  const navigateToDeal = (deal: Deal) => {
    window.location.hash = `#/product/${deal.id}`;
  };

  const navigateToDeals = () => {
    window.location.hash = '#/deals';
  };

  // Find active product if in product view
  const activeProduct =
    currentView.type === 'product'
      ? menuItems.find((i) => i.id === currentView.productId) ||
        deals
          .filter((d) => d.id === currentView.productId)
          .map((d) => ({
            id: d.id,
            category: 'deals',
            nameAr: d.titleAr,
            descAr: d.descAr,
            basePrice: d.price,
            image: getDealImage(d, menuItems),
            sizes: d.sizes,
            allowSpice: d.allowSpice ?? true,
            isAvailable: d.isActive,
            badge: (d.badge as any) || 'HOT',
          }))[0]
      : null;

  if (currentView.type === 'deals') {
    return (
      <DealsPage
        deals={deals}
        menuItems={menuItems}
        onBack={navigateToHome}
        onHome={navigateToHome}
        onSelectDeal={navigateToDeal}
      />
    );
  }

  // Find active category if in category view
  const activeCategoryObj =
    currentView.type === 'category'
      ? categories.find((c) => c.id === currentView.categoryId)
      : null;

  const categoryItems =
    currentView.type === 'category'
      ? menuItems.filter((i) => i.category === currentView.categoryId)
      : [];

  // 1. DEDICATED PRODUCT PAGE VIEW
  if (currentView.type === 'product' && activeProduct) {
    return (
      <div className="min-h-screen bg-zinger-bg text-white selection:bg-zinger-yellow selection:text-black">
        <ProductPage
          item={activeProduct}
          onBack={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              navigateToHome();
            }
          }}
          onHome={navigateToHome}
          onOpenDeals={navigateToDeals}
        />
        <MiniCartButton />
        <CheckoutDrawer />
      </div>
    );
  }

  // 2. DEDICATED CATEGORY PAGE VIEW
  if (currentView.type === 'category' && activeCategoryObj) {
    return (
      <div className="min-h-screen bg-zinger-bg text-white selection:bg-zinger-yellow selection:text-black">
        <CategoryPage
          category={activeCategoryObj}
          categories={categories}
          items={categoryItems}
          onBack={() => navigateToHome()}
          onHome={navigateToHome}
          onOpenDeals={navigateToDeals}
          onSelectCategory={(catId) => navigateToCategory(catId)}
          onOpenProduct={(it) => navigateToProduct(it)}
        />
        <MiniCartButton />
        <CheckoutDrawer />
      </div>
    );
  }

  // 3. MAIN HOME SCREEN (Banner + Featured Picks + Category Covers Grid)
  return (
    <div className="min-h-screen bg-zinger-bg text-white flex flex-col selection:bg-zinger-yellow selection:text-black">
      {/* 1. Header */}
      <Navbar onOpenAdmin={handleOpenAdminPortal} onOpenDeals={navigateToDeals} />

      {/* 2. Pure Visual Hero Banner Slider */}
      <DealsBanner deals={deals} onOpenDeals={navigateToDeals} />

      {/* 3. Main Home Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 pb-28 space-y-10">
        {/* Dedicated Deals Section Showcase Card */}
        <DealsShowcaseCard deals={deals} onOpenDeals={navigateToDeals} />

        {/* Featured / Bestseller Picks Only */}
        <FeaturedSection
          items={menuItems}
          onOpenProduct={(it) => navigateToProduct(it)}
        />

        {/* Visual Category Covers Grid */}
        <CategoryGrid
          categories={categories}
          menuItems={menuItems}
          onSelectCategory={(catId) => navigateToCategory(catId)}
        />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Compact Floating Mini Cart Button */}
      <MiniCartButton />

      {/* 6. Full Checkout Drawer */}
      <CheckoutDrawer />

      {/* 7. Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(admin) => {
          setAdminUser(admin);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* 8. Admin Fullscreen Dashboard */}
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
