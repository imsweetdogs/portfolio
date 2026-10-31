<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  enabled?: boolean
}>(), {
  title: 'Переключить текстуру шума',
  enabled: true
})

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button
    type="button"
    :title="title"
    @click="emit('click')"
    class="flex items-center justify-center transition-colors active:scale-95 select-none"
    :class="enabled ? 'text-zinc-200 hover:text-white' : 'text-zinc-600 hover:text-zinc-400'"
  >
    <svg viewBox="0 0 16 16" class="w-3.5 h-3.5" fill="none">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.2" />
      <rect x="2" y="2" width="6" height="6" fill="currentColor" />
      <rect x="8" y="8" width="6.5" height="6.5" fill="currentColor" />
    </svg>
  </button>
</template>