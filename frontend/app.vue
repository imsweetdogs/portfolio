<script setup lang="ts">
import Header from '~/components/common/header/Header.vue'
import ClickBurst from '~/components/common/effects/ClickBurst.vue'
import CursorParticles from '~/components/common/effects/CursorParticles.vue'
import CanvasSection from '~/components/common/CanvasSection.vue'

import { useI18n } from '~/composables/useI18n'
import { useTexture } from '~/composables/useTexture'

const { isTextureEnabled, toggleTexture } = useTexture()
const { 
  initI18n, 
  currentLabel, 
  currentIntlLocale, 
  translations, 
  nextLocale 
} = useI18n()

await useAsyncData('init-app', async () => {
  await initI18n()
  return true
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => translations.value.media?.faviconUrl || '')
    }
  ]
})

const handleOpenTicket = () => {
  console.log('[App] Запрос на открытие тикета/чата')
}
</script>

<template>
  <div class="relative min-h-screen bg-[#080809] text-zinc-100 font-mono antialiased selection:bg-indigo-500/20 selection:text-indigo-300 overflow-x-hidden">
    
    <!-- Эффекты мыши -->
    <CursorParticles />
    <ClickBurst :stickers="translations.media?.stickers" />

    <!-- Текстура шума -->
    <div 
      v-if="isTextureEnabled" 
      class="pointer-events-none fixed inset-0 z-30 opacity-[0.035] bg-noise" 
    />

    <!-- Хедер -->
    <Header
      :logo-url="translations.media?.faviconUrl"
      brand-name="sweetdogs"
      :profile="translations.data"
      :translations="translations.header"
      :current-label="currentLabel"
      :locale="currentIntlLocale"
      :is-texture-enabled="isTextureEnabled"
      @change-lang="nextLocale"
      @toggle-texture="toggleTexture"
      @open-ticket="handleOpenTicket"
    />

  </div>
</template>