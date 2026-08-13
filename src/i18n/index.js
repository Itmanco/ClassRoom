import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import ja from "./locales/ja.json";

const STORAGE_KEY = "classroom-language";

const SUPPORTED_LOCALES = [
  "en",
  "ja",
];

const DEFAULT_LOCALE = "en";

function getBrowserLocale() {
  const browserLocale =
    navigator.language ||
    DEFAULT_LOCALE;

  return browserLocale
    .toLowerCase()
    .split("-")[0];
}

function getInitialLocale() {
  const savedLocale =
    localStorage.getItem(STORAGE_KEY);

  if (
    SUPPORTED_LOCALES.includes(savedLocale)
  ) {
    return savedLocale;
  }

  const browserLocale =
    getBrowserLocale();

  return SUPPORTED_LOCALES.includes(
    browserLocale,
  )
    ? browserLocale
    : DEFAULT_LOCALE;
}

const initialLocale = getInitialLocale();

const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: DEFAULT_LOCALE,

  messages: {
    en,
    ja,
  },
});

document.documentElement.lang =
  initialLocale;

export function setLocale(locale) {
  if (
    !SUPPORTED_LOCALES.includes(locale)
  ) {
    console.warn(
      `Unsupported locale: ${locale}`,
    );

    return;
  }

  i18n.global.locale.value = locale;

  localStorage.setItem(
    STORAGE_KEY,
    locale,
  );

  document.documentElement.lang =
    locale;
}

export default i18n;