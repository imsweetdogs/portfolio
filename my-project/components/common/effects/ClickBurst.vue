<!-- frontend/components/common/ClickBurst.vue -->
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  stickers?: string[]
}>(), {
  stickers: () => []
})

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number | null = null
let isRunning = false

const COLORS = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
const MAX_ACTIVE_STICKERS = 28

// Универсальный ассет (видео или картинка)
type MediaAsset = 
  | { type: 'video'; el: HTMLVideoElement }
  | { type: 'image'; el: HTMLImageElement }

const sharedMedia: MediaAsset[] = []

// Проверка на видеоформат (учитывает возможные query-параметры ?v=1)
const isVideoUrl = (url: string) => /\.(webm|mp4)(\?.*)?$/i.test(url)

const initSharedMedia = (urls: string[]) => {
  // Очищаем старые ресурсы
  sharedMedia.forEach(m => {
    if (m.type === 'video') {
      m.el.pause()
      m.el.src = ''
      m.el.remove()
    }
  })
  sharedMedia.length = 0

  urls.forEach(url => {
    if (!url) return

    if (isVideoUrl(url)) {
      // 1. Создаем общий инстанс видео
      const video = document.createElement('video')
      video.src = url
      video.autoplay = false
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.crossOrigin = 'anonymous'
      video.style.display = 'none'
      document.body.appendChild(video)
      sharedMedia.push({ type: 'video', el: video })
    } else {
      // 2. Создаем кэш статической картинки / SVG / WebP
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = url
      sharedMedia.push({ type: 'image', el: img })
    }
  })
}

watch(() => props.stickers, (newUrls) => {
  if (typeof document !== 'undefined' && newUrls && newUrls.length > 0) {
    initSharedMedia(newUrls)
  }
}, { immediate: true })

interface SparkParticle {
  x: number; y: number; radius: number; colorIndex: number
  speedX: number; speedY: number; life: number; currentLife: number
}

interface StickerParticle {
  x: number; y: number; size: number
  asset: MediaAsset
  speedX: number; speedY: number
  rotation: number; spin: number
  alpha: number
  life: number; currentLife: number
}

interface Circle {
  x: number; y: number; radius: number; maxRadius: number
  alpha: number; speed: number; lineWidth: number
}

const sparks: SparkParticle[] = []
const activeStickers: StickerParticle[] = []
const circles: Circle[] = []

const setCanvasSize = () => {
  if (!canvas.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  canvas.value.width = window.innerWidth * dpr
  canvas.value.height = window.innerHeight * dpr
  canvas.value.style.width = `${window.innerWidth}px`
  canvas.value.style.height = `${window.innerHeight}px`
  ctx = canvas.value.getContext('2d', { alpha: true })
  if (ctx) ctx.scale(dpr, dpr)
}

const triggerBurst = (x: number, y: number) => {
  // 1. 18 неоновых искр
  for (let i = 0; i < 18; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 2.5 + Math.random() * 4
    sparks.push({
      x, y,
      radius: 3.5 + Math.random() * 4,
      colorIndex: (Math.random() * COLORS.length) | 0,
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed,
      life: 50 + Math.random() * 30,
      currentLife: 0
    })
  }

  // 2. 7 стикеров (видео или картинок)
  if (sharedMedia.length > 0) {
    // Запускаем видео, если они стояли на паузе
    sharedMedia.forEach(m => {
      if (m.type === 'video' && m.el.paused) {
        m.el.play().catch(() => {})
      }
    })

    for (let i = 0; i < 7; i++) {
      if (activeStickers.length >= MAX_ACTIVE_STICKERS) {
        activeStickers.shift()
      }

      const angle = Math.random() * Math.PI * 2
      const speed = 1.8 + Math.random() * 2.2
      const asset = sharedMedia[(Math.random() * sharedMedia.length) | 0]

      activeStickers.push({
        x, y,
        size: 20 + Math.random() * 8, // 20-28px
        asset,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 0.8,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.08,
        alpha: 1,
        life: 80 + Math.random() * 30,
        currentLife: 0
      })
    }
  }

  // 3. Волна взрыва
  circles.push({
    x, y,
    radius: 8,
    alpha: 0.55,
    lineWidth: 3.5,
    maxRadius: 55 + Math.random() * 30,
    speed: 2 + Math.random()
  })

  if (!isRunning) {
    isRunning = true
    animate()
  }
}

const handleClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null
  if (target && target.closest('[data-no-burst]')) return
  triggerBurst(e.clientX, e.clientY)
}

const animate = () => {
  if (!ctx || !canvas.value) return

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  // 1. Кольца
  for (let i = circles.length - 1; i >= 0; i--) {
    const c = circles[i]
    c.radius += c.speed * 2
    c.alpha *= 0.94
    c.lineWidth *= 0.96

    if (c.radius < c.maxRadius && c.alpha > 0.01) {
      ctx.globalAlpha = c.alpha
      ctx.beginPath()
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2)
      ctx.lineWidth = c.lineWidth
      ctx.strokeStyle = '#FFFFFF'
      ctx.stroke()
    } else {
      circles.splice(i, 1)
    }
  }
  ctx.globalAlpha = 1

  // 2. 18 искр
  for (let cIdx = 0; cIdx < COLORS.length; cIdx++) {
    let hasDrawn = false

    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i]
      if (p.colorIndex !== cIdx) continue

      p.x += p.speedX
      p.y += p.speedY
      p.radius *= 0.96
      p.currentLife++

      if (p.currentLife < p.life && p.radius > 0.3) {
        if (!hasDrawn) {
          ctx.beginPath()
          hasDrawn = true
        }
        ctx.moveTo(p.x + p.radius, p.y)
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      } else {
        sparks.splice(i, 1)
      }
    }

    if (hasDrawn) {
      ctx.fillStyle = COLORS[cIdx]
      ctx.fill()
    }
  }

  // 3. Стикеры (универсальный рендер видео и картинок)
  for (let i = activeStickers.length - 1; i >= 0; i--) {
    const s = activeStickers[i]
    s.x += s.speedX
    s.y += s.speedY
    s.speedY += 0.06
    s.speedX *= 0.97
    s.rotation += s.spin
    s.currentLife++
    s.alpha = Math.max(0, 1 - (s.currentLife / s.life))

    if (s.currentLife < s.life && s.alpha > 0.02) {
      // Проверка готовности кадра
      const isReady = s.asset.type === 'video'
        ? s.asset.el.readyState >= 2
        : (s.asset.el.complete && s.asset.el.naturalWidth > 0)

      if (isReady) {
        ctx.save()
        ctx.globalAlpha = s.alpha
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)
        ctx.drawImage(s.asset.el, -s.size / 2, -s.size / 2, s.size, s.size)
        ctx.restore()
      }
    } else {
      activeStickers.splice(i, 1)
    }
  }
  ctx.globalAlpha = 1

  if (sparks.length > 0 || activeStickers.length > 0 || circles.length > 0) {
    animationFrameId = requestAnimationFrame(animate)
  } else {
    isRunning = false
    animationFrameId = null
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // Пауза всех видеопотоков в покое
    sharedMedia.forEach(m => {
      if (m.type === 'video') m.el.pause()
    })
  }
}

onMounted(() => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768
  if (!isDesktop || !canvas.value) return

  setCanvasSize()
  window.addEventListener('mousedown', handleClick, { passive: true })
  window.addEventListener('resize', setCanvasSize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleClick)
  window.removeEventListener('resize', setCanvasSize)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  sharedMedia.forEach(m => {
    if (m.type === 'video') {
      m.el.pause()
      m.el.src = ''
      m.el.remove()
    }
  })
})
</script>

<template>
  <canvas ref="canvas" class="fixed inset-0 pointer-events-none z-50 hidden md:block" />
</template>