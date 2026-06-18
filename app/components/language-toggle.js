"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/language-provider";

export default function LanguageToggle() {
  const { language, languages, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const currentLanguage =
    languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSelect(nextLanguage) {
    setLanguage(nextLanguage);
    setOpen(false);
  }

  return (
    <div className="top-navbar-language-toggle" data-no-translate ref={menuRef}>
      <span className="top-navbar-language-caption" id="language-menu-label">
        Language
      </span>
      <button
        type="button"
        className="top-navbar-language-button"
        aria-labelledby="language-menu-label"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="top-navbar-language-code">
          {currentLanguage.shortLabel}
        </span>
        <span className="top-navbar-language-name">
          {currentLanguage.label}
        </span>
      </button>
      <div
        className="top-navbar-language-menu"
        role="listbox"
        aria-label="Select website language"
        hidden={!open}
      >
        {languages.map((item) => (
          <button
            type="button"
            key={item.code}
            className={`top-navbar-language-option${
              item.code === language ? " is-active" : ""
            }`}
            role="option"
            aria-selected={item.code === language}
            onClick={() => handleSelect(item.code)}
          >
            <span>{item.shortLabel}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
