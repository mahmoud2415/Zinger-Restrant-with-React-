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
  const [savingItem, setSavingItem] = useState(false);

  // Edit / Add Deal State
  const [editingDeal, setEditingDeal] = useState<Partial<Deal> | null>(null);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [savingDeal, setSavingDeal] = useState(false);

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
      badge: undefined,
      sizes: [
        { nameEn: 'Single', nameAr: 'سنجل', price: 100 },
        { nameEn: 'Double', nameAr: 'دبل', price: 140 },
      ],
    });
    setIsItemModalOpen(true);
  };

  const handleOpenEditItem = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.nameAr || !editingItem.basePrice) {
      showToast('يرجى ملء جميع الحقول الإلزامية', 'warning');
      return;
    }

    setSavingItem(true);
    try {
      await saveMenuItem(editingItem as MenuItem);
      showToast('تم حفظ وتحديث الوجبة بنجاح! 🔥');
      setIsItemModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'فشل حفظ الوجبة على Firebase.', 'warning');
    } finally {
      setSavingItem(false);
    }
  };

  const readImageFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Image preview could not be created'));
        }
      };
      reader.onerror = () => reject(reader.error || new Error('Image file could not be read'));
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('يرجى اختيار ملف صورة صالح', 'warning');
      e.target.value = '';
      return;
    }

    setUploadingImage(true);
    try {
      const previewUrl = await readImageFile(file);
      setEditingItem((current) => (current ? { ...current, image: previewUrl } : current));
      const url = await uploadMealImage(file);
      setEditingItem((current) => (current ? { ...current, image: url } : current));
      showToast('تم رفع الصورة بنجاح! 📸');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'فشل رفع الصورة إلى Firebase.', 'warning');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleDealImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('يرجى اختيار ملف صورة صالح', 'warning');
      e.target.value = '';
      return;
    }

    setUploadingImage(true);
    try {
      const previewUrl = await readImageFile(file);
      setEditingDeal((current) => (
        current ? { ...current, image: previewUrl, coverType: 'custom' } : current
      ));
      const url = await uploadMealImage(file);
      setEditingDeal((current) => (current ? { ...current, image: url, coverType: 'custom' } : current));
      showToast('تم رفع غلاف العرض بنجاح! 📸');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'فشل رفع غلاف العرض إلى Firebase.', 'warning');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // Sizes Helper inside edit modal
  const handleAddSize = () => {
    if (!editingItem) return;
    const currentSizes = editingItem.sizes || [];
    setEditingItem({
      ...editingItem,
      sizes: [...currentSizes, { nameEn: 'New Size', nameAr: 'حجم جديد', price: editingItem.basePrice || 100 }],
    });
  };

  const handleRemoveSize = (index: number) => {
    if (!editingItem || !editingItem.sizes) return;
    const updated = editingItem.sizes.filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, sizes: updated });
  };

  const handleUpdateSize = (index: number, field: keyof SizeOption, val: any) => {
    if (!editingItem || !editingItem.sizes) return;
    const updated = [...editingItem.sizes];
    updated[index] = { ...updated[index], [field]: val };
    setEditingItem({ ...editingItem, sizes: updated });
  };

  // Deals actions
  const handleOpenAddDeal = () => {
    setEditingDeal({
      id: `deal-${Date.now()}`,
      titleEn: 'NEW SPECIAL DEAL',
      titleAr: 'عرض خاص جديد',
      descAr: 'تفاصيل العرض الحصري',
      price: 150,
      image: '',
      coverType: 'custom',
      badge: 'SPECIAL OFFER',
      isActive: true,
    });
    setIsDealModalOpen(true);
  };

  const handleOpenEditDeal = (deal: Deal) => {
    setEditingDeal({ ...deal });
    setIsDealModalOpen(true);
  };

  const handleSaveDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editingDeal ||
      !editingDeal.titleAr ||
      !editingDeal.price ||
      !editingDeal.image
    ) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'warning');
      return;
    }

    setSavingDeal(true);
    try {
      await saveDeal(editingDeal as Deal);
      showToast('تم حفظ وتحديث العرض بنجاح! 🔥');
      setIsDealModalOpen(false);
      setEditingDeal(null);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'فشل حفظ العرض على Firebase.', 'warning');
    } finally {
      setSavingDeal(false);
    }
  };

  const handleDeleteDeal = async (dealId: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف العرض "${title}"؟`)) {
      await deleteDeal(dealId);
      showToast('تم حذف العرض بنجاح');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinger-bg text-white overflow-y-auto flex flex-col">
      {/* 1. Admin Header Bar */}
      <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-cairo font-bold text-white transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة للموقع</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  ZINGER ADMIN
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinger-yellow text-black font-black uppercase">
                  OWNER PANEL
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-cairo">
                إدارة وجبات وأسعار وعروض مطعم زينجر
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                await logoutAdmin();
                onLogout();
                onClose();
              }}
              title="تسجيل الخروج"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinger-red font-cairo font-bold transition-all active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Admin Tabs Navigation */}
      <div className="bg-zinc-950/60 border-b border-zinc-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-cairo font-black transition-all shrink-0 ${
              activeTab === 'menu'
                ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>قائمة الوجبات والأصناف ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('deals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-cairo font-black transition-all shrink-0 ${
              activeTab === 'deals'
                ? 'bg-zinger-yellow text-black shadow-glow-yellow-sm'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>بانرات العروض البصرية ({deals.length})</span>
          </button>
        </div>
      </div>

      {/* 3. Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 pb-24">
        {/* ================= TAB 1: MENU ITEMS ================= */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {/* Filter & Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="ابحث باسم الوجبة بالعربي أو الإنجليزي..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 outline-none focus:border-zinger-yellow"
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 outline-none font-cairo"
                >
                  <option value="all">كل الأقسام</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddItem}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-cairo font-black text-xs transition-all shadow-glow-yellow active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة وجبة جديدة</span>
              </button>
            </div>

            {/* Menu Items Table / Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl bg-zinc-950 border transition-all flex flex-col justify-between gap-3 ${
                    item.isAvailable ? 'border-zinc-800' : 'border-red-950/60 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.nameAr}
                      className="w-16 h-16 rounded-xl object-cover bg-zinc-900 shrink-0 border border-zinc-800"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 font-bold uppercase">
                          {categories.find((c) => c.id === item.category)?.nameAr || item.category}
                        </span>

                        <span className="font-heading font-black text-sm text-zinger-yellow">
                          {item.basePrice} ج.م
                        </span>
                      </div>

                      <h3 className="font-cairo font-black text-sm text-white line-clamp-1 mt-1">
                        {item.nameAr}
                      </h3>
                      <h4 className="font-heading font-bold text-[11px] text-zinc-400 uppercase line-clamp-1">
                        {item.nameEn}
                      </h4>

                      {item.sizes && item.sizes.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400 font-cairo">
                          <span>{item.sizes.length} أحجام:</span>
                          <span className="text-zinc-300 font-mono">
                            {item.sizes.map((s) => `${s.nameAr} (${s.price})`).join(' • ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-900 gap-2">
                    {/* In-stock toggle */}
                    <button
                      onClick={() => handleToggleStock(item.id, item.isAvailable)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-cairo font-bold transition-all ${
                        item.isAvailable
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/60'
                          : 'bg-red-950/60 text-red-400 border border-red-900/60'
                      }`}
                    >
                      {item.isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{item.isAvailable ? 'متوفر' : 'غير متوفر'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditItem(item)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinger-yellow transition-all"
                        title="تعديل الوجبة"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteItem(item.id, item.nameAr)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-red-400 transition-all"
                        title="حذف الوجبة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: DEALS BANNERS ================= */}
        {activeTab === 'deals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              <div>
                <h2 className="font-cairo font-black text-sm text-white">
                  بانرات العروض وسلايدر الهيرو البصري
                </h2>
                <p className="text-xs text-zinc-400 font-cairo">
                  يمكنك إضافة وتعديل البانرات البصرية المعروضة في أعلى الموقع
                </p>
              </div>

              <button
                onClick={handleOpenAddDeal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-cairo font-black text-xs transition-all shadow-glow-yellow active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة بانر عرض جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden space-y-3 p-3 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black">
                    <img
                      src={deal.coverType === 'product' && deal.sourceProductId
                        ? menuItems.find((item) => item.id === deal.sourceProductId)?.image || deal.image
                        : deal.image}
                      alt={deal.titleAr}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-cairo font-bold ${
                        deal.isActive ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
                      }`}>
                        {deal.isActive ? 'نشط في الهيرو' : 'معطل'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <div>
                      <h3 className="font-cairo font-black text-sm text-white">
                        {deal.titleAr}
                      </h3>
                      <span className="font-heading font-black text-sm text-zinger-yellow">
                        {deal.price} ج.م
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditDeal(deal)}
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinger-yellow"
                        title="تعديل العرض"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDeal(deal.id, deal.titleAr)}
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-red-400"
                        title="حذف العرض"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: ADD / EDIT MENU ITEM ================= */}
      {isItemModalOpen && editingItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4">
          <div
            onClick={() => setIsItemModalOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-3xl p-5 z-10 flex flex-col shadow-2xl animate-fade-in text-right">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="font-cairo font-black text-base text-white">
                {editingItem.nameAr ? `تعديل وجبة: ${editingItem.nameAr}` : 'إضافة وجبة جديدة'}
              </h2>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div>
                  <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                    MEAL NAME (ENGLISH)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TRIPLE CHEESE BURGER"
                    value={editingItem.nameEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white uppercase outline-none focus:border-zinger-yellow dir-ltr text-right"
                  />
                </div>
              </div>

              {/* Category & Base Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                    القسم *
                  </label>
                  <select
                    value={editingItem.category || 'burgers'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none font-cairo"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                    السعر الأساسي (ج.م) *
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

              {/* Description */}
              <div>
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  وصف المكونات بالتفصيل
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
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  صورة الوجبة من جهازك
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-xs text-zinger-yellow font-cairo font-bold flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'جاري الرفع...' : 'اختيار صورة من الجهاز'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                  {editingItem.image && (
                    <img
                      src={editingItem.image}
                      alt="معاينة صورة الوجبة"
                      className="w-16 h-12 rounded-lg object-cover border border-zinc-700"
                    />
                  )}
                </div>
              </div>

              {/* Badge & Allow Spice */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-900">
                <div>
                  <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                    شارة التميز (Badge)
                  </label>
                  <select
                    value={editingItem.badge || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value as any || undefined })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none font-cairo"
                  >
                    <option value="">بدون شارة</option>
                    <option value="BESTSELLER">BESTSELLER (الأكثر طلباً)</option>
                    <option value="HOT">HOT 🔥 (ساخن وناري)</option>
                    <option value="CHEF PICK">CHEF PICK (اختيار الشيف)</option>
                    <option value="SUPER CRUNCHY">SUPER CRUNCHY (مقرمش جداً)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editingItem.allowSpice ?? true}
                      onChange={(e) => setEditingItem({ ...editingItem, allowSpice: e.target.checked })}
                      className="w-4 h-4 rounded text-zinger-yellow bg-zinc-900 border-zinc-700"
                    />
                    <span className="font-cairo font-bold text-xs text-white">إتاحة اختيار درجة الشطة</span>
                  </label>
                </div>
              </div>

              {/* Sizes / Weights Manager */}
              <div className="space-y-2 pt-2 border-t border-zinc-900">
                <div className="flex items-center justify-between">
                  <span className="font-cairo font-bold text-xs text-zinc-300">
                    خيارات الأحجام والأسعار (Single / Double / Triple...)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="flex items-center gap-1 text-[11px] text-zinger-yellow hover:underline font-cairo"
                  >
                    <Plus className="w-3 h-3" />
                    <span>إضافة حجم</span>
                  </button>
                </div>

                {editingItem.sizes && editingItem.sizes.length > 0 ? (
                  <div className="space-y-2">
                    {editingItem.sizes.map((size, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                        <input
                          type="text"
                          placeholder="الحجم (عربي)"
                          value={size.nameAr}
                          onChange={(e) => handleUpdateSize(idx, 'nameAr', e.target.value)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white font-cairo"
                        />
                        <input
                          type="text"
                          placeholder="Size (En)"
                          value={size.nameEn}
                          onChange={(e) => handleUpdateSize(idx, 'nameEn', e.target.value)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white dir-ltr text-right"
                        />
                        <input
                          type="number"
                          placeholder="السعر"
                          value={size.price}
                          onChange={(e) => handleUpdateSize(idx, 'price', Number(e.target.value))}
                          className="w-20 px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinger-yellow font-bold font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(idx)}
                          className="p-1.5 text-zinc-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-zinc-500 font-cairo">
                    لا توجد أحجام متعددة (سيتم استخدام السعر الأساسي فقط).
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-3 border-t border-zinc-800">
                <button
                  type="submit"
                  disabled={savingItem || uploadingImage}
                  className="w-full py-3 px-4 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover disabled:opacity-60 disabled:cursor-not-allowed text-black font-cairo font-black text-sm tracking-wide transition-all shadow-glow-yellow active:scale-95"
                >
                  {savingItem ? 'جاري حفظ الوجبة...' : uploadingImage ? 'جاري رفع الصورة...' : 'حفظ التعديلات في المنيو 🔥'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT DEAL BANNER ================= */}
      {isDealModalOpen && editingDeal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4">
          <div
            onClick={() => setIsDealModalOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-5 z-10 flex flex-col shadow-2xl animate-fade-in text-right">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h2 className="font-cairo font-black text-base text-white">
                {editingDeal.titleAr ? `تعديل العرض: ${editingDeal.titleAr}` : 'إضافة عرض جديد'}
              </h2>
              <button
                onClick={() => setIsDealModalOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDeal} className="py-4 space-y-4">
              <div>
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  عنوان العرض (عربي) *
                </label>
                <input
                  type="text"
                  required
                  value={editingDeal.titleAr || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, titleAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-cairo"
                />
              </div>

              <div>
                <label className="text-[11px] font-heading font-bold text-zinc-300 block mb-1">
                  DEAL TITLE (ENGLISH)
                </label>
                <input
                  type="text"
                  value={editingDeal.titleEn || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, titleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white uppercase dir-ltr text-right"
                />
              </div>

              <div>
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  تفاصيل العرض
                </label>
                <textarea
                  rows={3}
                  value={editingDeal.descAr || ''}
                  onChange={(e) => setEditingDeal({ ...editingDeal, descAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-cairo resize-none"
                />
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                      سعر العرض (ج.م) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editingDeal.price || ''}
                      onChange={(e) => setEditingDeal({ ...editingDeal, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                      السعر قبل الخصم
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingDeal.originalPrice || ''}
                      onChange={(e) => setEditingDeal({ ...editingDeal, originalPrice: Number(e.target.value) || undefined })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-cairo font-bold text-zinc-300 block mb-1">
                  غلاف العرض *
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setEditingDeal({ ...editingDeal, coverType: 'product' })}
                    className={`py-2 rounded-xl border text-xs font-cairo font-bold ${editingDeal.coverType === 'product' ? 'border-zinger-yellow text-zinger-yellow bg-zinger-yellow/10' : 'border-zinc-700 text-zinc-400'}`}
                  >
                    ربط العرض بمنتج من المنيو
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingDeal({ ...editingDeal, coverType: 'custom' })}
                    className={`py-2 rounded-xl border text-xs font-cairo font-bold ${editingDeal.coverType !== 'product' ? 'border-zinger-yellow text-zinger-yellow bg-zinger-yellow/10' : 'border-zinc-700 text-zinc-400'}`}
                  >
                    غلاف مخصص
                  </button>
                </div>
                {editingDeal.coverType === 'product' && (
                  <select
                    required
                    value={editingDeal.sourceProductId || ''}
                    onChange={(e) => {
                      const product = menuItems.find((item) => item.id === e.target.value);
                      setEditingDeal({
                        ...editingDeal,
                        sourceProductId: e.target.value,
                        image: product?.image || editingDeal.image,
                      });
                    }}
                    className="w-full mb-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-cairo"
                  >
                    <option value="">اختر المنتج المرتبط بالعرض (اختياري)</option>
                    {menuItems.map((item) => (
                      <option key={item.id} value={item.id}>{item.nameAr}</option>
                    ))}
                  </select>
                )}
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-xs text-zinger-yellow font-cairo font-bold flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>اختيار غلاف من الجهاز</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDealImageUpload}
                      className="hidden"
                    />
                  </label>
                  {editingDeal.image && (
                    <img
                      src={editingDeal.image}
                      alt="معاينة غلاف العرض"
                      className="w-24 h-14 rounded-lg object-cover border border-zinc-700"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="dealActive"
                  checked={editingDeal.isActive ?? true}
                  onChange={(e) => setEditingDeal({ ...editingDeal, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-zinger-yellow bg-zinc-900 border-zinc-700"
                />
                <label htmlFor="dealActive" className="font-cairo font-bold text-xs text-white cursor-pointer">
                  تفعيل العرض في سلايدر الهيرو بالصفحة الرئيسية
                </label>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <button
                  type="submit"
                  disabled={savingDeal || uploadingImage}
                  className="w-full py-3 px-4 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover disabled:opacity-60 disabled:cursor-not-allowed text-black font-cairo font-black text-sm transition-all shadow-glow-yellow active:scale-95"
                >
                  {savingDeal ? 'جاري حفظ العرض...' : uploadingImage ? 'جاري رفع الغلاف...' : 'حفظ ونشر العرض 🔥'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
