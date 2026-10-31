<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import type { HeaderNavItem } from './types'
import HeaderLogo from './modules/HeaderLogo.vue'
import HeaderNav from './modules/HeaderNav.vue'
import HeaderActionBtn from './modules/HeaderActionBtn.vue'
import HeaderClock from './modules/HeaderClock.vue'
import HeaderAgeTicker from './modules/HeaderAgeTicker.vue'
import HeaderLangBtn from './modules/HeaderLangBtn.vue'

const props = withDefaults(defineProps<{
  isOpen: boolean
  logoUrl?: string
  brandName?: string
  brandDomain?: string
  navItems?: HeaderNavItem[]
  actionLabel?: string
  showAction?: boolean
  timezone?: string
  timezoneIdentifier?: string
  birthDate?: string
  showAge?: boolean
  currentLabel?: string
  locale?: string
  closeLabel?: string
}>(), {
  logoUrl: '/logo.svg',
  brandName: 'sweetdogs',
  brandDomain: undefined,
  navItems: () => [],
  showAction: true,
  showAge: true,
  actionLabel: 'Связаться',
  closeLabel: 'Закрыть',
  timezone: 'Europe/Moscow',
  timezoneIdentifier: 'MSK',
  birthDate: '2005-09-16T00:00:00Z',
  currentLabel: 'RU',
  locale: 'ru'
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'open-ticket'): void
  (e: 'change-lang'): void
}>()

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

watch(() => props.isOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-250 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-full opacity-0"
  >
    <div 
      v-if="isOpen"
      class="fixed inset-x-0 top-0 z-50 flex flex-col border-b border-white/[0.08] bg-[#0c0c0e]/95 px-6 pb-8 pt-6 backdrop-blur-md shadow-2xl md:hidden"
    >
      <div class="flex items-center justify-between pb-6 border-b border-zinc-800/80">
        <button 
          type="button"
          @click="emit('close')"
          class="flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-zinc-100 active:scale-95 transition-colors"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
          <span>{{ closeLabel }}</span>
        </button>

        <HeaderLogo size="sm" :logo-url="logoUrl" :brand-name="brandName" :brand-domain="brandDomain" />

        <HeaderLangBtn 
          :label="currentLabel"
          @click="emit('change-lang')" 
        />
      </div>

      <div class="pt-6 flex flex-col gap-5">
        <HeaderNav 
          layout="col"
          :items="navItems"
          @navigate="emit('close')" 
        />

        <div v-if="showAction" class="pt-2 border-t border-zinc-900">
          <HeaderActionBtn
            :label="actionLabel"
            @click="emit('open-ticket'); emit('close')" 
          />
        </div>
      </div>

      <div class="mt-8 flex flex-wrap items-center justify-between border-t border-zinc-900 pt-4 gap-2">
        <HeaderAgeTicker v-if="showAge && birthDate" :birth-date="birthDate" />
        <HeaderClock 
          :timezone="timezone" 
          :timezone-label="timezoneIdentifier" 
          :locale="locale"
        />
      </div>
    </div>
  </Transition>
</template>