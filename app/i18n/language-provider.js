"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getLanguage,
  isSupportedLanguage,
  LANGUAGE_KEY,
  languages,
  translateText,
} from "./translations";

const LanguageContext = createContext({
  currentLanguage: languages[0],
  language: "english",
  languages,
  setLanguage: () => {},
});

const textOriginals = new WeakMap();
const attributeOriginals = new WeakMap();
const translatedAttributes = ["aria-label", "title", "alt", "placeholder"];
const skippedTags = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
  "INPUT",
  "SELECT",
  "OPTION",
  "CODE",
  "PRE",
]);

function shouldSkipNode(node) {
  const element =
    node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

  if (!element) {
    return true;
  }

  return Boolean(
    skippedTags.has(element.tagName) || element.closest("[data-no-translate]"),
  );
}

function translateTextNode(node, language) {
  if (shouldSkipNode(node) || !node.nodeValue?.trim()) {
    return;
  }

  if (!textOriginals.has(node)) {
    textOriginals.set(node, node.nodeValue);
  }

  const original = textOriginals.get(node);
  const translated = translateText(original, language);

  if (node.nodeValue !== translated) {
    node.nodeValue = translated;
  }
}

function getAttributeStore(element) {
  const existing = attributeOriginals.get(element);

  if (existing) {
    return existing;
  }

  const store = {};
  attributeOriginals.set(element, store);
  return store;
}

function translateElementAttributes(element, language) {
  if (shouldSkipNode(element)) {
    return;
  }

  const store = getAttributeStore(element);

  for (const attribute of translatedAttributes) {
    const value = element.getAttribute(attribute);

    if (!value?.trim()) {
      continue;
    }

    if (!store[attribute]) {
      store[attribute] = value;
    }

    const translated = translateText(store[attribute], language);

    if (value !== translated) {
      element.setAttribute(attribute, translated);
    }
  }
}

function translateTree(root, language) {
  if (!root || shouldSkipNode(root)) {
    return;
  }

  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, language);
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  translateElementAttributes(root, language);

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return shouldSkipNode(node)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (node.nodeType === Node.TEXT_NODE) {
      translateTextNode(node, language);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      translateElementAttributes(node, language);
    }
  }
}

function getStoredLanguage() {
  if (typeof window === "undefined") {
    return "english";
  }

  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  return isSupportedLanguage(stored) ? stored : "english";
}

function TranslationRuntime({ language }) {
  useEffect(() => {
    const root = document.body;
    const currentLanguage = getLanguage(language);
    document.documentElement.lang = currentLanguage.htmlLang;
    document.documentElement.dataset.language = language;
    window.localStorage.setItem(LANGUAGE_KEY, language);

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();

      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          textOriginals.set(mutation.target, mutation.target.nodeValue);
          translateTextNode(mutation.target, language);
          continue;
        }

        if (mutation.type === "attributes") {
          const store = getAttributeStore(mutation.target);
          const attribute = mutation.attributeName;

          if (attribute && translatedAttributes.includes(attribute)) {
            store[attribute] = mutation.target.getAttribute(attribute);
          }

          translateElementAttributes(mutation.target, language);
          continue;
        }

        for (const node of mutation.addedNodes) {
          translateTree(node, language);
        }
      }

      observer.observe(root, {
        attributes: true,
        attributeFilter: translatedAttributes,
        characterData: true,
        childList: true,
        subtree: true,
      });
    });

    translateTree(root, language);
    observer.observe(root, {
      attributes: true,
      attributeFilter: translatedAttributes,
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language]);

  return null;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("english");

  useEffect(() => {
    setLanguageState(getStoredLanguage());
  }, []);

  const setLanguage = useCallback((nextLanguage) => {
    if (!isSupportedLanguage(nextLanguage)) {
      return;
    }

    setLanguageState(nextLanguage);
  }, []);

  const value = useMemo(
    () => ({
      currentLanguage: getLanguage(language),
      language,
      languages,
      setLanguage,
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <TranslationRuntime language={language} />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
