import { atom } from "jotai";

export interface Theme {
  isDark: boolean;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
  };
}

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: "#ffffff",
    text: "#333333",
    primary: "#007bff",
    secondary: "#6c757d",
    border: "#dee2e6",
  },
};

export const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: "#1a1a1a",
    text: "#ffffff",
    primary: "#4dabf7",
    secondary: "#adb5bd",
    border: "#495057",
  },
};

export const themeAtom = atom<Theme>(lightTheme);
