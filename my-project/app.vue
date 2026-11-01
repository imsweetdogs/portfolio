<!-- frontend/app.vue -->
<script setup lang="ts">
import Header from '~/components/common/header/Header.vue'
import Footer from '~/components/common/Footer.vue'
import ClickBurst from '~/components/common/effects/ClickBurst.vue'
import CursorParticles from '~/components/common/effects/CursorParticles.vue'
import CanvasSection from '~/components/common/CanvasSection.vue'

import HeroSection from '~/components/sections/hero/HeroSection.vue'
import ProjectsSection from '~/components/sections/projects/ProjectsSection.vue'
import SkillsSection from '~/components/sections/skills/SkillsSection.vue'
import AboutSection from '~/components/sections/about/AboutSection.vue'

import { useI18n } from '~/composables/useI18n'
import { useTexture } from '~/composables/useTexture'
import { useProjects } from '~/composables/useProjects'

const { isTextureEnabled, toggleTexture } = useTexture()
const { 
  initI18n, 
  currentLabel, 
  currentIntlLocale, 
  translations, 
  nextLocale 
} = useI18n()

const { fetchProjects } = useProjects()

// Серверный рендеринг: переводы + проекты
await useAsyncData('init-app', async () => {
  await Promise.all([
    initI18n(),
    fetchProjects(false)
  ])
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
  <div class="relative min-h-screen bg-[#080809] text-zinc-100 font-mono antialiased selection:bg-indigo-500/20 selection:text-indigo-300 overflow-x-hidden flex flex-col justify-between">
    
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

    <!-- Основной контент -->
    <main class="relative z-10 flex-grow">
      <!-- 1. HERO -->
      <CanvasSection pattern="grid" :fade-bottom="true" class="z-20">
        <div class="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[560px] overflow-hidden opacity-40 z-0">
          <div class="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />
          <div class="absolute top-20 right-1/4 h-80 w-80 rounded-full bg-sky-500/10 blur-[140px]" />
        </div>

        <HeroSection
          v-if="translations.hero"
          :i18n="translations.hero"
          :links="translations.links"
          :media="translations.media"
          @open-ticket="handleOpenTicket"
        />
      </CanvasSection>

      <!-- 2. ПРОЕКТЫ (внутри сам рулит канвасом с точками) -->
      <ProjectsSection
        v-if="translations.projects"
        :i18n="translations.projects"
      />

      <!-- 3. НАВЫКИ (внутри сам рулит канвасом с сеткой) -->
      <SkillsSection
        v-if="translations.skills"
        :i18n="translations.skills"
      />

      <AboutSection
        v-if="translations.about"
        :i18n="translations.about"
        :avatar-url="translations.media?.avatarUrl"
        :email="translations.links?.email"
        :tg-link="translations.links?.tg"
        :discord-link="translations.links?.discord"
        :github-link="translations.links?.github"
      />
    </main>

    <!-- 3. ФУТЕР -->
    <CanvasSection pattern="none" class="z-20">
      <Footer 
        :links="translations.links" 
        :i18n="translations.footer" 
      />
    </CanvasSection>

  </div>
</template>