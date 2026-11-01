// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  safelist: [
    'text-cyan-300',
    'text-cyan-400',
    'text-zinc-200',
    'font-medium',
    'font-semibold',
  ],
}