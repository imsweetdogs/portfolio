<!-- frontend/components/sections/skills/modules/SkillBadge.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  icon: string
  color?: string
}>()

// Цвет определяем по ИКОНКЕ — тогда цвет работает на любом языке и в Брайле!
const colorClass = computed(() => {
  if (props.color) return props.color

  const icon = props.icon.toLowerCase()
  if (icon.includes('html')) return 'border-amber-500/30 bg-amber-950/20 text-amber-300 hover:border-amber-500/60'
  if (icon.includes('css')) return 'border-sky-500/30 bg-sky-950/20 text-sky-300 hover:border-sky-500/60'
  if (icon.includes('typescript')) return 'border-blue-500/30 bg-blue-950/20 text-blue-300 hover:border-blue-500/60'
  if (icon.includes('vue')) return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300 hover:border-emerald-500/60'
  if (icon.includes('nuxt')) return 'border-teal-500/30 bg-teal-950/20 text-teal-300 hover:border-teal-500/60'
  if (icon.includes('astro')) return 'border-purple-500/30 bg-purple-950/20 text-purple-300 hover:border-purple-500/60'
  if (icon.includes('tailwind')) return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:border-cyan-500/60'
  if (icon.includes('rust')) return 'border-orange-500/30 bg-orange-950/20 text-orange-300 hover:border-orange-500/60'
  if (icon.includes('python')) return 'border-yellow-500/30 bg-yellow-950/20 text-yellow-300 hover:border-yellow-500/60'
  if (icon.includes('nixos')) return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:border-cyan-500/60'
  if (icon.includes('bun')) return 'border-amber-500/30 bg-amber-950/20 text-amber-200 hover:border-amber-500/60'
  if (icon.includes('node')) return 'border-green-500/30 bg-green-950/20 text-green-300 hover:border-green-500/60'
  if (icon.includes('postgresql')) return 'border-blue-500/30 bg-blue-950/20 text-blue-300 hover:border-blue-500/60'
  if (icon.includes('redis')) return 'border-rose-500/30 bg-rose-950/20 text-rose-300 hover:border-rose-500/60'
  if (icon.includes('docker')) return 'border-sky-500/30 bg-sky-950/20 text-sky-300 hover:border-sky-500/60'
  if (icon.includes('nginx')) return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300 hover:border-emerald-500/60'
  if (icon.includes('caddy')) return 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300 hover:border-indigo-500/60'

  return 'border-zinc-800/80 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/60'
})
</script>

<template>
  <div 
    class="flex items-center gap-2 rounded-xl border px-3.5 py-1.5 font-mono text-xs transition-all select-none shadow-sm cursor-default"
    :class="colorClass"
  >
    <Icon :name="icon" class="w-3.5 h-3.5 flex-shrink-0" />
    <span>{{ name }}</span>
  </div>
</template>