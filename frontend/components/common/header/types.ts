export interface HeaderNavItem {
  name: string
  href: string
  icon?: string
}

export interface HeaderTranslations {
  menu: string
  close: string
  action: string
  textureTitle: string
  nav: HeaderNavItem[]
}

export interface HeaderProfileData {
  birthDate?: string
  timezone?: string
  timezoneIdentifier?: string
}