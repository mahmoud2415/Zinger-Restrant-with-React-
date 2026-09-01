import { useMemo } from 'react';
import { MenuItem } from '../types';
import { normalizeArabic } from '../utils/arabic';

export function useArabicSearch(items: MenuItem[], query: string): MenuItem[] {
  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return items;

    const normalizedQuery = normalizeArabic(trimmed);

    return items.filter((item) => {
      const nameMatch = normalizeArabic(item.name).includes(normalizedQuery);
      const descMatch = item.desc ? normalizeArabic(item.desc).includes(normalizedQuery) : false;
      const sectionMatch = normalizeArabic(item.section).includes(normalizedQuery);

      return nameMatch || descMatch || sectionMatch;
    });
  }, [items, query]);
}
