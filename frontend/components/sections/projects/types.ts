// frontend/components/sections/projects/types.ts

export interface ProjectItem {
  id: string
  title: string
  year: string
  description: string
  tags: string[]
  image: string
  link?: string
  github?: string
}