import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./en/translation.json";
import knTranslation from "./kn/translation.json";
import hiTranslation from "./hi/translation.json";

const LANGUAGE_STORAGE_KEY = "benaka_language";

const savedLanguage =
  typeof window !== "undefined"
    ? (localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? "en")
    : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    kn: { translation: knTranslation },
    hi: { translation: hiTranslation },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false,
  },
});

// Persist language changes to localStorage
i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  } catch {
    // ignore storage errors
  }
});

export { LANGUAGE_STORAGE_KEY };
export default i18n;
