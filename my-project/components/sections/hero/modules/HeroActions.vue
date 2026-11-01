<!-- frontend/components/sections/hero/modules/HeroActions.vue -->
<script setup lang="ts">
import type { HeroTranslations, HeroLinks } from '../types'

defineProps<{
  buttons: HeroTranslations['buttons']
  links?: HeroLinks
}>()

const emit = defineEmits<{ (e: 'open-ticket'): void }>()
</script>

<template>
  <div class="mt-10 flex flex-wrap items-center justify-center gap-4 font-mono text-sm">
    <a
      :href="links?.projectsAnchor || '#projects'"
      class="flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-950/60 px-6 py-3 text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-600 hover:text-white hover:bg-zinc-900 active:scale-95 shadow-lg shadow-black/40"
    >
      <Icon name="lucide:arrow-down" class="w-4 h-4 text-zinc-500" />
      <span>{{ buttons.works }}</span>
    </a>

    <a
      v-if="links?.github"
      :href="links.github"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-950/60 px-6 py-3 text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-600 hover:text-white hover:bg-zinc-900 active:scale-95 shadow-lg shadow-black/40"
    >
      <Icon name="lucide:github" class="w-4 h-4 text-zinc-500" />
      <span>{{ buttons.github }}</span>
    </a>

    <button
      type="button"
      @click="emit('open-ticket')"
      class="flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-950/60 px-6 py-3 text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-600 hover:text-white hover:bg-zinc-900 active:scale-95 shadow-lg shadow-black/40"
    >
      <Icon name="lucide:send" class="w-4 h-4 text-zinc-500" />
      <span>{{ buttons.contact }}</span>
    </button>
  </div>
</template>