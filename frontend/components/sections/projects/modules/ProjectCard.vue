<!-- frontend/components/sections/projects/modules/ProjectCard.vue -->
<script setup lang="ts">
import type { ProjectItem } from '../types'

defineProps<{
  project: ProjectItem
  detailsLabel?: string
}>()

const emit = defineEmits<{ (e: 'select', item: ProjectItem): void }>()
</script>

<template>
  <article
    class="group relative flex flex-col justify-between w-[290px] sm:w-[330px] h-[460px] flex-shrink-0 rounded-3xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl transition-all duration-300 hover:border-zinc-600 hover:-translate-y-1 select-none"
  >
    <img 
      :src="project.image" 
      :alt="project.title" 
      loading="lazy"
      decoding="async"
      draggable="false"
      class="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 pointer-events-none transform-gpu"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-[#080809] via-zinc-950/85 to-zinc-950/40 pointer-events-none" />

    <!-- Верхний бейдж -->
    <div class="relative z-10 p-6 flex items-center justify-between">
      <span class="rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase text-zinc-300 backdrop-blur-md">
        VOL. {{ project.id }}
      </span>
      <span class="font-mono text-xs text-zinc-500">{{ project.year }}</span>
    </div>

    <!-- Текстовое описание и кнопка -->
    <div class="relative z-10 p-6 flex flex-col gap-3">
      <h3 class="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors font-sans">
        {{ project.title }}
      </h3>

      <p class="font-mono text-xs text-zinc-400 line-clamp-3 leading-relaxed">
        {{ project.description }}
      </p>

      <div class="flex flex-wrap items-center gap-1.5 pt-1">
        <span
          v-for="t in project.tags"
          :key="t"
          class="rounded-md border border-zinc-800/80 bg-zinc-900/70 px-2 py-0.5 font-mono text-[10px] text-zinc-400 backdrop-blur-sm"
        >
          #{{ t }}
        </span>
      </div>

      <div class="pt-2 flex items-center justify-end">
        <button
          type="button"
          @click="emit('select', project)"
          class="flex items-center gap-1.5 font-mono text-xs text-indigo-400 hover:text-indigo-300 transition-colors active:scale-95"
        >
          <span>{{ detailsLabel || 'Подробнее' }}</span>
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </article>
</template>