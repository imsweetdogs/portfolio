// frontend/composables/useProjects.ts
import type { ProjectItem } from '~/components/sections/projects/types'
import { useI18n } from './useI18n'

interface ProjectsApiResponse {
  items: ProjectItem[]
  total: number
  page: number
  limit: number
  total_pages: number
  tags: string[]
}

export const useProjects = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8080'
  const { currentLocaleCode } = useI18n()

  const projects = useState<ProjectItem[]>('projects_list', () => [])
  const total = useState<number>('projects_total', () => 0)
  const availableTags = useState<string[]>('projects_tags', () => [])
  
  const activeTag = ref<string>('')
  const currentPage = ref(1)
  const limit = 6
  const isLoading = ref(false)
  const isLoadingMore = ref(false)

  const hasMore = computed(() => projects.value.length < total.value)

  const fetchProjects = async (append = false) => {
    if (append) {
      if (!hasMore.value || isLoadingMore.value) return
      isLoadingMore.value = true
    } else {
      isLoading.value = true
      currentPage.value = 1
    }

    try {
      const pageToFetch = append ? currentPage.value + 1 : 1
      const params = new URLSearchParams({
        page: pageToFetch.toString(),
        limit: limit.toString(),
        lang: currentLocaleCode.value || 'ru'
      })

      if (activeTag.value) {
        params.append('tag', activeTag.value)
      }

      const res = await $fetch<ProjectsApiResponse>(`${apiBase}/api/v1/projects?${params.toString()}`)

      if (append) {
        projects.value = [...projects.value, ...res.items]
        currentPage.value = res.page
      } else {
        projects.value = res.items
        currentPage.value = 1
        if (res.tags && res.tags.length > 0) {
          availableTags.value = res.tags
        }
      }

      total.value = res.total
    } catch (err) {
      console.error('[Projects] Ошибка загрузки проектов:', err)
      if (!append) projects.value = []
    } finally {
      isLoading.value = false
      isLoadingMore.value = false
    }
  }

  // Реактивная смена языка карточек
  watch(currentLocaleCode, async (newLang, oldLang) => {
    if (newLang !== oldLang) {
      await fetchProjects(false)
    }
  })

  const setTag = async (tag: string) => {
    if (activeTag.value === tag) return
    activeTag.value = tag
    await fetchProjects(false)
  }

  const resetTag = async () => {
    if (!activeTag.value) return
    activeTag.value = ''
    await fetchProjects(false)
  }

  return {
    projects,
    total,
    availableTags,
    activeTag,
    isLoading,
    isLoadingMore,
    hasMore,
    fetchProjects,
    setTag,
    resetTag
  }
}