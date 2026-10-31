export const useBackground = () => {
  const isBackgroundEnabled = useState<boolean>('hero_bg_enabled', () => true)
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