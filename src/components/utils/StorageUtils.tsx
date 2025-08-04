let rememberMe: boolean = JSON.parse(
  localStorage.getItem("rememberMe") || "false"
);

export const setRememberMe = (value: boolean) => {
  rememberMe = value;
  localStorage.setItem("rememberMe", JSON.stringify(value));
};

export const getRememberMe = (): boolean => {
  return JSON.parse(localStorage.getItem("rememberMe") || "false");
};

export const setStorageItem = (key: string, value: string) => {
  if (rememberMe) {
    sessionStorage.removeItem(key);
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
    sessionStorage.setItem(key, value);
  }
};

export const getStorageItem = (key: string): string | null => {
  const localStorageItem = localStorage.getItem(key);
  const sessionStorageItem = sessionStorage.getItem(key);
  return localStorageItem || sessionStorageItem;
};

export const removeStorageItem = (key: string) => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};

export const clearStorage = () => {
  const themeMode = localStorage.getItem("flowbite-theme-mode");
  localStorage.clear();
  sessionStorage.clear();
  if (themeMode) {
    localStorage.setItem("flowbite-theme-mode", themeMode);
  }
};
