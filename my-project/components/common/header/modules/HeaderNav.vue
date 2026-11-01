<script setup lang="ts">
import type { HeaderNavItem } from '../types'
import HeaderNavLink from './HeaderNavLink.vue'

withDefaults(defineProps<{
  items: HeaderNavItem[]
  layout?: 'row' | 'col'
}>(), {
  layout: 'row'
})

const emit = defineEmits<{ (e: 'navigate'): void }>()
</script>

<template>
  <nav :class="layout === 'col' ? 'flex flex-col gap-4' : 'flex items-center gap-6'">
    <HeaderNavLink
      v-for="item in items"
      :key="item.href"
      :href="item.href"
      :icon="item.icon"
      :label="item.name"
      @click="emit('navigate')"
    />
  </nav>
</template>