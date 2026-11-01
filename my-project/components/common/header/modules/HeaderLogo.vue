<!-- frontend/components/common/header/modules/HeaderLogo.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  logoUrl?: string
  brandName?: string
  brandDomain?: string
  size?: 'sm' | 'md'
}>(), {
  logoUrl: '/logo.svg',
  brandName: 'sweetdogs',
  brandDomain: undefined,
  size: 'md'
})

const logoData = computed(() => {
  // Если домен задан жестко через пропс
  if (props.brandDomain !== undefined) {
    return { name: props.brandName, domain: props.brandDomain }
  }

  try {
    const url = useRequestURL()
    const host = url.host.split(':')[0] // Срезаем порт (например :3000)

    // Локалка: просто localhost без домена
    if (host === 'localhost' || host === '127.0.0.1') {
      return { name: 'localhost', domain: '' }
    }

    const dotIndex = host.indexOf('.')
    if (dotIndex === -1) {
      return { name: host, domain: '' }
    }

    // Если хост начинается с имени бренда, берем его, иначе делим по первой точке
    let name = props.brandName
    let domain = ''

    if (host.startsWith(props.brandName)) {
      domain = host.slice(props.brandName.length)
    } else {
      name = host.slice(0, dotIndex)
      domain = host.slice(dotIndex)
    }

    // Если хвост слишком длинный — ставим камодзи
    if (domain.length > 12) {
      domain = ' ╥﹏╥'
    }

    return { name, domain }
  } catch {
    return { name: props.brandName, domain: '.ru' }
  }
})
</script>

<template>
  <div class="flex items-center gap-2.5 select-none cursor-pointer">
    <img
      v-if="logoUrl"
      :src="logoUrl"
      :alt="logoData.name"
      class="object-contain flex-shrink-0"
      :class="size === 'sm' ? 'w-6 h-6' : 'w-7 h-7'"
    />
    <span
      class="font-mono font-semibold tracking-tight text-zinc-100 whitespace-nowrap"
      :class="size === 'sm' ? 'text-sm' : 'text-base'"
    >
      {{ logoData.name }}<span v-if="logoData.domain" class="text-zinc-500 font-normal">{{ logoData.domain }}</span>
    </span>
  </div>
</template>