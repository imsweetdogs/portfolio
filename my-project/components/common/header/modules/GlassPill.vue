<script setup lang="ts">
withDefaults(defineProps<{
  isScrolled: boolean
  shift?: 'left' | 'right' | 'none'
}>(), {
  shift: 'none'
})
</script>

<template>
  <div
    class="flex items-center rounded-full border px-5 py-2.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
    :class="[
      isScrolled
        ? 'border-white/[0.08] bg-[#0c0d12]/80 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.5)]'
        : 'border-transparent bg-transparent shadow-none',
      shift === 'right' && isScrolled ? '-translate-x-4 sm:-translate-x-6' : '',
      shift === 'left' && isScrolled ? 'translate-x-2' : ''
    ]"
    style="transform: translateZ(0); backface-visibility: hidden;"
  >
    <slot />
  </div>
</template>