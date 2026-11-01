<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  birthDate?: string
}>(), {
  birthDate: '2005-09-16T00:00:00Z'
})

const ageSpanRef = ref<HTMLSpanElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const msInYear = 31556952000
const birth = new Date(props.birthDate).getTime()

const tick = () => {
  const currentAge = ((Date.now() - birth) / msInYear).toFixed(8)
  if (ageSpanRef.value) {
    ageSpanRef.value.textContent = currentAge
  }
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 300)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="inline-flex items-center gap-1.5 font-mono text-xs select-none">
    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
    <span class="text-zinc-500">age:</span>
    <span ref="ageSpanRef" class="font-medium tabular-nums text-zinc-300">0.00000000</span>
  </div>
</template>