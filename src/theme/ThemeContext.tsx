import type { PaletteMode } from "@mui/material";
import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

// テーマコンテキストの型定義
interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

// デフォルト値
const defaultContext: ThemeContextType = {
  mode: "light",
  toggleTheme: () => {},
};

// テーマコンテキストを作成
const ThemeContext = createContext<ThemeContextType>(defaultContext);

// テーマプロバイダーのProps型
interface ThemeContextProviderProps {
  children: ReactNode;
}

// テーマプロバイダーコンポーネント
export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  // ローカルストレージからテーマを読み込み
  /*useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      // システムの設定を確認
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);*/

  // テーマを切り替える関数
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const contextValue: ThemeContextType = {
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// カスタムフック
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
