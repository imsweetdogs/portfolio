<!-- components/sections/hero/modules/HeroAmbientVideo.vue -->
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  videoUrl?: string
  isEnabled: boolean
  isAudioMuted: boolean
}>(), {
  videoUrl: '/background.mp4'
})

const videoRef = ref<HTMLVideoElement | null>(null)
const isDesktop = ref(false)

const startVideo = async () => {
  if (!videoRef.value || !props.isEnabled) return
  
  videoRef.value.muted = props.isAudioMuted
  videoRef.value.volume = 0.07

  try {
    await videoRef.value.play()
  } catch {
    if (videoRef.value) {
      videoRef.value.muted = true
      await videoRef.value.play().catch(() => {})
    }
  }
}

onMounted(async () => {
  isDesktop.value = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768
  
  if (isDesktop.value) {
    await nextTick()
    await startVideo()
  }
})

watch(() => props.isEnabled, async (enabled) => {
  if (!videoRef.value) return
  if (enabled) {
    await startVideo()
  } else {
    videoRef.value.pause()
  }
})

watch(() => props.isAudioMuted, (muted) => {
  if (videoRef.value) videoRef.value.muted = muted
})
</script>

<template>
  <ClientOnly>
    <!-- isolation-auto + transform-gpu изолируют видеопоток от канвасов и сетки -->
    <div 
      v-if="isDesktop" 
      class="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none w-full h-full transition-opacity duration-700 ease-in-out transform-gpu [isolation:isolate]"
      :class="isEnabled ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Чистый тег видео без программных CSS-фильтров -->
      <video
        ref="videoRef"
        :src="videoUrl"
        loop
        playsinline
        muted
        preload="auto"
        class="absolute inset-0 w-full h-full object-cover opacity-20 scale-105 will-change-transform"
      />
      
      <!-- Матовая подложка с нативной альфа-прозрачностью БЕЗ mix-blend-multiply -->
      <div class="absolute inset-0 bg-[#080809]/80" />
      <!-- Мягкая виньетка сверху и снизу -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#080809] via-transparent to-[#080809]" />
    </div>
  </ClientOnly>
</template>