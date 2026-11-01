<!-- frontend/components/common/header/modules/HeaderLangBtn.vue -->
<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  size?: 'sm' | 'md'
}>(), {
  size: 'md'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    class="flex items-center gap-1.5 font-mono text-zinc-400 hover:text-white transition-colors active:scale-95 select-none"
    :class="size === 'sm' ? 'text-xs' : 'text-sm'"
  >
    <Icon name="lucide:globe" :class="size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'" class="text-zinc-500" />
    <span class="uppercase tracking-wider font-medium">{{ label }}</span>
  </button>
</template>