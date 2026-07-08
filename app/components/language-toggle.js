"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/language-provider";

function LanguageIcon() {
  return (
    <svg
      className="top-navbar-language-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M12 3c2.15 2.42 3.25 5.42 3.25 9s-1.1 6.58-3.25 9" />
      <path d="M12 3c-2.15 2.42-3.25 5.42-3.25 9s1.1 6.58 3.25 9" />
    </svg>
  );
}

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
        <LanguageIcon />
        <span className="top-navbar-language-code" style={{ display: "none" }}>
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
