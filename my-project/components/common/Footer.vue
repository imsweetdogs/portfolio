<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  links?: Record<string, any>
  i18n?: Record<string, any>
}>()

const socials = computed(() => [
  { name: 'GitHub', url: props.links?.github },
  { name: 'Telegram', url: props.links?.tg },
  { name: 'Discord', url: props.links?.discord },
  { name: 'Steam', url: props.links?.steam }
].filter(s => Boolean(s.url)))
</script>

<template>
  <footer class="w-full max-w-4xl mx-auto px-6 pt-6 pb-14 flex flex-col items-center justify-center text-center gap-6 font-mono">
    
    <!-- Соцсети -->
    <div class="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-zinc-400">
      <a
        v-for="(link, idx) in socials"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-zinc-200 transition-colors"
      >
        {{ link.name }}
        <span v-if="idx < socials.length - 1" class="ml-4 text-zinc-800">•</span>
      </a>
    </div>

    <!-- Диагноз F07 -->
    <div v-if="i18n" class="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-600">
      <span>
        {{ i18n.certified }} 
        <span class="text-zinc-700">{{ i18n.certifiedSub }}</span>
      </span>
    </div>

  </footer>
</template>