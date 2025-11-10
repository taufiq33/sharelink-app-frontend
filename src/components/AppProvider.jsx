import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  theme: "system",
  setTheme: () => {},
};

export const AppContext = createContext(initialState);

export function AppProvider({ children, defaultTheme, storageKey, ...props }) {
  const [theme, setTheme] = useState(
    localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <AppContext.Provider value={value} {...props}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};
