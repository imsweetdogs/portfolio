<!-- frontend/components/sections/about/modules/widgets/GithubStatsWidget.vue -->
<script setup lang="ts">
import type { AboutTranslations } from '../../types'

defineProps<{
  labels: AboutTranslations['github']
}>()

// Сетка контрибьюшнов
const contributionCols = [
  [0, 1, 2, 0],
  [1, 2, 3, 1],
  [2, 3, 3, 2],
  [3, 3, 2, 3],
  [1, 2, 3, 1],
  [0, 1, 2, 2],
  [2, 3, 3, 3],
  [1, 2, 2, 1],
  [3, 3, 3, 2],
  [2, 3, 1, 0]
]

const getCellColor = (level: number) => {
  switch (level) {
    case 3: return 'bg-emerald-400'
    case 2: return 'bg-emerald-600'
    case 1: return 'bg-emerald-900/60'
    default: return 'bg-zinc-800/40'
  }
}
</script>

<template>
  <div class="flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-5 backdrop-blur-md transition-all hover:border-zinc-700 select-none shadow-lg">
    <div class="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-3">
      <Icon name="simple-icons:github" class="w-4 h-4 text-zinc-300" />
      <span>{{ labels.title }}</span>
    </div>

    <div class="flex items-center gap-3.5 mb-3">
      <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-emerald-400">
        <Icon name="lucide:git-commit" class="w-6 h-6" />
      </div>

      <div class="flex flex-col gap-0.5 overflow-hidden">
        <span class="font-sans font-semibold text-sm sm:text-base text-zinc-100 truncate">
          1,420 {{ labels.commits }}
        </span>
        <span class="font-mono text-xs text-emerald-400/90 truncate">
          Streak: 48 {{ labels.streak }}
        </span>
      </div>
    </div>

    <!-- Мини-граф коммитов со змейкой -->
    <div class="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
      <span class="font-mono text-[10px] text-zinc-500">{{ labels.sub }}</span>
      <div class="flex items-center gap-1">
        <div v-for="(col, colIdx) in contributionCols" :key="colIdx" class="flex flex-col gap-1">
          <span
            v-for="(lvl, rowIdx) in col"
            :key="rowIdx"
            class="h-1.5 w-1.5 rounded-sm"
            :class="getCellColor(lvl)"
          />
        </div>
      </div>
    </div>
  </div>
</template>