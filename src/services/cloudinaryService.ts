import { db } from './firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

/**
 * Cloudinary CDN Service for Zinger Restaurant
 * Allows uploading images directly to Cloudinary CDN via Unsigned Upload Preset.
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export function getCloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return null;
  }

  return { cloudName, uploadPreset };
}

/**
 * Uploads an image (File object or Base64 Data URL) to Cloudinary CDN.
 * Returns the secure HTTPS CDN URL.
 */
export async function uploadToCloudinary(
  fileOrBase64: File | string,
  folder: string = 'zinger_menu'
): Promise<string> {
  const config = getCloudinaryConfig();

  if (!config) {
    throw new Error(
      'لم يتم ضبط متغيرات البيئة الخاصة بـ Cloudinary في ملف .env (VITE_CLOUDINARY_CLOUD_NAME و VITE_CLOUDINARY_UPLOAD_PRESET)'
    );
  }

  const formData = new FormData();
  formData.append('file', fileOrBase64);
  formData.append('upload_preset', config.uploadPreset);
  if (folder) {
    formData.append('folder', folder);
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `فشل رفع الصورة إلى Cloudinary (رمز الخطأ: ${response.status})`
    );
  }

  const data = await response.json();
  return data.secure_url as string;
}

/**
 * Helper function to inject Cloudinary transformation parameters (auto format, auto quality, resizing).
 */
export function getOptimizedImageUrl(url: string, width: number = 800): string {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com/')) return url;
  if (url.includes('/f_auto,q_auto')) return url;

  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`);
}

/**
 * Scans Firestore collections (`menu_items` and `deals`) for any legacy Base64 images
 * and uploads them to Cloudinary CDN, updating the Firestore documents in place.
 */
export async function migrateBase64ImagesToCloudinary(
  onProgress?: (status: { message: string; current: number; total: number }) => void
): Promise<{ migratedCount: number; errorsCount: number }> {
  const config = getCloudinaryConfig();
  if (!config) {
    throw new Error(
      'برجاء إعداد VITE_CLOUDINARY_CLOUD_NAME و VITE_CLOUDINARY_UPLOAD_PRESET أولاً قبل تشغيل التحديث.'
    );
  }

  let migratedCount = 0;
  let errorsCount = 0;

  // 1. Scan menu_items
  const menuSnap = await getDocs(collection(db, 'menu_items'));
  const menuDocsToMigrate = menuSnap.docs.filter((d) => {
    const img = d.data().image;
    return typeof img === 'string' && img.startsWith('data:image/');
  });

  // 2. Scan deals
  const dealsSnap = await getDocs(collection(db, 'deals'));
  const dealsDocsToMigrate = dealsSnap.docs.filter((d) => {
    const img = d.data().image;
    return typeof img === 'string' && img.startsWith('data:image/');
  });

  const total = menuDocsToMigrate.length + dealsDocsToMigrate.length;

  if (total === 0) {
    onProgress?.({
      message: 'لا توجد صور مخزنة بأسلوب Base64 في قاعدة البيانات! جميع الصور محدثة بالفعل.',
      current: 0,
      total: 0,
    });
    return { migratedCount: 0, errorsCount: 0 };
  }

  let processed = 0;

  // Migrate Menu Items
  for (const docSnap of menuDocsToMigrate) {
    const data = docSnap.data();
    processed++;
    onProgress?.({
      message: `جاري رفع صورة المنتج (${data.titleAr || docSnap.id}) إلى Cloudinary...`,
      current: processed,
      total,
    });

    try {
      const cdnUrl = await uploadToCloudinary(data.image, 'zinger_menu');
      await updateDoc(doc(db, 'menu_items', docSnap.id), {
        image: cdnUrl,
        images: [cdnUrl],
      });
      migratedCount++;
    } catch (err) {
      console.error(`Failed to migrate image for item ${docSnap.id}:`, err);
      errorsCount++;
    }
  }

  // Migrate Deals
  for (const docSnap of dealsDocsToMigrate) {
    const data = docSnap.data();
    processed++;
    onProgress?.({
      message: `جاري رفع صورة العرض (${data.titleAr || docSnap.id}) إلى Cloudinary...`,
      current: processed,
      total,
    });

    try {
      const cdnUrl = await uploadToCloudinary(data.image, 'zinger_deals');
      await updateDoc(doc(db, 'deals', docSnap.id), {
        image: cdnUrl,
        images: [cdnUrl],
      });
      migratedCount++;
    } catch (err) {
      console.error(`Failed to migrate image for deal ${docSnap.id}:`, err);
      errorsCount++;
    }
  }

  onProgress?.({
    message: `تمت عملية الاستبدال بنجاح! تم رفع ${migratedCount} صورة إلى Cloudinary.`,
    current: total,
    total,
  });

  return { migratedCount, errorsCount };
}
