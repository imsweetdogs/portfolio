<!-- frontend/components/common/CanvasSection.vue -->
<script setup lang="ts">
withDefaults(defineProps<{
  id?: string
  pattern?: 'grid' | 'dots' | 'none'
  fadeTop?: boolean
  fadeBottom?: boolean
}>(), {
  pattern: 'none',
  fadeTop: false,
  fadeBottom: false
})
</script>

<template>
  <section :id="id" class="relative w-full overflow-hidden">
    <!-- Сетка / Точки -->
    <div
      v-if="pattern !== 'none'"
      class="pointer-events-none absolute inset-0 z-0"
      :class="pattern === 'grid' ? 'canvas-grid' : 'canvas-dots'"
    />

    <!-- Туман сверху -->
    <div
      v-if="fadeTop"
      class="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080809] to-transparent z-20"
    />

    <!-- Туман снизу -->
    <div
      v-if="fadeBottom"
      class="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080809] to-transparent z-20"
    />

    <!-- Контент -->
    <div class="relative z-10 w-full">
      <slot />
    </div>
  </section>
</template>

<style scoped>
/* Квадраты: ровно 24px как у ggsky.one */
.canvas-grid {
  background-size: 24px 24px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
}

/* Точки: ровно 16px */
.canvas-dots {
  background-size: 16px 16px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
}
</style>