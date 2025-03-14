import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json"
import de from "./locales/de.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: "en", // Default language
    interpolation: { escapeValue: false },
    detection: { order: ["navigator"] }, // Detect browser language
  });

export default i18n;
