<div align="center">

# 🍔 Zinger Gourmet | مطعم زنجر (React ⚛️)

### *تطبيق ويب تقدمي (PWA) ومنيو إلكتروني تفاعلي لسلسلة مطاعم زنجر مبني بـ React و Vite مع نظام طلب مباشر عبر واتساب*
### *A Modern Mobile-First Restaurant PWA & Digital Menu built with React, Vite & WhatsApp Ordering*

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-F87171?style=for-the-badge&logo=pwa&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

<br/>

![Zinger App Preview](screen.png)

</div>

---

## 🌐 اللغات / Languages

- [🇸🇦 النسخة العربية](#-دليل-المشروع-باللغة-العربية)
- [🇬🇧 English Version](#-english-project-guide)

---

# 🇸🇦 دليل المشروع باللغة العربية

## 📑 جدول المحتويات
- [نظرة عامة](#-نظرة-عامة)
- [المميزات الرئيسية](#-المميزات-الرئيسية)
- [هيكل المشروع النظيف](#-هيكل-المشروع-النظيف-clean-architecture)
- [التقنيات المستخدمة](#-التقنيات-المستخدمة)
- [التشغيل المحلي](#-التشغيل-المحلي)
- [بناء المشروع للنشر](#-بناء-المشروع-للنشر-build--deployment)

---

## 🌟 نظرة عامة

**مطعم زنجر (Zinger Gourmet)** هو تطبيق ويب تقدمي (PWA) فائق السرعة مبني بأحدث تقنيات **React 18 + Vite + TypeScript + Tailwind CSS**، تم تنظيمه وفق معايير الـ **Clean Modular Architecture** ليكون قابلاً للتوسع وإضافة المزيد من التعديلات والميزات المستقبلية بسلاسة تامة.

---

## ✨ المميزات الرئيسية

- 🏢 **إدارة الفروع المتعددة (Multi-Branch)**: صفحة ترحيبية ذكية لاختيار الفرع (الإسماعيلية، فاقوس المنشية، فاقوس كفر العدوى، أبو كبير) مع حفظ الفرع في `localStorage`.
- 📋 **منيو تفاعلي وبحث ذكي**: أقسام متنوعة مع ScrollSpy، ومحرك بحث عربي ذكي يعالج الهمزات والحروف المتشابهة.
- 🛠️ **نافذة تخصيص الوجبات (Customization Modal)**: سلايدر صور تفاعلي، اختيار الأحجام والأوزان، مستوى الشطة، وإضافات الصوصات والمشروبات، مع دعم إيماءة السحب للأسفل للإغلاق (Swipe-to-Dismiss).
- 🛒 **سلة المشتريات والطلب عبر واتساب**: إمكانية اختيار التوصيل أو الاستلام مع حفظ بيانات العميل، وتوليد رسالة واتساب منسقة تلقائياً بضغطة زر.
- 📱 **تطبيق ويب تقدمي (PWA)**: يدعم التثبيت على شاشة الهاتف للأندرويد والآيفون مع Service Worker للكاش والعمل دون إنترنت.

---

## 📁 هيكل المشروع النظيف (Clean Architecture)

```plaintext
src/
├── types/              # تعريفات TypeScript (Branch, MenuItem, CartItem, etc.)
├── data/               # ملفات البيانات (branches.ts, menuData.ts, categories.ts, extrasData.ts)
├── context/            # إدارة الحالة (BranchContext, CartContext, ModalContext)
├── hooks/              # الخطافات المخصصة (useArabicSearch, usePwaInstall, useSwipeToDismiss)
├── utils/              # أدوات المساعدة (whatsapp.ts, arabic.ts, storage.ts, format.ts)
├── components/         # المكونات الموديلر
│   ├── branch/         # كروت الفروع والمودال
│   ├── layout/         # الهيدر، الهيرو، الفوتر، والشريط السفلي
│   ├── menu/           # البحث، شريط التصنيفات، وكروت الوجبات
│   ├── customizer/     # مودال التخصيص، الأحجام، الشطة، والإضافات
│   ├── cart/           # درج السلة، فورم العميل، وحساب الإجمالي
│   └── pwa/            # بانر التثبيت الذكي
├── App.tsx             # نقطة تجميع التطبيق
├── main.tsx            # المدخل الرئيسي لـ React
└── index.css           # أنماط Tailwind والتأثيرات الزجاجية
```

---

## 🚀 التشغيل المحلي

```bash
# 1. تثبيت الاعتماديات
npm install

# 2. تشغيل سيرفر التطوير (Dev Server)
npm run dev

# 3. بناء المشروع للإنتاج (Production Build)
npm run build

# 4. معاينة نسخة الإنتاج محلياً
npm run preview
```

---

## 🌐 بناء المشروع للنشر (Build & Deployment)

عند النشر على **Vercel** أو **Netlify** أو **GitHub Pages**:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
