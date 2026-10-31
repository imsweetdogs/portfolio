<!-- components/sections/hero/modules/HeroSticker.vue -->
<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  stickerUrl?: string
  easterStickerUrl?: string
  easterEggText?: string
}>(), {
  stickerUrl: '/sticker.webm',
  easterStickerUrl: '/sticker2.webm',
  easterEggText: 'пасхалка найдена!'
})

const clicks = ref(0)
const isEasterEgg = ref(false)
const easterVideoRef = ref<HTMLVideoElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null

const handleClick = () => {
  clicks.value++
  if (clicks.value % 10 === 0) {
    isEasterEgg.value = true

    if (easterVideoRef.value) {
      easterVideoRef.value.currentTime = 0
      easterVideoRef.value.play().catch(() => {})
    }

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { 
      isEasterEgg.value = false 
      if (easterVideoRef.value) {
        easterVideoRef.value.pause()
      }
    }, 1500)
  }
}
</script>

<template>
  <span class="relative inline-flex items-center align-middle mx-2 sm:mx-4 -translate-y-1 sm:-translate-y-2">
    <!-- Бейдж пасхалки -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="scale-75 opacity-0 -translate-y-2"
      enter-to-class="scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
    >
      <div 
        v-if="isEasterEgg" 
        class="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 z-30"
      >
        <span class="block whitespace-nowrap rounded-md bg-rose-600 px-2.5 py-0.5 font-mono text-[11px] sm:text-xs font-bold text-white shadow-2xl shadow-rose-950 animate-bounce uppercase tracking-wider">
          {{ easterEggText }}
        </span>
      </div>
    </Transition>

    <div
      @click="handleClick"
      class="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer overflow-hidden bg-zinc-900/60 border border-white/10"
      :class="{ 'ring-4 ring-rose-500/80 scale-110': isEasterEgg }"
    >
      <!-- Дефолтный стикер -->
      <video
        v-if="stickerUrl"
        :src="stickerUrl"
        autoplay
        loop
        muted
        playsinline
        class="absolute inset-0 w-full h-full object-cover"
        :class="isEasterEgg ? 'opacity-0' : 'opacity-100'"
      />

      <!-- Пасхальный стикер -->
      <video
        v-if="easterStickerUrl"
        ref="easterVideoRef"
        :src="easterStickerUrl"
        muted
        playsinline
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover"
        :class="isEasterEgg ? 'opacity-100' : 'opacity-0'"
      />
    </div>
  </span>
</template>