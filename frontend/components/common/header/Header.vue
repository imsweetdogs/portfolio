<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { HeaderTranslations, HeaderProfileData } from './types'

import GlassPill from './modules/GlassPill.vue'
import HeaderLogo from './modules/HeaderLogo.vue'
import HeaderNav from './modules/HeaderNav.vue'
import HeaderActionBtn from './modules/HeaderActionBtn.vue'
import HeaderClock from './modules/HeaderClock.vue'
import HeaderAgeTicker from './modules/HeaderAgeTicker.vue'
import HeaderLangBtn from './modules/HeaderLangBtn.vue'
import HeaderTextureBtn from './modules/HeaderTextureBtn.vue'
import HeaderMenuBtn from './modules/HeaderMenuBtn.vue'
import MobileDrawer from './MobileDrawer.vue'

const props = withDefaults(defineProps<{
  logoUrl?: string
  brandName?: string
  brandDomain?: string
  profile?: HeaderProfileData
  translations?: HeaderTranslations
  currentLabel?: string
  locale?: string
  isTextureEnabled?: boolean
  showAge?: boolean
  showAction?: boolean
  showTexture?: boolean
}>(), {
  logoUrl: '/logo.svg',
  brandName: 'sweetdogs',
  brandDomain: undefined,
  currentLabel: 'RU',
  locale: 'ru',
  isTextureEnabled: true,
  showAge: true,
  showAction: true,
  showTexture: true,
  profile: () => ({
    birthDate: '2005-09-16T00:00:00Z',
    timezone: 'Europe/Moscow',
    timezoneIdentifier: 'MSK'
  }),
  translations: () => ({
    menu: 'Меню',
    close: 'Закрыть',
    action: 'Связаться',
    textureTitle: 'Переключить текстуру шума',
    nav: []
  })
})

const emit = defineEmits<{
  (e: 'open-ticket'): void
  (e: 'change-lang'): void
  (e: 'toggle-texture'): void
}>()

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Мобильная шторка -->
    <MobileDrawer
      :is-open="isMenuOpen"
      :logo-url="logoUrl"
      :brand-name="brandName"
      :brand-domain="brandDomain"
      :nav-items="translations?.nav || []"
      :action-label="translations?.action || 'Связаться'"
      :close-label="translations?.close || 'Закрыть'"
      :show-action="showAction"
      :timezone="profile?.timezone"
      :timezone-identifier="profile?.timezoneIdentifier"
      :birth-date="profile?.birthDate"
      :show-age="showAge"
      :current-label="currentLabel"
      :locale="locale"
      @close="isMenuOpen = false"
      @open-ticket="emit('open-ticket')"
      @change-lang="emit('change-lang')"
    />

    <!-- Десктоп-хедер -->
    <header class="fixed top-6 inset-x-0 z-40 w-full px-6 sm:px-12 lg:px-20 pointer-events-none">
      <div class="hidden md:flex items-center justify-between w-full">
        
        <!-- ЛЕВАЯ КАПСУЛА -->
        <div class="flex items-center">
          <div 
            class="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            :class="isScrolled ? 'max-w-0 opacity-0 -translate-x-8 mr-0 pointer-events-none' : 'max-w-[220px] opacity-100 translate-x-0 mr-6 pointer-events-auto'"
          >
            <slot name="logo">
              <HeaderLogo :logo-url="logoUrl" :brand-name="brandName" :brand-domain="brandDomain" />
            </slot>
          </div>

          <GlassPill :is-scrolled="isScrolled" shift="left" class="pointer-events-auto flex items-center gap-6">
            <slot name="nav">
              <HeaderNav :items="translations?.nav || []" />
            </slot>
            
            <template v-if="showAction">
              <span class="text-zinc-700 -mx-2">|</span>
              <slot name="action">
                <HeaderActionBtn :label="translations?.action || 'Связаться'" @click="emit('open-ticket')" />
              </slot>
            </template>
          </GlassPill>
        </div>

        <!-- ПРАВАЯ КАПСУЛА -->
        <GlassPill :is-scrolled="isScrolled" shift="right" class="pointer-events-auto flex items-center">
          <slot name="widgets">
            <template v-if="showAge && profile?.birthDate">
              <HeaderAgeTicker :birth-date="profile.birthDate" />
              <span class="text-zinc-700 ml-3 mr-3">|</span>
            </template>

            <!-- Часы и дата -->
            <HeaderClock 
              :timezone="profile?.timezone" 
              :timezone-label="profile?.timezoneIdentifier" 
              :locale="locale" 
            />
            
            <!-- Кнопка смены языка -->
            <span class="text-zinc-700 ml-3 mr-3">|</span>
            <HeaderLangBtn 
              :label="currentLabel" 
              @click="emit('change-lang')" 
            />

            <!-- Переключатель текстуры шума -->
            <template v-if="showTexture">
              <span class="text-zinc-700 ml-3 mr-3">|</span>
              <HeaderTextureBtn 
                :title="translations?.textureTitle || 'Шум'" 
                :enabled="isTextureEnabled"
                @click="emit('toggle-texture')"
              />
            </template>
          </slot>
        </GlassPill>
      </div>

      <!-- МОБИЛЬНЫЙ БАР -->
      <div class="flex md:hidden items-center justify-between w-full">
        <HeaderMenuBtn
          :is-scrolled="isScrolled"
          :label="translations?.menu || 'Меню'"
          class="pointer-events-auto"
          @click="isMenuOpen = true"
        />

        <HeaderLogo
          size="sm"
          :logo-url="logoUrl"
          :brand-name="brandName"
          :brand-domain="brandDomain"
          class="pointer-events-auto"
        />

        <div 
          class="pointer-events-auto flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="isScrolled 
            ? 'rounded-full border border-white/10 bg-zinc-950/35 px-3 py-2.5 backdrop-blur-sm shadow-lg gap-2' 
            : 'border border-transparent px-2 py-1 gap-2'"
        >
          <HeaderLangBtn 
            size="sm" 
            :label="currentLabel" 
            @click="emit('change-lang')" 
          />

          <template v-if="showTexture">
            <span class="text-zinc-700 text-xs">|</span>
            <HeaderTextureBtn 
              :title="translations?.textureTitle || 'Шум'" 
              :enabled="isTextureEnabled"
              @click="emit('toggle-texture')"
            />
          </template>
        </div>
      </div>
    </header>
  </div>
</template>