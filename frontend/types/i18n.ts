// frontend/types/i18n.ts

export interface LocaleItem {
  code: string
  label: string
  intl: string
  isDefault: boolean
}

export interface ProfileData {
  birthDate: string
  timezone: string
  timezoneIdentifier: string
}

export interface LinksData {
  tg?: string
  rss?: string
  github?: string
  email?: string
  discord?: string
  steam?: string
  projectsAnchor?: string
}

export interface HeaderNavItem {
  name: string
  href: string
  icon?: string
}

export interface HeaderData {
  menu: string
  close: string
  action: string
  textureTitle: string
  nav: HeaderNavItem[]
}

export interface MediaData {
  videoUrl: string
  stickerUrl: string
  easterStickerUrl: string
  avatarUrl: string
  ogImageUrl: string
  faviconUrl: string
  stickers?: string[]
}

export interface HeroButtons {
  works: string
  github: string
  contact: string
}

export interface HeroAmbient {
  ambientOn: string
  ambientOff: string
  soundOn: string
  soundMuted: string
}

export interface HeroData {
  greeting: string
  rolePrefix: string
  roleSuffix: string
  description: string
  tgBanner: string
  easterEggText: string
  buttons: HeroButtons
  ambient: HeroAmbient
}

export interface TranslationPayload {
  data?: ProfileData
  links?: LinksData
  header?: HeaderData
  media?: MediaData
  hero?: HeroData
  [key: string]: any
}