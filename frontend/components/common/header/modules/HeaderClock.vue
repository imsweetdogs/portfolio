<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  timezone?: string
  timezoneLabel?: string
  locale?: string
  showDate?: boolean
  showTime?: boolean
}>(), {
  timezone: 'Europe/Moscow',
  timezoneLabel: 'MSK',
  locale: 'ru',
  showDate: true,
  showTime: true
})

const dateStr = ref('')
const timeStr = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const createFormatter = (options: Intl.DateTimeFormatOptions) => {
  if (props.locale) {
    try {
      return new Intl.DateTimeFormat(props.locale, options)
    } catch {
      // Игнорируем невалидный тег
    }
  }
  try {
    return new Intl.DateTimeFormat(undefined, options)
  } catch {
    return new Intl.DateTimeFormat('en-US', options)
  }
}

const updateClock = () => {
  const now = new Date()

  if (props.showDate) {
    const df = createFormatter({
      timeZone: props.timezone,
      day: '2-digit',
      month: 'short'
    })
    dateStr.value = df.format(now)
  }

  if (props.showTime) {
    const tf = createFormatter({
      timeZone: props.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
    timeStr.value = tf.format(now)
  }
}

watch(() => [props.locale, props.timezone], updateClock)

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="flex items-center gap-3 font-mono text-xs sm:text-sm text-zinc-400 select-none">
    <div v-if="showDate" class="flex items-center gap-1.5">
      <Icon name="lucide:calendar" class="w-3.5 h-3.5 text-zinc-500" />
      <span class="text-zinc-300 capitalize">{{ dateStr }}</span>
    </div>

    <span v-if="showDate && showTime" class="text-zinc-700">|</span>

    <div v-if="showTime" class="flex items-center gap-1.5">
      <Icon name="lucide:clock" class="w-3.5 h-3.5 text-zinc-500" />
      <span class="tabular-nums text-zinc-300">{{ timeStr }}</span>
      <span v-if="timezoneLabel" class="text-zinc-500 text-[11px] font-semibold">{{ timezoneLabel }}</span>
    </div>
  </div>
</template>