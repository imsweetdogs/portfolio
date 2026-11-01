// components/sections/hero/types.ts

export interface HeroTranslations {
  greeting: string
  rolePrefix: string
  roleSuffix: string
  description: string
  tgBanner: string
  easterEggText: string
  buttons: {
    works: string
    github: string
    contact: string
  }
  ambient: {
    ambientOn: string
    ambientOff: string
    soundOn: string
    soundMuted: string
  }
}

export interface HeroLinks {
  tg?: string
  rss?: string
  github?: string
  projectsAnchor?: string
}

export interface HeroMedia {
  stickerUrl?: string
  easterStickerUrl?: string
  videoUrl?: string
}