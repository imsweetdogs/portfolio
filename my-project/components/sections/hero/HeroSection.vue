<!-- components/sections/hero/HeroSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBackground } from '~/composables/useBackground'
import type { HeroTranslations, HeroLinks, HeroMedia } from './types'

import HeroAmbientVideo from './modules/HeroAmbientVideo.vue'
import HeroAmbientControls from './modules/HeroAmbientControls.vue'
import HeroSticker from './modules/HeroSticker.vue'
import HeroBadge from './modules/HeroBadge.vue'
import HeroActions from './modules/HeroActions.vue'

defineProps<{
  i18n: HeroTranslations
  links?: HeroLinks
  media?: HeroMedia
}>()

const emit = defineEmits<{ (e: 'open-ticket'): void }>()

const { isBackgroundEnabled, toggleBackground, isAudioMuted, toggleAudio } = useBackground()
const isDesktop = ref(false)

onMounted(() => {
  isDesktop.value = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768
})
</script>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-[100dvh] pt-28 sm:pt-36 pb-12 text-center w-full max-w-full overflow-x-hidden">
    
    <!-- Фоновое эмбиент-видео -->
    <HeroAmbientVideo
      :is-enabled="isBackgroundEnabled"
      :is-audio-muted="isAudioMuted"
      :video-url="media?.videoUrl"
    />

    <!-- Контент первого экрана -->
    <div class="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-4 sm:px-8">
      
      <!-- Плашка Telegram и RSS -->
      <HeroBadge
        :tg-banner="i18n.tgBanner"
        :tg-link="links?.tg"
        :rss-link="links?.rss"
        :rss-title="i18n.rssTitle"
      />

      <!-- Заголовок -->
      <!-- components/sections/hero/HeroSection.vue -->

      <!-- Заголовок: жестко 3 строки по центру во всех языках -->
      <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium font-sans tracking-tight text-zinc-100 leading-[1.14] max-w-full break-words">
        <!-- 1 строка: приветствие + стикер -->
        {{ i18n.greeting }}
        
        <HeroSticker
          :sticker-url="media?.stickerUrl"
          :easter-sticker-url="media?.easterStickerUrl"
          :easter-egg-text="i18n.easterEggText"
        />

        <br />
        <!-- 2 строка: Full-stack строго по центру -->
        <span class="inline-block font-serif italic font-normal bg-gradient-to-r from-emerald-300 via-teal-100 to-white bg-clip-text text-transparent px-1">
          {{ i18n.rolePrefix }}
        </span> 

        <br />
        <!-- 3 строка: developer / разработчик -->
        <span>{{ i18n.roleSuffix }}</span>
      </h1>

      <!-- Описание со стилизованным текстом -->
      <p 
        class="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-mono max-w-2xl text-center"
        v-html="i18n.description"
      />

      <!-- Кнопки действий -->
      <HeroActions
        :buttons="i18n.buttons"
        :links="links"
        @open-ticket="emit('open-ticket')"
      />

      <!-- Пульт видео и звука -->
      <HeroAmbientControls
        v-if="isDesktop"
        :is-enabled="isBackgroundEnabled"
        :is-audio-muted="isAudioMuted"
        :labels="i18n.ambient"
        @toggle-ambient="toggleBackground"
        @toggle-audio="toggleAudio"
      />

    </div>
  </div>
</template>