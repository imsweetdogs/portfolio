<!-- frontend/components/sections/skills/SkillsSection.vue -->
<script setup lang="ts">
import CanvasSection from '~/components/common/CanvasSection.vue'
import SkillGroupCard from './modules/SkillGroupCard.vue'
import type { SkillsTranslations } from './types'

defineProps<{
  i18n?: SkillsTranslations
}>()
</script>

<template>
  <div v-if="i18n" id="skills" class="w-full">
    
    <!-- 1. Заголовок -->
    <CanvasSection pattern="none" class="pt-14 pb-3">
      <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        <div class="flex items-center gap-4 mb-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 shadow-md">
            <Icon name="lucide:wrench" class="w-5 h-5 text-zinc-400" />
          </div>
          <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 font-sans">
            {{ i18n.title }} <span class="font-serif italic font-normal text-rose-200/90">{{ i18n.titleAccent }}</span> .
          </h2>
        </div>

        <p class="font-mono text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {{ i18n.description }}
        </p>

      </div>
    </CanvasSection>

    <!-- 2. Сетка навыков: на фоне canvas-grid точно как на скриншоте -->
    <CanvasSection pattern="grid" :fade-top="true" :fade-bottom="true" class="pt-14 pb-20">
      <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col gap-10">
        <SkillGroupCard
          v-for="group in i18n.groups"
          :key="group.id"
          :group="group"
        />
      </div>
    </CanvasSection>

  </div>
</template>