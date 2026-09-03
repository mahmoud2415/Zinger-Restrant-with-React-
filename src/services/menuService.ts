import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { MenuItem, Deal } from '../types';
import { initialMenuItems } from '../data/initialMenu';
import { initialDeals } from '../data/dealsData';

const MENU_STORAGE_KEY = 'zinger_local_menu_items';
const DEALS_STORAGE_KEY = 'zinger_local_deals';

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
    await setDoc(itemRef, item, { merge: true });
  } catch (e) {
    console.warn('Saved to local storage. Firestore sync failed or not configured yet:', e);
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
    await setDoc(dealRef, deal, { merge: true });
  } catch (e) {
    console.warn('Saved deal locally. Firestore sync pending:', e);
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

/**
 * Upload Image to Firebase Storage or Return Data URL
 */
export async function uploadMealImage(file: File): Promise<string> {
  try {
    const filename = `meals/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (e) {
    console.warn('Firebase Storage upload failed, converting to local Base64/DataURL for immediate use:', e);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}
