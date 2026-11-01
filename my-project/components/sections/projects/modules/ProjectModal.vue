<!-- frontend/components/sections/projects/modules/ProjectModal.vue -->
<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import type { ProjectItem } from '../types'
import type { ProjectsModalLabels } from '~/types/i18n'

const props = defineProps<{
  isOpen: boolean
  project: ProjectItem | null
  labels: ProjectsModalLabels
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) emit('close')
}

watch(() => props.isOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="isOpen && project"
        data-no-burst
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Оверлей -->
        <div 
          @click="emit('close')"
          class="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
        />

        <!-- Контейнер карточки -->
        <div 
          class="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-[#111214] overflow-hidden shadow-2xl z-10 flex flex-col"
        >
          <div class="relative h-44 w-full overflow-hidden bg-zinc-900">
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="w-full h-full object-cover opacity-60"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#111214] via-[#111214]/40 to-transparent" />
            
            <button 
              type="button"
              @click="emit('close')"
              class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-zinc-400 hover:text-white transition-colors backdrop-blur-md active:scale-95"
            >
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>

            <div class="absolute bottom-3 left-6 flex items-center gap-2">
              <span class="rounded-md border border-zinc-700/60 bg-black/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-zinc-300">
                VOL. {{ project.id }}
              </span>
              <span class="font-mono text-xs text-zinc-400">{{ project.year }}</span>
            </div>
          </div>

          <div class="p-6 pt-2 flex flex-col gap-4">
            <h3 class="text-2xl font-bold tracking-tight text-white font-sans">
              {{ project.title }}
            </h3>

            <p class="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap items-center gap-1.5 pt-2">
              <span 
                v-for="tag in project.tags" 
                :key="tag"
                class="rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Нижняя плашка кнопок -->
          <div class="bg-[#1e1f22] px-6 py-4 flex items-center justify-end gap-3 border-t border-zinc-800/60">
            <button 
              type="button"
              @click="emit('close')"
              class="font-mono text-xs text-zinc-400 hover:text-white transition-colors px-3 py-2"
            >
              {{ labels.close }}
            </button>

            <a 
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 font-mono text-xs font-semibold text-zinc-200 transition-all active:scale-95 border border-zinc-700/60"
            >
              <Icon name="lucide:github" class="w-4 h-4 text-zinc-300" />
              <span>{{ labels.repo }}</span>
            </a>

            <a 
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 font-mono text-xs font-semibold text-white transition-all active:scale-95 shadow-lg shadow-indigo-950"
            >
              <span>{{ labels.site }}</span>
              <Icon name="lucide:arrow-up-right" class="w-4 h-4" />
            </a>

            <div 
              v-if="!project.github && !project.link"
              class="flex items-center gap-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 px-3.5 py-2 font-mono text-xs text-zinc-400 select-none"
            >
              <Icon name="lucide:lock" class="w-3.5 h-3.5 text-zinc-500" />
              <span>{{ labels.privateCode }}</span>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>