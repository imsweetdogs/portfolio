<!-- components/sections/about/modules/widgets/SystemWidget.vue -->
<script setup lang="ts">
import type { AboutTranslations } from '../../types'

defineProps<{
  labels: AboutTranslations['system']
}>()
</script>

<template>
  <div class="flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-950/60 p-5 backdrop-blur-md transition-all hover:border-zinc-700 select-none shadow-lg">
    <div class="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-3">
      <Icon name="simple-icons:nixos" class="w-4 h-4 text-cyan-400" />
      <span>{{ labels.title }}</span>
    </div>

    <div class="flex items-center gap-3.5 mb-3">
      <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 text-cyan-400">
        <Icon name="lucide:cpu" class="w-6 h-6" />
      </div>

      <div class="flex flex-col gap-0.5 overflow-hidden">
        <span class="font-sans font-semibold text-sm sm:text-base text-zinc-100 truncate">
          NixOS (unstable)
        </span>
        <span class="font-mono text-xs text-zinc-400 truncate">
          river / Wayland
        </span>
      </div>
    </div>

    <div class="pt-2 border-t border-zinc-800/60 flex items-center justify-between font-mono text-[11px] text-zinc-500">
      <span class="flex items-center gap-1.5">
        <span class="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
        nixpkgs-unstable
      </span>
      <span class="text-cyan-300/80 font-medium">1679 packages</span>
    </div>
  </div>
</template>