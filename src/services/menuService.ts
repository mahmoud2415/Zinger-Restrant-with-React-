import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from './firebase';
import { MenuItem, Deal } from '../types';
import { initialMenuItems } from '../data/initialMenu';
import { initialDeals } from '../data/dealsData';

const MENU_STORAGE_KEY = 'zinger_local_menu_items';
const DEALS_STORAGE_KEY = 'zinger_local_deals';
const FIREBASE_OPERATION_TIMEOUT = 30000;

function removeUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined),
  ) as Partial<T>;
}

async function withFirebaseTimeout<T>(operation: Promise<T>, message: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), FIREBASE_OPERATION_TIMEOUT);
  });

  try {
    return await Promise.race([operation, timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

// Helper to get local data
export function getLocalMenuItems(): MenuItem[] {
  try {
    const saved = localStorage.getItem(MENU_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Error reading local menu items', e);
  }
  return initialMenuItems;
}

export function saveLocalMenuItems(items: MenuItem[]) {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Error saving local menu items', e);
  }
}

export function getLocalDeals(): Deal[] {
  try {
    const saved = localStorage.getItem(DEALS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Error reading local deals', e);
  }
  return initialDeals;
}

export function saveLocalDeals(deals: Deal[]) {
  try {
    localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
  } catch (e) {
    console.warn('Error saving local deals', e);
  }
}

/**
 * Subscribe to Menu Items (Firestore with instant LocalStorage fallback)
 */
export function subscribeToMenuItems(callback: (items: MenuItem[]) => void): () => void {
  // Initial fire from local storage
  callback(getLocalMenuItems());

  try {
    const menuCol = collection(db, 'menu_items');
    const unsubscribe = onSnapshot(
      menuCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const items: MenuItem[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...(docSnap.data() as Omit<MenuItem, 'id'>) });
          });
          saveLocalMenuItems(items);
          callback(items);
        }
      },
      (error) => {
        console.info('Firestore offline/unconfigured, using local data storage:', error.message);
        callback(getLocalMenuItems());
      }
    );
    return unsubscribe;
  } catch (err) {
    console.info('Using local menu fallback:', err);
    return () => {};
  }
}

/**
 * Subscribe to Deals (Firestore with instant LocalStorage fallback)
 */
export function subscribeToDeals(callback: (deals: Deal[]) => void): () => void {
  callback(getLocalDeals());

  try {
    const dealsCol = collection(db, 'deals');
    const unsubscribe = onSnapshot(
      dealsCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const deals: Deal[] = [];
          snapshot.forEach((docSnap) => {
            deals.push({ id: docSnap.id, ...(docSnap.data() as Omit<Deal, 'id'>) });
          });
          saveLocalDeals(deals);
          callback(deals);
        }
      },
      (error) => {
        console.info('Firestore deals offline/unconfigured, using local data storage:', error.message);
        callback(getLocalDeals());
      }
    );
    return unsubscribe;
  } catch (err) {
    console.info('Using local deals fallback:', err);
    return () => {};
  }
}

/**
 * Add or Update Menu Item
 */
export async function saveMenuItem(item: MenuItem): Promise<void> {
  // Update locally first for zero latency
  const current = getLocalMenuItems();
  const index = current.findIndex((i) => i.id === item.id);
  let updated: MenuItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = item;
  } else {
    updated = [item, ...current];
  }
  saveLocalMenuItems(updated);

  // Sync to Firestore
  try {
    const itemRef = doc(db, 'menu_items', item.id);
    await withFirebaseTimeout(
      setDoc(itemRef, removeUndefined(item), { merge: true }),
      'انتهت مهلة حفظ المنتج. تحقق من اتصال الإنترنت وصلاحيات Firebase.',
    );
  } catch (e) {
    console.error('Menu item Firestore sync failed:', e);
    throw new Error(getFirebaseErrorMessage(e, 'تعذر حفظ المنتج على Firebase'));
  }
}

/**
 * Delete Menu Item
 */
export async function deleteMenuItem(itemId: string): Promise<void> {
  const current = getLocalMenuItems();
  const updated = current.filter((i) => i.id !== itemId);
  saveLocalMenuItems(updated);

  try {
    const itemRef = doc(db, 'menu_items', itemId);
    await deleteDoc(itemRef);
  } catch (e) {
    console.warn('Deleted locally. Firestore sync pending:', e);
  }
}

/**
 * Toggle Item Stock Availability
 */
export async function toggleItemAvailability(itemId: string, isAvailable: boolean): Promise<void> {
  const current = getLocalMenuItems();
  const updated = current.map((i) => (i.id === itemId ? { ...i, isAvailable } : i));
  saveLocalMenuItems(updated);

  try {
    const itemRef = doc(db, 'menu_items', itemId);
    await updateDoc(itemRef, { isAvailable });
  } catch (e) {
    console.warn('Updated locally. Firestore sync pending:', e);
  }
}

/**
 * Add or Update Deal
 */
export async function saveDeal(deal: Deal): Promise<void> {
  const current = getLocalDeals();
  const index = current.findIndex((d) => d.id === deal.id);
  let updated: Deal[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = deal;
  } else {
    updated = [deal, ...current];
  }
  saveLocalDeals(updated);

  try {
    const dealRef = doc(db, 'deals', deal.id);
    await withFirebaseTimeout(
      setDoc(dealRef, removeUndefined(deal), { merge: true }),
      'انتهت مهلة حفظ العرض. تحقق من اتصال الإنترنت وصلاحيات Firebase.',
    );
  } catch (e) {
    console.error('Deal Firestore sync failed:', e);
    throw new Error(getFirebaseErrorMessage(e, 'تعذر حفظ العرض على Firebase'));
  }
}

/**
 * Delete Deal
 */
export async function deleteDeal(dealId: string): Promise<void> {
  const current = getLocalDeals();
  const updated = current.filter((d) => d.id !== dealId);
  saveLocalDeals(updated);

  try {
    const dealRef = doc(db, 'deals', dealId);
    await deleteDoc(dealRef);
  } catch (e) {
    console.warn('Deleted deal locally. Firestore sync pending:', e);
  }
}

function getFirebaseErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = String(error.code);
    if (code.includes('permission-denied') || code.includes('storage/unauthorized')) {
      return 'ليس لديك صلاحية Firebase لرفع الصور أو حفظ البيانات. استخدم حساب الأدمن الحقيقي وتحقق من القواعد.';
    }
    if (code.includes('storage/bucket-not-found')) {
      return 'مجلد Firebase Storage غير موجود أو اسم الـ bucket غير صحيح.';
    }
    if (code.includes('storage/quota-exceeded')) {
      return 'تم تجاوز مساحة Firebase Storage المتاحة.';
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

/**
 * Compress a selected image and return it as a Firestore-safe Data URL.
 */
export async function uploadMealImage(file: File): Promise<string> {
  const dataUrl = await compressImageToDataUrl(file);
  if (dataUrl.length > 900_000) {
    throw new Error('الصورة كبيرة بعد الضغط. اختر صورة أصغر حجمًا.');
  }
  return dataUrl;
}

function compressImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const maxDimension = 1200;
      const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('تعذر تجهيز الصورة للرفع'));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
      if (!dataUrl) reject(new Error('تعذر تحويل الصورة'));
      else resolve(dataUrl);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('تعذر قراءة ملف الصورة'));
    };
    image.src = objectUrl;
  });
}
