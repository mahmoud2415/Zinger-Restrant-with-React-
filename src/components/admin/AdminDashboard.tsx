import React, { useState } from 'react';
import { 
  MenuItem, 
  Deal, 
  Category, 
  AdminUser, 
  SizeOption 
} from '../../types';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Search, 
  Upload, 
  ArrowLeft, 
  LogOut, 
  Layers 
} from 'lucide-react';
import { 
  saveMenuItem, 
  deleteMenuItem, 
  toggleItemAvailability, 
  saveDeal, 
  deleteDeal, 
  uploadMealImage 
} from '../../services/menuService';
import { logoutAdmin } from '../../services/authService';
import { useToast } from '../../context/ToastContext';

interface AdminDashboardProps {
  admin: AdminUser;
  menuItems: MenuItem[];
  deals: Deal[];
  categories: Category[];
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  admin,
  menuItems,
  deals,
  categories,
  onClose,
  onLogout,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'menu' | 'deals'>('menu');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Edit / Add Item State
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Edit / Add Deal State
  const [editingDeal, setEditingDeal] = useState<Partial<Deal> | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);

  // Filtered Menu Items
  const filteredItems = menuItems.filter((item) => {
    const matchCat = filterCategory === 'all' || item.category === filterCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !searchQuery ||
      item.nameEn.toLowerCase().includes(q) ||
      item.nameAr.toLowerCase().includes(q) ||
      item.descAr?.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleToggleStock = async (itemId: string, currentStatus: boolean) => {
    await toggleItemAvailability(itemId, !currentStatus);
    showToast(`تم ${!currentStatus ? 'تفعيل توفر' : 'إلغاء توفر'} الوجبة في المنيو!`);
  };

  const handleDeleteItem = async (itemId: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف وجبة "${name}" نهائياً من المنيو؟`)) {
      await deleteMenuItem(itemId);
      showToast('تم حذف الوجبة بنجاح');
    }
  };

  const handleOpenAddItem = () => {
    setEditingItem({
      id: `item-${Date.now()}`,
      category: categories[0]?.id || 'burgers',
      nameEn: '',
      nameAr: '',
      descAr: '',
      basePrice: 100,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      isAvailable: true,
      allowSpice: true,
      sizes: [],
    });
    setIsItemModalOpen(true);
  };

  const handleOpenEditItem = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.nameAr || !editingItem.nameEn) {
      showToast('يرجى ملء اسم الوجبة بالعربي والإنجليزي', 'warning');
      return;
    }

    await saveMenuItem(editingItem as MenuItem);
    showToast('تم حفظ وتحديث الوجبة بنجاح! 🔥');
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        const url = await uploadMealImage(file);
        setEditingItem((prev) => (prev ? { ...prev, image: url } : null));
        showToast('تم رفع صورة الوجبة بنجاح! 📸');
      } catch {
        showToast('تعذر رفع الصورة', 'warning');
      } finally {
        setUploadingImage(false);
      }
    }
  };

  // Add / Remove Size in editing item
  const handleAddSizeOption = () => {
    if (!editingItem) return;
    const currentSizes = editingItem.sizes || [];
    setEditingItem({
      ...editingItem,
      sizes: [
        ...currentSizes,
        { nameEn: 'Double', nameAr: 'دبل', price: (editingItem.basePrice || 100) + 50 },
      ],
    });
  };

  const handleRemoveSizeOption = (index: number) => {
    if (!editingItem || !editingItem.sizes) return;
    const updated = editingItem.sizes.filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, sizes: updated });
  };

  const handleSizeChange = (index: number, field: keyof SizeOption, val: any) => {
    if (!editingItem || !editingItem.sizes) return;
    const updated = [...editingItem.sizes];
    updated[index] = { ...updated[index], [field]: val };
    setEditingItem({ ...editingItem, sizes: updated });
  };

  // Deals Actions
  const handleOpenAddDeal = () => {
    setEditingDeal({
      id: `deal-${Date.now()}`,
      titleEn: '',
      titleAr: '',
      descAr: '',
      badge: 'HOT DEAL 🔥',
      price: 150,
      originalPrice: 200,
      image: '/menu_items/zinger_combo.png',
      code: 'OFFER' + Math.floor(Math.random() * 100),
      isActive: true,
    });
    setIsDealModalOpen(true);
  };

  const handleSaveDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDeal || !editingDeal.titleAr || !editingDeal.titleEn) {
      showToast('يرجى ملء تفاصيل العرض', 'warning');
      return;
    }

    await saveDeal(editingDeal as Deal);
    showToast('تم حفظ وتفعيل العرض بنجاح! 🔥');
    setIsDealModalOpen(false);
    setEditingDeal(null);
  };

  const handleDeleteDeal = async (dealId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      await deleteDeal(dealId);
      showToast('تم حذف العرض');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
    showToast('تم تسجيل الخروج بنجاح');
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinger-bg flex flex-col overflow-hidden">
      {/* Top Admin Header */}
      <header className="bg-zinger-surface border-b border-zinger-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1 text-xs font-heading font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">GO TO MENU</span>
          </button>

          <div>
            <h1 className="font-heading font-black text-sm sm:text-base text-white uppercase tracking-tight flex items-center gap-2">
              <span>ZINGER ADMIN CONTROL PANEL</span>
              <span className="px-2 py-0.5 rounded bg-zinger-yellow text-black text-[10px] font-bold">
                LIVE
              </span>
            </h1>
            <span className="text-[11px] text-zinc-400 font-mono block">
              Logged as: {admin.email}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            title="Log Out"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinger-red hover:text-white text-zinc-300 text-xs font-heading font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Tabs Switcher */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all ${
            activeTab === 'menu'
              ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>MENU ITEMS ({menuItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('deals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all ${
            activeTab === 'deals'
              ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>DEALS & OFFERS ({deals.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      <main className="flex-1 overflow-y-auto p-4 max-w-7xl w-full mx-auto custom-scrollbar">
        {/* TAB 1: MENU ITEMS */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            {/* Filters Bar & Add Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinger-card p-3 rounded-2xl border border-zinc-800">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="بحث في الوجبات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 outline-none"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none font-cairo"
                >
                  <option value="all">كل الأقسام</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameAr} ({c.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddItem}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-heading font-black text-xs uppercase tracking-wider transition-all shadow-glow-yellow-sm active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>ADD NEW MEAL / إضافة صنف</span>
              </button>
            </div>

            {/* Items Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl bg-zinger-card border transition-all flex flex-col justify-between gap-3 ${
                    item.isAvailable
                      ? 'border-zinc-800 hover:border-zinc-700'
                      : 'border-zinger-red/40 bg-zinc-950/80 opacity-75'
                  }`}
                >
                  {/* Top Row: Thumbnail + Titles */}
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.nameAr}
                      className="w-16 h-16 rounded-xl object-cover bg-black shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 uppercase">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-zinger-yellow text-black uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-black text-xs text-white uppercase line-clamp-1">
                        {item.nameEn}
                      </h4>
                      <h5 className="font-cairo font-bold text-xs text-zinc-400 line-clamp-1">
                        {item.nameAr}
                      </h5>
                      <span className="font-heading font-black text-sm text-zinger-yellow block mt-1">
                        {item.basePrice} ج.م
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: In-Stock Toggle & Actions */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/80">
                    {/* Instant Stock Status Switch */}
                    <button
                      onClick={() => handleToggleStock(item.id, item.isAvailable)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all ${
                        item.isAvailable
                          ? 'bg-zinc-800 text-zinger-green border border-zinc-700'
                          : 'bg-zinger-red/10 text-zinger-red border border-zinger-red/30'
                      }`}
                    >
                      {item.isAvailable ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-zinger-green" />
                          <span>IN STOCK (متوفر)</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-zinger-red" />
                          <span>OUT OF STOCK</span>
                        </>
                      )}
                    </button>

                    {/* Edit & Delete Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditItem(item)}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id, item.nameAr)}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinger-red/20 text-zinc-400 hover:text-zinger-red transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DEALS & OFFERS */}
        {activeTab === 'deals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-zinger-card p-3 rounded-2xl border border-zinc-800">
              <div>
                <h3 className="font-heading font-black text-sm text-white uppercase">
                  ACTIVE DEALS & PROMOTIONS
                </h3>
                <p className="text-xs text-zinc-400 font-cairo">
                  عروض الصفحة الرئيسية وبوكسات التوفير
                </p>
              </div>

              <button
                onClick={handleOpenAddDeal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-heading font-black text-xs uppercase"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW DEAL</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="p-4 rounded-2xl bg-zinger-card border border-zinc-800 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinger-yellow text-black uppercase">
                        {deal.badge}
                      </span>
                      <h4 className="font-heading font-black text-sm text-white uppercase mt-1">
                        {deal.titleEn}
                      </h4>
                      <h5 className="font-cairo font-bold text-xs text-zinc-400">
                        {deal.titleAr}
                      </h5>
                      <p className="text-xs text-zinc-500 font-cairo mt-1">
                        {deal.descAr}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-black text-lg text-zinger-yellow block">
                        {deal.price} ج.م
                      </span>
                      {deal.code && (
                        <span className="text-[10px] font-mono text-zinc-400 block bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
                          {deal.code}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className="text-xs text-zinger-green font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      ACTIVE IN HOME CAROUSEL
                    </span>

                    <button
                      onClick={() => handleDeleteDeal(deal.id)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinger-red/20 text-zinc-400 hover:text-zinger-red"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD / EDIT MENU ITEM */}
      {isItemModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsItemModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg rounded-3xl bg-zinger-surface border border-zinger-border p-5 z-10 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
              <h3 className="font-heading font-black text-base text-white uppercase">
                {editingItem.id ? 'EDIT MEAL / تعديل الوجبة' : 'ADD NEW MEAL / صنف جديد'}
              </h3>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar">
              {/* English & Arabic Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    MEAL NAME (ENGLISH) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TRIPLE CHEESE BURGER"
                    value={editingItem.nameEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white uppercase outline-none focus:border-zinger-yellow"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                    اسم الوجبة (عربي) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: برجر تريبل تشيز"
                    value={editingItem.nameAr || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, nameAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none focus:border-zinger-yellow font-cairo"
                  />
                </div>
              </div>

              {/* Category & Base Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    CATEGORY / القسم *
                  </label>
                  <select
                    value={editingItem.category || 'burgers'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none font-cairo"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr} ({c.nameEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    BASE PRICE (EGP) / السعر الأساسي *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingItem.basePrice || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, basePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none focus:border-zinger-yellow"
                  />
                </div>
              </div>

              {/* Arabic Description */}
              <div>
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  وصف المكونات (عربي)
                </label>
                <textarea
                  rows={2}
                  placeholder="اكتب مكونات الوجبة والصوصات بالتفصيل..."
                  value={editingItem.descAr || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, descAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none resize-none font-cairo"
                />
              </div>

              {/* Image Input & Upload */}
              <div>
                <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                  MEAL IMAGE / رابط الصورة أو رفع ملف
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... or /assets/..."
                    value={editingItem.image || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none"
                  />
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-xs text-zinger-yellow font-heading font-bold flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'UPLOADING...' : 'UPLOAD'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Badge & Spice options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    HIGHLIGHT BADGE / شارة مميزة
                  </label>
                  <select
                    value={editingItem.badge || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        badge: (e.target.value as any) || undefined,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none font-heading"
                  >
                    <option value="">بدون شارة (None)</option>
                    <option value="HOT">HOT 🔥</option>
                    <option value="BESTSELLER">BESTSELLER ⭐</option>
                    <option value="SUPER CRUNCHY">SUPER CRUNCHY 🍗</option>
                    <option value="NEW">NEW ✨</option>
                    <option value="CHEF PICK">CHEF PICK 👨‍🍳</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-cairo text-zinc-300">
                    <input
                      type="checkbox"
                      checked={editingItem.allowSpice ?? true}
                      onChange={(e) => setEditingItem({ ...editingItem, allowSpice: e.target.checked })}
                      className="w-4 h-4 rounded text-zinger-yellow"
                    />
                    <span>إتاحة اختيار درجة الشطة</span>
                  </label>
                </div>
              </div>

              {/* Sizes / Options Management */}
              <div className="pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-heading font-bold text-zinc-300 uppercase">
                    SIZE & WEIGHT OPTIONS / الأحجام والأسعار
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSizeOption}
                    className="flex items-center gap-1 text-[11px] font-heading font-bold text-zinger-yellow hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD SIZE</span>
                  </button>
                </div>

                {editingItem.sizes && editingItem.sizes.length > 0 ? (
                  <div className="space-y-2">
                    {editingItem.sizes.map((size, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                        <input
                          type="text"
                          placeholder="Single (200g)"
                          value={size.nameEn}
                          onChange={(e) => handleSizeChange(idx, 'nameEn', e.target.value)}
                          className="w-1/3 px-2 py-1 rounded-lg bg-zinc-800 text-xs text-white outline-none"
                        />
                        <input
                          type="text"
                          placeholder="سنجل (200جم)"
                          value={size.nameAr}
                          onChange={(e) => handleSizeChange(idx, 'nameAr', e.target.value)}
                          className="w-1/3 px-2 py-1 rounded-lg bg-zinc-800 text-xs text-white outline-none font-cairo"
                        />
                        <input
                          type="number"
                          placeholder="180"
                          value={size.price}
                          onChange={(e) => handleSizeChange(idx, 'price', Number(e.target.value))}
                          className="w-1/4 px-2 py-1 rounded-lg bg-zinc-800 text-xs text-white outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSizeOption(idx)}
                          className="text-zinc-500 hover:text-zinger-red p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-zinc-500 font-cairo">
                    لا توجد أحجام إضافية. سيتم استخدام السعر الأساسي فقط.
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-zinc-800">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-heading font-black text-xs uppercase tracking-wider transition-all shadow-glow-yellow"
                >
                  SAVE MEAL / حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT DEAL */}
      {isDealModalOpen && editingDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsDealModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md rounded-3xl bg-zinger-surface border border-zinger-border p-5 z-10 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
              <h3 className="font-heading font-black text-base text-white uppercase">
                CREATE DEAL / إضافة عرض ترويجي
              </h3>
              <button
                onClick={() => setIsDealModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDeal} className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar">
              <div>
                <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                  DEAL TITLE (ENGLISH) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MEGA ZINGER COMBO"
                  value={editingDeal.titleEn || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, titleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white uppercase outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  عنوان العرض (عربي) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عرض ميجا كومبو التوفير"
                  value={editingDeal.titleAr || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, titleAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none font-cairo"
                />
              </div>

              <div>
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  تفاصيل العرض والمكونات
                </label>
                <textarea
                  rows={2}
                  placeholder="2 ساندوتش + بطاطس + كانز بيبسي..."
                  value={editingDeal.descAr || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, descAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none resize-none font-cairo"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    DEAL PRICE (EGP) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingDeal.price || ''}
                    onChange={(e) => setEditingDeal({ ...editingDeal, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    ORIGINAL PRICE (EGP)
                  </label>
                  <input
                    type="number"
                    value={editingDeal.originalPrice || ''}
                    onChange={(e) => setEditingDeal({ ...editingDeal, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    BADGE / شارة الخصم
                  </label>
                  <input
                    type="text"
                    placeholder="SAVE 25%"
                    value={editingDeal.badge || ''}
                    onChange={(e) => setEditingDeal({ ...editingDeal, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    PROMO CODE / كود
                  </label>
                  <input
                    type="text"
                    placeholder="ZINGER25"
                    value={editingDeal.code || ''}
                    onChange={(e) => setEditingDeal({ ...editingDeal, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-heading font-black text-xs uppercase"
                >
                  SAVE & PUBLISH DEAL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
