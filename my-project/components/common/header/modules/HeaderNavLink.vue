<script setup lang="ts">
defineProps<{
  href: string
  label: string
  icon?: string
}>()

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <a
    :href="href"
    @click="emit('click')"
    class="group relative flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-zinc-100 transition-colors py-0.5"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors"
    />
    <span class="border-b border-transparent group-hover:border-dashed group-hover:border-zinc-400 transition-all pb-0.5">
      {{ label }}
    </span>
    <span class="opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 font-sans text-xs text-zinc-500">
      -&gt;
    </span>
  </a>
</template>