export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return defaultValue;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error setting localStorage key "${key}":`, e);
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`Error removing localStorage key "${key}":`, e);
  }
}
