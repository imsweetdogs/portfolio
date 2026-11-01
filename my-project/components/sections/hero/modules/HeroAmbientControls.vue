<!-- frontend/components/sections/hero/modules/HeroAmbientControls.vue -->
<script setup lang="ts">
import type { HeroTranslations } from '../types'

defineProps<{
  isEnabled: boolean
  isAudioMuted: boolean
  labels: HeroTranslations['ambient']
}>()

const emit = defineEmits<{
  (e: 'toggle-ambient'): void
  (e: 'toggle-audio'): void
}>()
</script>

<template>
  <div class="mt-8 flex items-center gap-3 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-4 py-2 backdrop-blur-md font-mono text-xs text-zinc-400 shadow-md">
    <button
      type="button"
      @click="emit('toggle-ambient')"
      class="flex items-center gap-1.5 hover:text-white transition-colors"
    >
      <Icon :name="isEnabled ? 'lucide:film' : 'lucide:video-off'" class="w-3.5 h-3.5 text-indigo-400" />
      <span>{{ isEnabled ? labels.ambientOn : labels.ambientOff }}</span>
    </button>

    <template v-if="isEnabled">
      <span class="text-zinc-700">|</span>
      <button
        type="button"
        @click="emit('toggle-audio')"
        class="flex items-center gap-1.5 hover:text-white transition-colors"
      >
        <Icon :name="!isAudioMuted ? 'lucide:volume-2' : 'lucide:volume-x'" class="w-3.5 h-3.5 text-emerald-400" />
        <span>{{ !isAudioMuted ? labels.soundOn : labels.soundMuted }}</span>
      </button>
    </template>
  </div>
</template>