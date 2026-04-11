"use client";

import { useEffect } from "react";

const THEME_KEY = "godomain-theme";

function resolveTheme() {
  const stored = window.localStorage.getItem(THEME_KEY);
  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

  return stored || (prefersDark ? "dark" : "light");
}

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    const themeMedia = window.matchMedia?.("(prefers-color-scheme: dark)");

    function syncTheme() {
      root.setAttribute("data-theme", resolveTheme());
    }

    function handleStorage(event) {
      if (event.key && event.key !== THEME_KEY) {
        return;
      }

      syncTheme();
    }

    function handleSystemThemeChange() {
      if (window.localStorage.getItem(THEME_KEY)) {
        return;
      }

      syncTheme();
    }

    syncTheme();

    const readyFrame = window.requestAnimationFrame(() => {
      root.setAttribute("data-theme-ready", "true");
    });

    window.addEventListener("storage", handleStorage);
    themeMedia?.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.removeEventListener("storage", handleStorage);
      themeMedia?.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return children;
}
