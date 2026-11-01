<!-- components/sections/about/AboutSection.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import CanvasSection from '../../common/CanvasSection.vue'
import AboutSocials from './modules/AboutSocials.vue'

import ActivityWidget from './modules/widgets/ActivityWidget.vue'
import SpotifyWidget from './modules/widgets/SpotifyWidget.vue'
import SystemWidget from './modules/widgets/SystemWidget.vue'
import SteamWidget from './modules/widgets/SteamWidget.vue'

import type { AboutTranslations } from './types'
import { useLanyard } from '~/composables/useLanyard'

const props = withDefaults(defineProps<{
  i18n?: AboutTranslations
  avatarUrl?: string
  email?: string
  tgLink?: string
  discordLink?: string
  githubLink?: string
  discordId?: string
}>(), {
  email: 'offers@sweetdogs.ru',
  discordId: '490953886182670354'
})

// Достаем сокет Lanyard со Spotify и Кодингом
const { status: discordStatus, codingActivity, spotifyData } = useLanyard(props.discordId)

const statusBorderColor = computed(() => {
  switch (discordStatus.value) {
    case 'online': return 'border-emerald-500 shadow-emerald-950/50'
    case 'dnd': return 'border-rose-500 shadow-rose-950/50'
    case 'idle': return 'border-amber-500 shadow-amber-950/50'
    default: return 'border-zinc-700 shadow-black'
  }
})

const statusBgColor = computed(() => {
  switch (discordStatus.value) {
    case 'online': return 'bg-emerald-500'
    case 'dnd': return 'bg-rose-500'
    case 'idle': return 'bg-amber-500'
    default: return 'bg-zinc-600'
  }
})

const resolvedAvatarUrl = computed(() => {
  if (props.avatarUrl) return props.avatarUrl
  if (props.githubLink) {
    const username = props.githubLink.replace(/\/$/, '').split('/').pop()
    if (username) return `https://github.com/${username}.png`
  }
  return 'https://github.com/sweetdogs.png'
})
</script>

<template>
  <div id="about" class="w-full">
    
    <!-- Шапка блока -->
    <CanvasSection pattern="none" class="pt-8 pb-3">
      <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col gap-4">
        
        <div class="flex items-center gap-4">
          <div class="relative flex-shrink-0">
            <img
              :src="resolvedAvatarUrl"
              alt="Avatar"
              loading="lazy"
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 object-cover bg-zinc-900 shadow-lg select-none"
              :class="statusBorderColor"
            />
            <span
              class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#080809]"
              :class="[statusBgColor, discordStatus !== 'offline' ? 'animate-pulse' : '']"
            />
          </div>

          <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 font-sans">
            {{ i18n?.title || 'Немного обо' }} 
            <span class="font-serif italic font-normal text-rose-200/90">{{ i18n?.titleAccent || 'мне' }}</span>.
          </h2>
        </div>

        <p class="font-mono text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {{ i18n?.description || 'Разработчик, энтузиаст NixOS и Rust.' }}
        </p>

        <AboutSocials
          :email="email"
          :tg-link="tgLink"
          :discord-link="discordLink"
          :github-link="githubLink"
        />

      </div>
    </CanvasSection>

    <!-- Сетка виджетов на Canvas dots -->
    <CanvasSection pattern="dots" :fade-top="true" :fade-bottom="true" class="pt-10 pb-20">
      <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <!-- 1. Кодинг (живой Lanyard) -->
          <ActivityWidget
            :labels="i18n?.coding || { title: 'Сейчас работаю', idle: 'Не активен', idleSub: 'Отдыхает от кода', lastActivity: 'Активность' }"
            :activity="codingActivity"
          />

          <!-- 2. Spotify (живой Lanyard) -->
          <SpotifyWidget
            :labels="i18n?.spotify || { title: 'Сейчас слушаю', idle: 'Сейчас ничего не играет', idleSub: 'Тут мог быть классный исполнитель' }"
            :spotify="spotifyData"
          />

          <!-- 3. NixOS (1679 packages, river) -->
          <SystemWidget 
            :labels="i18n?.system || { title: 'Окружение', os: 'NixOS (unstable)', wm: 'river / Wayland', uptime: 'Uptime', packages: 'packages' }" 
          />

          <!-- 4. Steam (Высокие постеры) -->
          <div class="col-span-1 md:col-span-2 lg:col-span-3">
            <SteamWidget 
              :labels="i18n?.steam || { title: 'Steam', online: 'В сети', level: 'Уровень', topGames: 'Любимые игры', achievements: 'достижений' }" 
            />
          </div>

        </div>

      </div>
    </CanvasSection>

  </div>
</template>