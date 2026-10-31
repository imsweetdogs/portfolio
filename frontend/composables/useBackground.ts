// composables/useBackground.ts

export const useBackground = () => {
  // Фон помнит состояние в куке на 1 год
  const isBackgroundEnabled = useCookie<boolean>('hero_bg_enabled', {
    default: () => true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/'
  })

  const isAudioMuted = useState<boolean>('hero_audio_muted', () => true)

  const toggleBackground = () => {
    isBackgroundEnabled.value = !isBackgroundEnabled.value
  }

  const toggleAudio = () => {
    isAudioMuted.value = !isAudioMuted.value
  }

  return {
    isBackgroundEnabled,
    toggleBackground,
    isAudioMuted,
    toggleAudio
  }
}