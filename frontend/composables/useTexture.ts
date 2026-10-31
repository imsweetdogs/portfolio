// frontend/composables/useTexture.ts
export const useTexture = () => {
  // Нативная кука Nuxt: по умолчанию false, сохраняется на 1 год
  const isTextureEnabled = useCookie<boolean>('site-texture-enabled', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 365,
    path: '/'
  })

  const toggleTexture = () => {
    isTextureEnabled.value = !isTextureEnabled.value
  }

  return { 
    isTextureEnabled, 
    toggleTexture 
  }
}