<!-- components/sections/about/modules/widgets/SteamWidget.vue -->
<script setup lang="ts">
import type { AboutTranslations } from '../../types'

withDefaults(defineProps<{
  labels?: AboutTranslations['steam']
  steamProfileUrl?: string
}>(), {
  steamProfileUrl: 'https://steamcommunity.com/id/sweetdogs'
})

const favoriteGames = [
  {
    name: 'Barotrauma',
    appId: 602960,
    url: 'https://store.steampowered.com/app/602960/Barotrauma/',
    banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/602960/library_600x900.jpg'
  },
  {
    name: 'Oxygen Not Included',
    appId: 457140,
    url: 'https://store.steampowered.com/app/457140/Oxygen_Not_Included/',
    banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/457140/library_600x900.jpg'
  },
  {
    name: 'Noita',
    appId: 881100,
    url: 'https://store.steampowered.com/app/881100/Noita/',
    banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/881100/library_600x900.jpg'
  }
]
</script>

<template>
  <div class="flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-6 backdrop-blur-md transition-all hover:border-zinc-700 select-none shadow-xl gap-6 w-full">
    
    <!-- Шапка профиля Steam -->
    <div class="flex items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
      <div class="flex items-center gap-3.5">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 text-sky-400 shadow-md">
          <Icon name="simple-icons:steam" class="w-5 h-5" />
        </div>

        <div class="flex flex-col">
          <!-- Просто Steam без слова Showcase и без стрелки -->
          <a 
            :href="steamProfileUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="font-sans font-bold text-base text-zinc-100 hover:text-sky-300 transition-colors"
          >
            Steam
          </a>
          <span class="font-mono text-xs text-zinc-500">@sweetdogs</span>
        </div>
      </div>

      <!-- Уровень профиля: 20 -->
      <div class="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-3.5 py-1.5 font-mono text-xs text-zinc-300 shadow-inner">
        <Icon name="lucide:award" class="w-4 h-4 text-amber-400" />
        <span>{{ labels?.level || 'Уровень профиля' }}: <strong class="text-white font-bold">20</strong></span>
      </div>
    </div>

    <!-- Витрина любимых игр -->
    <div class="flex flex-col gap-3.5 w-full">
      <span class="font-mono text-xs text-zinc-500 uppercase tracking-wider">
        {{ labels?.topGames || 'Любимые игры' }}
      </span>

      <!-- 3 колонки высотой 380px с выравниванием по верхнему краю -->
      <div 
        class="w-full gap-4"
        style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));"
      >
        <a
          v-for="game in favoriteGames"
          :key="game.appId"
          :href="game.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-lg transition-all duration-300 hover:border-zinc-500 hover:-translate-y-1.5 select-none flex flex-col justify-end"
          style="height: 380px; min-height: 380px;"
        >
          <!-- Картинка с выравниванием по верху, чтобы вошло всё название Barotrauma -->
          <img
            :src="game.banner"
            :alt="game.name"
            loading="lazy"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style="object-position: center top;"
          />

          <!-- Градиент снизу вверх -->
          <div 
            class="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-90 group-hover:opacity-75"
            style="background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%);"
          />

          <!-- Название игры поверх градиента внизу -->
          <div class="relative z-10 p-4 flex items-center justify-between font-mono">
            <span class="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors truncate">
              {{ game.name }}
            </span>
            <Icon 
              name="lucide:arrow-up-right" 
              class="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors flex-shrink-0 ml-1.5 opacity-60 group-hover:opacity-100" 
            />
          </div>
        </a>
      </div>
    </div>

  </div>
</template>