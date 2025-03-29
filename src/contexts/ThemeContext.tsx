
import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "light" | "dark";
type ColorScheme = "blue" | "green" | "purple" | "orange" | "red";
type FontFamily = "system" | "inter" | "poppins" | "roboto" | "playfair";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  color: ColorScheme;
  setColor: (color: ColorScheme) => void;
  font: FontFamily;
  setFont: (font: FontFamily) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as ThemeMode) || "light";
  });
  
  const [color, setColorState] = useState<ColorScheme>(() => {
    const savedColor = localStorage.getItem("color");
    return (savedColor as ColorScheme) || "blue";
  });
  
  const [font, setFontState] = useState<FontFamily>(() => {
    const savedFont = localStorage.getItem("font");
    return (savedFont as FontFamily) || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("color-blue", "color-green", "color-purple", "color-orange", "color-red");
    root.classList.add(`color-${color}`);
    localStorage.setItem("color", color);
  }, [color]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("font-system", "font-inter", "font-poppins", "font-roboto", "font-playfair");
    root.classList.add(`font-${font}`);
    localStorage.setItem("font", font);
  }, [font]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const setColor = (newColor: ColorScheme) => {
    setColorState(newColor);
  };

  const setFont = (newFont: FontFamily) => {
    setFontState(newFont);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, color, setColor, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
