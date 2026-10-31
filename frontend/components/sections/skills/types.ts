// frontend/components/sections/skills/types.ts

export interface SkillItem {
  name: string
  icon: string
}

export interface SkillGroup {
  id: string
  title: string
  titleAccent?: string
  icon: string
  previewIcons?: string[]
  description: string
  skills: SkillItem[]
}

export interface SkillsTranslations {
  title: string
  titleAccent: string
  description: string
  groups: SkillGroup[]
}