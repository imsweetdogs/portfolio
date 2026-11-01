<!-- components/sections/about/modules/widgets/ActivityWidget.vue -->
<script setup lang="ts">
import type { LanyardActivity } from '~/composables/useLanyard'
import type { AboutTranslations } from '../../types'

defineProps<{
  labels: AboutTranslations['coding']
  activity: LanyardActivity | null
}>()
</script>

<template>
  <div class="flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-5 backdrop-blur-md transition-all hover:border-zinc-700 select-none shadow-lg">
    <!-- Шапка -->
    <div class="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-3">
      <Icon name="lucide:code-2" class="w-4 h-4 text-indigo-400" />
      <span>{{ labels.title }}</span>
      <span v-if="activity" class="ml-auto text-[10px] text-indigo-400/80 bg-indigo-950/50 border border-indigo-800/40 px-2 py-0.5 rounded-full">
        LIVE
      </span>
    </div>

    <!-- Инфо активности -->
    <div class="flex items-center gap-3.5 mb-3">
      <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-indigo-400">
        <Icon name="lucide:terminal" class="w-6 h-6" />
      </div>

      <!-- Если кодишь прямо сейчас -->
      <div v-if="activity" class="flex flex-col gap-0.5 overflow-hidden">
        <span class="font-sans font-semibold text-sm sm:text-base text-zinc-100 truncate">
          {{ activity.details || activity.name }}
        </span>
        <span class="font-mono text-xs text-zinc-400 truncate">
          {{ activity.state || labels.idleSub }}
        </span>
      </div>

      <!-- Если редактор закрыт / не активен -->
      <div v-else class="flex flex-col gap-0.5 overflow-hidden">
        <span class="font-sans font-semibold text-sm sm:text-base text-zinc-100 truncate">
          {{ labels.idle }}
        </span>
        <span class="font-mono text-xs text-zinc-500 truncate">
          {{ labels.idleSub }}
        </span>
      </div>
    </div>

    <!-- Нижняя плашка -->
    <div class="pt-2 border-t border-zinc-800/60 font-mono text-[11px] text-zinc-500 truncate flex items-center justify-between">
      <span v-if="activity">
        В {{ activity.name }}
      </span>
      <span v-else>
        {{ labels.lastActivity }} недавно
      </span>

      <span v-if="activity" class="text-indigo-400/80">
        {{ activity.assets?.small_text || '' }}
      </span>
    </div>
  </div>
</template>