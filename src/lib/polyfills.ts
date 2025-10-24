// Client-side localStorage polyfill
// This prevents SSR issues with localStorage

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// Create a mock localStorage implementation
const createMockStorage = () => ({
  getItem: (key: string) => null,
  setItem: (key: string, value: string) => {},
  removeItem: (key: string) => {},
  clear: () => {},
  length: 0,
  key: (index: number) => null,
});

// If not in browser, create a mock localStorage for SSR
if (!isBrowser) {
  // Create a mock localStorage for server-side rendering
  if (typeof global !== 'undefined') {
    (global as any).localStorage = createMockStorage();
  }
} else {
  // We're in the browser, check if localStorage is available and working properly
  const isLocalStorageWorking = () => {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };

  // Check if localStorage exists but is broken (from external tool injection)
  if (typeof window.localStorage !== 'undefined') {
    if (!isLocalStorageWorking() || typeof window.localStorage.getItem !== 'function') {
      // localStorage exists but is broken, replace it
      Object.defineProperty(window, 'localStorage', {
        value: createMockStorage(),
        writable: false,
        configurable: true,
      });
    }
  } else if (!isLocalStorageWorking()) {
    // localStorage doesn't exist or is not working, create mock
    Object.defineProperty(window, 'localStorage', {
      value: createMockStorage(),
      writable: false,
    });
  }
}
