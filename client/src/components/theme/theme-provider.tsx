import { createContext, useContext, useEffect } from 'react';

type ResolvedTheme = 'dark';

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeProviderState {
  theme: ResolvedTheme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ResolvedTheme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
  }, []);

  // Stub value to preserve API compatibility while locking to dark mode
  const value: ThemeProviderState = { 
    theme: 'dark', 
    resolvedTheme: 'dark', 
    setTheme: () => {} 
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
