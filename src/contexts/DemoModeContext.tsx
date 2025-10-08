import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface DemoModeContextType {
  isDemo: boolean;
  toggleDemoMode: () => void;
  setDemoMode: (value: boolean) => void;
}

export const DemoModeContext = createContext<DemoModeContextType | null>(null);

export const useDemoMode = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error("useDemoMode must be used within a DemoModeProvider");
  }
  return context;
};

interface DemoModeProviderProps {
  children: ReactNode;
}

const DEMO_MODE_KEY = "miel-demo-mode";

export const DemoModeProvider: React.FC<DemoModeProviderProps> = ({
  children,
}) => {
  const [isDemo, setIsDemo] = useState<boolean>(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("demo")) {
      return urlParams.get("demo") === "true";
    }

    // Check localStorage
    const stored = localStorage.getItem(DEMO_MODE_KEY);
    if (stored !== null) {
      return stored === "true";
    }

    // Default to demo mode for new users
    return true;
  });

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem(DEMO_MODE_KEY, isDemo.toString());
  }, [isDemo]);

  const toggleDemoMode = () => {
    setIsDemo((prev) => !prev);
  };

  const setDemoMode = (value: boolean) => {
    setIsDemo(value);
  };

  return (
    <DemoModeContext.Provider value={{ isDemo, toggleDemoMode, setDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
};
