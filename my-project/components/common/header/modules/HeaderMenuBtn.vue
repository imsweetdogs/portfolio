<script setup lang="ts">
withDefaults(defineProps<{
  isScrolled?: boolean
  label?: string
}>(), {
  isScrolled: false,
  label: 'Меню'
})

const emit = defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button
    type="button"
    @click="emit('click')"
    class="flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-zinc-300 active:scale-95"
    :class="isScrolled 
      ? 'h-11 w-11 rounded-full border border-white/10 bg-zinc-950/35 backdrop-blur-sm shadow-lg' 
      : 'border border-transparent px-2 py-1 gap-2 font-mono text-sm'"
  >
    <Icon name="lucide:menu" class="w-5 h-5 flex-shrink-0" />
    <span 
      class="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap"
      :class="isScrolled ? 'max-w-0 opacity-0' : 'max-w-[60px] opacity-100'"
    >
      {{ label }}
    </span>
  </button>
</template>