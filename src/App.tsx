import React, { useState, useEffect, useMemo } from 'react';
import { BranchProvider, useBranch } from './context/BranchContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import { BranchLanding } from './components/branch/BranchLanding';
import { BranchInfoModal } from './components/branch/BranchInfoModal';
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/menu/SearchBar';
import { CategoryNav } from './components/menu/CategoryNav';
import { MenuSection } from './components/menu/MenuSection';
import { CustomizationModal } from './components/customizer/CustomizationModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { PwaBanner } from './components/pwa/PwaBanner';
import { categories } from './data/categories';
import { menuData } from './data/menuData';
import { useArabicSearch } from './hooks/useArabicSearch';

const MainAppContent: React.FC = () => {
  const { selectedBranch } = useBranch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0].id);

  const filteredMenuItems = useArabicSearch(menuData, searchQuery);

  // Group items by category
  const groupedSections = useMemo(() => {
    return categories.map((cat) => ({
      category: cat,
      items: filteredMenuItems.filter((item) => item.section === cat.id),
    }));
  }, [filteredMenuItems]);

  // Scroll to category section
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const element = document.getElementById(`section-${categoryId}`);
    if (element) {
      const navOffset = 130; // Approx sticky header + search nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // ScrollSpy to update active tab when user scrolls
  useEffect(() => {
    if (!selectedBranch) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = categories.length - 1; i >= 0; i--) {
        const cat = categories[i];
        const element = document.getElementById(`section-${cat.id}`);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveCategoryId(cat.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedBranch]);

  // Register service worker if supported
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered:', reg.scope))
        .catch((err) => console.log('Service Worker registration failed:', err));
    }
  }, []);

  if (!selectedBranch) {
    return (
      <>
        <BranchLanding />
        <BranchInfoModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface transition-colors duration-300 overflow-x-hidden">
      <PwaBanner />
      <Header />

      <main className="pb-32 max-w-container-max mx-auto">
        <Hero />

        {/* Sticky Search & Categories Navigation */}
        <div className="sticky top-16 z-40 bg-surface/95 backdrop-blur-md pt-2.5 pb-3 border-b border-gray-100 shadow-sm transition-colors duration-300">
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
          <CategoryNav
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Menu Sections List */}
        <div id="dynamic-menu-container">
          {groupedSections.map(({ category, items }) => (
            <MenuSection key={category.id} category={category} items={items} />
          ))}

          {filteredMenuItems.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              <span className="material-symbols-outlined text-5xl mb-2 text-gray-300">
                search_off
              </span>
              <p className="text-sm font-bold">لا توجد وجبات تطابق بحثك</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs text-primary font-bold hover:underline"
              >
                مسح البحث وتصفح المنيو كاملاً
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
      <Footer />
      <CustomizationModal />
      <CartDrawer />
      <BranchInfoModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BranchProvider>
      <CartProvider>
        <ModalProvider>
          <MainAppContent />
        </ModalProvider>
      </CartProvider>
    </BranchProvider>
  );
};

export default App;
