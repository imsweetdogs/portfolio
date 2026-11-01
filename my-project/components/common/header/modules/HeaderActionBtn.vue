<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  icon?: string
}>(), {
  label: 'Связаться',
  icon: 'lucide:send'
})

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    class="group relative flex items-center gap-2 font-mono text-sm text-indigo-400 hover:text-indigo-300 transition-colors py-0.5 active:scale-95"
  >
    <Icon
      :name="icon"
      class="w-4 h-4 text-indigo-400/80 group-hover:text-indigo-300 transition-colors"
    />
    <span class="border-b border-transparent group-hover:border-dashed group-hover:border-indigo-400/80 transition-all pb-0.5">
      {{ label }}
    </span>
    <span class="opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 font-sans text-xs">
      -&gt;
    </span>
  </button>
</template>