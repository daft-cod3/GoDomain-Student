"use client";

import { useEffect, useState } from "react";

export const THEME_KEY = "godomain-theme";
export const THEME_EVENT = "godomain-theme-change";

export function resolveTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

  return stored || (prefersDark ? "dark" : "light");
}

export function applyTheme(theme) {
  if (typeof window === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  window.localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

export function clearStoredTheme() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(THEME_KEY);
  const nextTheme = resolveTheme();
  document.documentElement.setAttribute("data-theme", nextTheme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: nextTheme }));
}

export function useThemePreference() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const themeMedia = window.matchMedia?.("(prefers-color-scheme: dark)");

    function syncTheme(nextTheme = resolveTheme()) {
      setTheme(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    }

    function handleStorage(event) {
      if (event.key && event.key !== THEME_KEY) {
        return;
      }

      syncTheme();
    }

    function handleThemeEvent(event) {
      syncTheme(event.detail || resolveTheme());
    }

    function handleSystemThemeChange() {
      if (window.localStorage.getItem(THEME_KEY)) {
        return;
      }

      syncTheme();
    }

    syncTheme();
    setMounted(true);

    window.addEventListener("storage", handleStorage);
    window.addEventListener(THEME_EVENT, handleThemeEvent);
    themeMedia?.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(THEME_EVENT, handleThemeEvent);
      themeMedia?.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  function updateTheme(nextTheme) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  function toggleTheme() {
    updateTheme(theme === "dark" ? "light" : "dark");
  }

  return {
    theme,
    mounted,
    setTheme: updateTheme,
    toggleTheme,
  };
}
