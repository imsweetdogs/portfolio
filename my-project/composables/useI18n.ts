import type { LocaleItem, TranslationPayload } from '~/types/i18n'

export const useI18n = () => {
  const config = useRuntimeConfig()
  // На сервере Nuxt использует useRequestFetch, в браузере - $fetch
  const fetchClient = import.meta.server ? useRequestFetch() : $fetch
  const apiBase = config.public.apiBase || ''

  const locales = useState<LocaleItem[]>('i18n_locales', () => [])
  
  const localeCookie = useCookie<string>('locale', {
    maxAge: 60 * 60 * 24 * 365,
    path: '/'
  })

  const currentLocaleCode = useState<string>('i18n_current_code', () => 'ru')
  const translations = useState<TranslationPayload>('i18n_translations', () => ({}))
  const translationsCache = useState<Record<string, TranslationPayload>>('i18n_cache', () => ({}))
  const isPending = ref(false)

  const currentLocaleItem = computed(() => {
    return locales.value.find(l => l.code === currentLocaleCode.value) 
      || locales.value.find(l => l.isDefault) 
      || locales.value[0]
  })

  const currentLabel = computed(() => currentLocaleItem.value?.label || 'RU')
  const currentIntlLocale = computed(() => currentLocaleItem.value?.intl || 'ru')
  const availableLabels = computed(() => locales.value.map(l => l.label))

  const fetchTranslations = async (code: string) => {
    if (translationsCache.value[code]) {
      translations.value = translationsCache.value[code]
      return
    }

    try {
      isPending.value = true
      const data = await fetchClient<TranslationPayload>(`${apiBase}/api/v1/translations/${code}`)
      translationsCache.value[code] = data
      translations.value = data
    } catch (err) {
      console.error(`[i18n] Ошибка загрузки перевода для ${code}:`, err)
    } finally {
      isPending.value = false
    }
  }

  const setLocaleByCode = async (code: string) => {
    if (code === currentLocaleCode.value && Object.keys(translations.value).length > 0) return
    currentLocaleCode.value = code
    localeCookie.value = code
    await fetchTranslations(code)
  }

  const nextLocale = async () => {
    if (locales.value.length === 0) return
    const currentIndex = locales.value.findIndex(l => l.code === currentLocaleCode.value)
    const nextIndex = (currentIndex + 1) % locales.value.length
    const nextTarget = locales.value[nextIndex]
    await setLocaleByCode(nextTarget.code)
  }

  const initI18n = async () => {
    if (locales.value.length === 0) {
      try {
        const fetchedLocales = await fetchClient<LocaleItem[]>(`${apiBase}/api/v1/locales`)
        locales.value = fetchedLocales
      } catch (err) {
        console.error('[i18n] Ошибка загрузки списка языков:', err)
        locales.value = [{ code: 'ru', label: 'RU', intl: 'ru', isDefault: true }]
      }
    }

    const defaultLocale = locales.value.find(l => l.isDefault)?.code || 'ru'
    const savedCookie = localeCookie.value
    const initialCode = (savedCookie && locales.value.some(l => l.code === savedCookie))
      ? savedCookie
      : defaultLocale

    currentLocaleCode.value = initialCode
    localeCookie.value = initialCode
    await fetchTranslations(initialCode)
  }

  return {
    locales,
    currentLocaleCode,
    currentLocaleItem,
    currentLabel,
    currentIntlLocale,
    availableLabels,
    translations,
    isPending,
    nextLocale,
    setLocaleByCode,
    initI18n
  }
}