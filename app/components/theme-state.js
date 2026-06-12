"use client";

import { useEffect, useState } from "react";

export const THEME_KEY = "godomain-theme";
export const THEME_EVENT = "godomain-theme-change";
export const LANGUAGE_KEY = "godomain-language";
export const LANGUAGE_EVENT = "godomain-language-change";

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

export function resolveLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  return window.localStorage.getItem(LANGUAGE_KEY) || "en";
}

export function applyLanguage(language) {
  if (typeof window === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.lang = language;
  window.localStorage.setItem(LANGUAGE_KEY, language);
  window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: language }));
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

export function useLanguagePreference() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    function syncLanguage(nextLanguage = resolveLanguage()) {
      setLanguage(nextLanguage);
      if (typeof window !== "undefined") {
        document.documentElement.lang = nextLanguage;
      }
    }

    function handleStorage(event) {
      if (event.key && event.key !== LANGUAGE_KEY) {
        return;
      }
      syncLanguage();
    }

    function handleLanguageEvent(event) {
      syncLanguage(event.detail || resolveLanguage());
    }

    syncLanguage();

    window.addEventListener("storage", handleStorage);
    window.addEventListener(LANGUAGE_EVENT, handleLanguageEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageEvent);
    };
  }, []);

  function updateLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  }

  return {
    language,
    setLanguage: updateLanguage,
  };
}
