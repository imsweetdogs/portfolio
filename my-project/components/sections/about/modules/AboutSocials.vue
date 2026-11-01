<!-- frontend/components/sections/about/modules/AboutSocials.vue -->
<script setup lang="ts">
defineProps<{
  email: string
  tgLink?: string
  discordLink?: string
  githubLink?: string
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 pt-2">
    <!-- Почта -->
    <a
      :href="`mailto:${email}`"
      class="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-2 font-mono text-xs text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-700 hover:text-white hover:bg-zinc-900/60 active:scale-95 shadow-sm"
    >
      <Icon name="lucide:mail" class="w-3.5 h-3.5 text-zinc-400" />
      <span>{{ email }}</span>
    </a>

    <!-- Telegram -->
    <a
      v-if="tgLink"
      :href="tgLink"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-2 font-mono text-xs text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-700 hover:text-white hover:bg-zinc-900/60 active:scale-95 shadow-sm"
    >
      <Icon name="lucide:send" class="w-3.5 h-3.5 text-sky-400" />
      <span>Telegram</span>
    </a>

    <!-- Discord -->
    <a
      v-if="discordLink"
      :href="discordLink"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-2 font-mono text-xs text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-700 hover:text-white hover:bg-zinc-900/60 active:scale-95 shadow-sm"
    >
      <Icon name="simple-icons:discord" class="w-3.5 h-3.5 text-indigo-400" />
      <span>Discord</span>
    </a>

    <!-- GitHub -->
    <a
      v-if="githubLink"
      :href="githubLink"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-4 py-2 font-mono text-xs text-zinc-300 backdrop-blur-md transition-all hover:border-zinc-700 hover:text-white hover:bg-zinc-900/60 active:scale-95 shadow-sm"
    >
      <Icon name="lucide:github" class="w-3.5 h-3.5 text-zinc-300" />
      <span>GitHub</span>
    </a>
  </div>
</template>