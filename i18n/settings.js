export const fallbackLng = 'en'
export const languages = [
  'en',
  'zh-Hans',
  'zh-Hant',
  'de',
  'fr',
  'ar',
  'fa',
  'hi',
  'th'
]
export const defaultNS = 'common'

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

export const languageNames = {
  en: 'English',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
  de: 'Deutsch',
  fr: 'Français',
  ar: 'العربية',
  fa: 'فارسی',
  hi: 'हिन्दी',
  th: 'ไทย'
}