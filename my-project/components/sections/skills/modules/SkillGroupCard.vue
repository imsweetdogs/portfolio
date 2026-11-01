<!-- frontend/components/sections/skills/modules/SkillGroupCard.vue -->
<script setup lang="ts">
import SkillBadge from './SkillBadge.vue'
import type { SkillGroup } from '../types'

defineProps<{
  group: SkillGroup
}>()
</script>

<template>
  <div class="flex flex-col gap-3.5">
    
    <!-- Заголовок категории + мини-иконки в строке -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 shadow-md">
        <Icon :name="group.icon" class="w-4 h-4 text-zinc-400" />
      </div>

      <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-1.5 font-sans">
        <span v-if="group.titleAccent" class="font-serif italic font-normal text-rose-200/90">
          {{ group.titleAccent }}
        </span>
        <span>{{ group.title }}.</span>
      </h3>

      <!-- Мини-логотипы технологий в ряд -->
      <div v-if="group.previewIcons?.length" class="flex items-center gap-2 ml-1 text-zinc-500">
        <Icon
          v-for="pIcon in group.previewIcons"
          :key="pIcon"
          :name="pIcon"
          class="w-4 h-4 hover:text-zinc-300 transition-colors"
        />
      </div>
    </div>

    <!-- Описание категории -->
    <p class="font-mono text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
      {{ group.description }}
    </p>

    <!-- Список чипов технологий -->
    <div class="flex flex-wrap items-center gap-2 pt-1">
      <SkillBadge
        v-for="skill in group.skills"
        :key="skill.name"
        :name="skill.name"
        :icon="skill.icon"
      />
    </div>

  </div>
</template>