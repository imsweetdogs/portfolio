<!-- frontend/components/common/CursorParticles.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number | null = null

const mouse = { x: 0, y: 0 }
const targetMouse = { x: 0, y: 0 }

// Look-Up Table: 256 значений sin/cos в кэше L1 вместо вычислений на каждом кадре
const LUT_SIZE = 256
const SIN_LUT = new Float32Array(LUT_SIZE)
const COS_LUT = new Float32Array(LUT_SIZE)
for (let i = 0; i < LUT_SIZE; i++) {
  const rad = (i / LUT_SIZE) * Math.PI * 2
  SIN_LUT[i] = Math.sin(rad)
  COS_LUT[i] = Math.cos(rad)
}

class Particle {
  x = 0; y = 0
  lutIndex = 0
  lutSpeed = 1
  radius = 0
  size = 0
  hue = 0
  clockwise = true
  offsetX = 0
  offsetY = 0
  life = 0
  maxLife = 0
  
  // Кольцевой буфер координат шлейфа (3 точки без аллокаций массива)
  t0x = 0; t0y = 0
  t1x = 0; t1y = 0
  t2x = 0; t2y = 0

  constructor() { this.reset() }

  reset() {
    this.lutIndex = (Math.random() * LUT_SIZE) | 0
    this.lutSpeed = (Math.random() * 2 + 1.5) | 0 // Целочисленный шаг по LUT
    this.radius = Math.random() * 15 + 10
    this.size = Math.random() * 2.2 + 1.2
    this.hue = (Math.random() * 360) | 0
    this.clockwise = Math.random() > 0.5
    this.offsetX = (Math.random() - 0.5) * 6
    this.offsetY = (Math.random() - 0.5) * 6
    this.life = Math.random() * 0.5 + 0.5
    this.maxLife = this.life
  }

  update() {
    // Вращение по LUT-индексам
    if (this.clockwise) {
      this.lutIndex = (this.lutIndex + this.lutSpeed) & 255
    } else {
      this.lutIndex = (this.lutIndex - this.lutSpeed + 256) & 255
    }

    const cosVal = COS_LUT[this.lutIndex]
    const sinVal = SIN_LUT[this.lutIndex]

    const targetX = mouse.x + cosVal * this.radius + this.offsetX
    const targetY = mouse.y + sinVal * this.radius + this.offsetY

    if (!this.x) {
      this.x = targetX; this.y = targetY
      this.t0x = targetX; this.t0y = targetY
      this.t1x = targetX; this.t1y = targetY
      this.t2x = targetX; this.t2y = targetY
    }

    // Сдвиг кольцевого буфера шлейфа без создания объектов
    this.t2x = this.t1x; this.t2y = this.t1y
    this.t1x = this.t0x; this.t1y = this.t0y
    this.t0x = this.x;   this.t0y = this.y

    // Легковесный Lerp-догон
    this.x += (targetX - this.x) * 0.22
    this.y += (targetY - this.y) * 0.22

    this.life -= 0.003
    if (this.life <= 0) this.reset()
  }

  draw(context: CanvasRenderingContext2D) {
    const alpha = this.life / this.maxLife

    // Неоновый шлейф из 3 точек
    context.strokeStyle = `hsla(${this.hue}, 70%, 60%, ${alpha * 0.35})`
    context.lineWidth = this.size
    context.lineCap = 'round'
    context.beginPath()
    context.moveTo(this.t2x, this.t2y)
    context.lineTo(this.t1x, this.t1y)
    context.lineTo(this.x, this.y)
    context.stroke()

    // Частица
    context.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`
    context.beginPath()
    context.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
    context.fill()
  }
}

// Полноценный рой из 20 частиц (тот же объём)
let particles: Particle[] = []

const handleMouseMove = (e: MouseEvent) => {
  targetMouse.x = e.clientX
  targetMouse.y = e.clientY
}

const handleResize = () => {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

const animate = () => {
  if (!ctx || !canvas.value) return

  // Плавное следование за курсором без корней и тригонометрии
  mouse.x += (targetMouse.x - mouse.x) * 0.18
  mouse.y += (targetMouse.y - mouse.y) * 0.18

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Рой живёт и вращается непрерывно 24/7 без засыпаний
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw(ctx)
  }

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  const isDesktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768
  if (!isDesktop || !canvas.value) return

  ctx = canvas.value.getContext('2d', { alpha: true })
  mouse.x = window.innerWidth / 2
  mouse.y = window.innerHeight / 2
  targetMouse.x = mouse.x
  targetMouse.y = mouse.y

  handleResize()
  particles = Array.from({ length: 20 }, () => new Particle())

  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <canvas ref="canvas" class="fixed inset-0 pointer-events-none z-50 hidden md:block" />
</template>