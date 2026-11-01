<!-- frontend/components/sections/projects/ProjectsSection.vue -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import CanvasSection from '../../common/CanvasSection.vue'
import ProjectCard from './modules/ProjectCard.vue'
import ProjectModal from './modules/ProjectModal.vue'
import type { ProjectItem } from './types'
import type { ProjectsTranslations } from '~/types/i18n'
import { useProjects } from '~/composables/useProjects'

const props = defineProps<{
  i18n: ProjectsTranslations
}>()

const {
  projects,
  total,
  availableTags,
  activeTag,
  isLoading,
  hasMore,
  fetchProjects,
  setTag,
  resetTag
} = useProjects()

onMounted(async () => {
  if (projects.value.length === 0) {
    await fetchProjects(false)
  }
})

// --- БРОНЕБОЙНЫЙ ДРАГ-СКРОЛЛ (работает даже при динамическом v-if) ---
const useDragScroll = (onNearEnd?: () => void) => {
  const el = ref<HTMLElement | null>(null)
  let isDown = false
  let startX = 0
  let scrollLeft = 0
  let isDragging = false

  const onMouseDown = (e: MouseEvent) => {
    if (!el.value) return
    isDown = true
    isDragging = false
    startX = e.pageX - el.value.offsetLeft
    scrollLeft = el.value.scrollLeft
  }

  const onMouseUp = () => {
    isDown = false
    setTimeout(() => { isDragging = false }, 50)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDown || !el.value) return
    const x = e.pageX - el.value.offsetLeft
    const walk = (x - startX) * 1.5
    
    if (Math.abs(walk) > 6) {
      isDragging = true
    }

    el.value.scrollLeft = scrollLeft - walk

    if (onNearEnd && el.value.scrollWidth - (el.value.scrollLeft + el.value.clientWidth) < 300) {
      onNearEnd()
    }
  }

  // Вешаем слушатели динамически через watch: как только нода появилась после v-if — биндим события!
  watch(el, (newEl, oldEl) => {
    if (oldEl) {
      oldEl.removeEventListener('mousedown', onMouseDown)
      oldEl.removeEventListener('mousemove', onMouseMove)
    }
    if (newEl) {
      newEl.addEventListener('mousedown', onMouseDown)
      newEl.addEventListener('mousemove', onMouseMove)
    }
  })

  onMounted(() => {
    window.addEventListener('mouseup', onMouseUp)
  })

  onUnmounted(() => {
    if (el.value) {
      el.value.removeEventListener('mousedown', onMouseDown)
      el.value.removeEventListener('mousemove', onMouseMove)
    }
    window.removeEventListener('mouseup', onMouseUp)
  })

  return { el, isDragging: () => isDragging }
}

const { el: tagsSliderRef } = useDragScroll()
const { el: cardsSliderRef, isDragging } = useDragScroll(() => {
  if (hasMore.value) fetchProjects(true)
})

const allTags = computed(() => {
  const defaultTag = props.i18n?.allTag || 'Все'
  return [defaultTag, ...availableTags.value]
})

const isAllTagActive = computed(() => !activeTag.value)

const handleTagClick = (tag: string) => {
  const defaultTag = props.i18n?.allTag || 'Все'
  if (tag === defaultTag) {
    resetTag()
  } else {
    setTag(tag)
  }
}

const scrollCards = (direction: 'left' | 'right') => {
  if (!cardsSliderRef.value) return
  const offset = 350
  cardsSliderRef.value.scrollBy({
    left: direction === 'left' ? -offset : offset,
    behavior: 'smooth'
  })

  if (direction === 'right' && hasMore.value) {
    fetchProjects(true)
  }
}

const selectedProject = ref<ProjectItem | null>(null)
const isModalOpen = ref(false)

const openProjectModal = (item: ProjectItem) => {
  if (isDragging()) return
  selectedProject.value = item
  isModalOpen.value = true
}
</script>

<template>
  <div id="projects" data-no-burst class="w-full">
    
    <!-- 1. Заголовок и фильтры тегов -->
    <CanvasSection pattern="none" class="pt-20 pb-2">
      <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        <div class="flex items-center gap-4 mb-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 shadow-md">
            <Icon name="lucide:book-open" class="w-5 h-5 text-zinc-400" />
          </div>
          <h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 font-sans">
            {{ i18n.title }} <span class="font-serif italic font-normal text-rose-200/90">{{ i18n.titleAccent }}.</span>
          </h2>
        </div>

        <p class="font-mono text-sm text-zinc-400 max-w-2xl leading-relaxed mb-6">
          {{ i18n.subtitle }}
        </p>

        <!-- Слайдер тегов -->
        <div 
          ref="tagsSliderRef"
          class="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden font-mono text-xs cursor-grab active:cursor-grabbing select-none"
        >
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            @click="handleTagClick(tag)"
            class="flex-shrink-0 rounded-full border px-4 py-1.5 transition-all shadow-sm"
            :class="(tag === (i18n.allTag || 'Все') ? isAllTagActive : activeTag === tag)
              ? 'border-zinc-700 bg-zinc-800 text-zinc-100 shadow-black/50'
              : 'border-zinc-800/80 bg-zinc-950/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900/40'"
          >
            <span>#{{ tag }}</span>
          </button>
        </div>

      </div>
    </CanvasSection>

    <!-- 2. Слайдер карточек на точках -->
    <CanvasSection pattern="dots" :fade-top="true" :fade-bottom="true" class="pt-4 pb-28">
      <div class="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        
        <!-- ВНЕШНИЙ КОНТЕЙНЕР: Порталы живут ВСЕГДА и не респавнятся -->
        <div class="relative w-full">
          
          <!-- Левый портал: всегда на месте -->
          <div class="pointer-events-none absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 h-72 sm:h-88 w-0.5 rounded-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent blur-[0.5px] opacity-80 z-20 animate-pulse" />
          <div class="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 h-60 w-16 rounded-full bg-indigo-600/20 blur-2xl z-10" />

          <!-- Правый портал: всегда на месте -->
          <div class="pointer-events-none absolute -right-1 sm:-right-3 top-1/2 -translate-y-1/2 h-72 sm:h-88 w-0.5 rounded-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[0.5px] opacity-80 z-20 animate-pulse" />
          <div class="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 h-60 w-16 rounded-full bg-cyan-500/20 blur-2xl z-10" />

          <!-- Скелетон загрузки -->
          <div v-if="isLoading" class="flex gap-6 overflow-hidden py-4">
            <div 
              v-for="i in 3" 
              :key="i" 
              class="w-[290px] sm:w-[330px] h-[460px] flex-shrink-0 rounded-3xl border border-zinc-800/60 bg-zinc-900/20 animate-pulse" 
            />
          </div>

          <!-- Заглушка, если пусто -->
          <div 
            v-else-if="projects.length === 0" 
            class="my-8 py-20 flex flex-col items-center justify-center text-center rounded-3xl border border-dashed border-zinc-800/80 bg-zinc-950/30 backdrop-blur-sm"
          >
            <div class="h-12 w-12 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-center mb-4 text-zinc-500 shadow-inner">
              <Icon name="lucide:folder-git-2" class="w-6 h-6" />
            </div>
            <p class="font-mono text-sm text-zinc-400 max-w-sm">
              {{ i18n.empty || 'В этой категории пока нет проектов.' }}
            </p>
          </div>

          <!-- Слайдер карточек с вылетом слева направо -->
          <div
            v-else
            ref="cardsSliderRef"
            class="flex items-stretch gap-6 overflow-x-auto py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_28px,black_calc(100%-28px),transparent)] sm:[mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)]"
          >
            <ProjectCard
              v-for="(item, idx) in projects"
              :key="item.id"
              :project="item"
              :details-label="i18n.details"
              class="animate-card-slide-in"
              :style="{ animationDelay: `${idx * 50}ms` }"
              @select="openProjectModal"
            />
          </div>

        </div>

        <!-- Нижняя панель управления -->
        <div class="mt-6 flex items-center justify-between font-mono text-xs px-2">
          <div class="flex items-center gap-2 text-zinc-500 select-none">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {{ i18n.collectionPrefix }} 
              <strong class="text-zinc-200">{{ total }}</strong> 
              {{ i18n.collectionSuffix }}
            </span>
          </div>

          <div v-if="projects.length > 0" class="flex items-center gap-2">
            <button
              type="button"
              @click="scrollCards('left')"
              class="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all shadow-md"
              title="Назад"
            >
              <Icon name="lucide:chevron-left" class="w-4 h-4" />
            </button>
            <button
              type="button"
              @click="scrollCards('right')"
              class="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all shadow-md"
              title="Вперед"
            >
              <Icon name="lucide:chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </CanvasSection>

    <!-- Модалка -->
    <ProjectModal 
      :is-open="isModalOpen" 
      :project="selectedProject" 
      :labels="i18n.modal"
      @close="isModalOpen = false" 
    />

  </div>
</template>

<style scoped>
/* Анимация каскадного вылета карточек слева направо */
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateX(-35px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.animate-card-slide-in {
  animation: cardSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
</style>