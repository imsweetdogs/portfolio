<!-- components/sections/about/modules/widgets/SpotifyWidget.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { LanyardSpotify } from '~/composables/useLanyard'
import type { AboutTranslations } from '../../types'

const props = defineProps<{
  labels: AboutTranslations['spotify']
  spotify: LanyardSpotify | null
}>()

const now = ref(Date.now())
let timer: any = null

onMounted(() => {
  timer = setInterval(() => { now.value = Date.now() }, 1000)
})

onUnmounted(() => clearInterval(timer))

// Расчет времени трека
const formatTime = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const currentTime = computed(() => {
  if (!props.spotify?.timestamps) return '0:00'
  return formatTime(now.value - props.spotify.timestamps.start)
})

const durationTime = computed(() => {
  if (!props.spotify?.timestamps) return '0:00'
  return formatTime(props.spotify.timestamps.end - props.spotify.timestamps.start)
})

const progressPercent = computed(() => {
  if (!props.spotify?.timestamps) return 0
  const { start, end } = props.spotify.timestamps
  const total = end - start
  const current = now.value - start
  return Math.min(100, Math.max(0, (current / total) * 100))
})
</script>

<template>
  <div class="flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-5 backdrop-blur-md transition-all hover:border-zinc-700 select-none shadow-lg">
    <!-- Шапка -->
    <div class="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-3">
      <Icon name="simple-icons:spotify" class="w-4 h-4 text-[#1DB954]" />
      <span>{{ labels.title }}</span>
      <span v-if="spotify" class="ml-auto text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full animate-pulse">
        PLAYING
      </span>
    </div>

    <!-- Контент -->
    <div class="flex items-center gap-3.5 mb-3">
      <!-- Обложка альбома (или заглушка) -->
      <a 
        v-if="spotify" 
        :href="`https://open.spotify.com/track/${spotify.track_id}`" 
        target="_blank" 
        class="relative h-14 w-14 flex-shrink-0 rounded-2xl overflow-hidden border border-zinc-700/60 shadow-md group"
      >
        <img 
          :src="spotify.album_art_url" 
          :alt="spotify.song"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform" 
        />
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Icon name="lucide:external-link" class="w-4 h-4 text-white" />
        </div>
      </a>

      <div v-else class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-zinc-600">
        <Icon name="lucide:disc" class="w-6 h-6 animate-spin [animation-duration:8s]" />
      </div>

      <!-- Текст -->
      <div v-if="spotify" class="flex flex-col gap-0.5 overflow-hidden">
        <a 
          :href="`https://open.spotify.com/track/${spotify.track_id}`" 
          target="_blank"
          class="font-sans font-semibold text-sm sm:text-base text-zinc-100 truncate hover:text-[#1DB954] transition-colors"
        >
          {{ spotify.song }}
        </a>
        <span class="font-mono text-xs text-zinc-400 truncate">
          {{ spotify.artist }}
        </span>
      </div>

      <div v-else class="flex flex-col gap-0.5 overflow-hidden">
        <span class="font-sans font-semibold text-sm sm:text-base text-zinc-100 truncate">
          {{ labels.idle }}
        </span>
        <span class="font-mono text-xs text-zinc-500 truncate">
          {{ labels.idleSub }}
        </span>
      </div>
    </div>

    <!-- Прогресс-бар -->
    <div class="pt-2 border-t border-zinc-800/60 flex flex-col gap-1.5 font-mono text-[11px] text-zinc-500">
      <div class="relative h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div 
          class="h-full bg-[#1DB954] rounded-full transition-all duration-300"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
      <div class="flex items-center justify-between">
        <span>{{ currentTime }}</span>
        <span>{{ durationTime }}</span>
      </div>
    </div>
  </div>
</template>