<!-- components/sections/hero/modules/HeroBadge.vue -->
<script setup lang="ts">
defineProps<{
  tgBanner: string
  tgLink?: string
  rssLink?: string
  rssTitle?: string
}>()
</script>

<template>
  <div class="mb-8 flex items-center gap-3">
    <a
      v-if="tgLink"
      :href="tgLink"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex items-center gap-2.5 rounded-full border border-dashed border-sky-500/40 bg-sky-950/20 px-5 py-2 font-mono text-xs sm:text-sm text-sky-300/90 backdrop-blur-md transition-all hover:border-sky-400/80 hover:text-sky-200 hover:bg-sky-950/40 shadow-lg shadow-black/40"
    >
      <Icon name="lucide:send" class="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
      <span>{{ tgBanner }}</span>
    </a>

    <a
      v-if="rssLink"
      :href="rssLink"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-rose-500/40 bg-rose-950/20 text-rose-400 backdrop-blur-md transition-all hover:border-rose-400/80 hover:text-rose-200 hover:bg-rose-950/40 shadow-lg shadow-black/40 active:scale-95"
      :title="rssTitle || 'RSS / Blog'"
    >
      <Icon name="lucide:rss" class="w-4 h-4" />
    </a>
  </div>
</template>