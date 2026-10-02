import { defineStore } from 'pinia'
import type {
  PortfolioCategoryShare,
  PortfolioFilters,
  PortfolioProject,
  PortfolioTotals,
  PortfolioTrendPoint
} from '~/types/portfolio'
import type { ResponsiveViewMode } from '~/types/common'
import { portfolioService } from '~/services/portfolio/portfolio.service'

function createFilters(): PortfolioFilters {
  return {
    search: '',
    industries: [],
    technologies: [],
    serviceTypes: [],
    years: [],
    scales: [],
    statuses: [],
    featuredOnly: false
  }
}

function createTotals(): PortfolioTotals {
  return { total: 0, active: 0, completed: 0, featured: 0 }
}

export const usePortfolioStore = defineStore('portfolio', () => {
  const items = ref<PortfolioProject[]>([])
  const totals = ref<PortfolioTotals>(createTotals())
  const industries = ref<PortfolioCategoryShare[]>([])
  const technologies = ref<PortfolioCategoryShare[]>([])
  const averageRoi = ref<number | null>(null)
  const performanceTrend = ref<PortfolioTrendPoint[]>([])
  const filters = ref<PortfolioFilters>(createFilters())
  const viewMode = ref<ResponsiveViewMode>('table')
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasActiveFilters = computed(
    () =>
      filters.value.search.trim().length > 0
      || filters.value.industries.length > 0
      || filters.value.technologies.length > 0
      || filters.value.serviceTypes.length > 0
      || filters.value.years.length > 0
      || filters.value.scales.length > 0
      || filters.value.statuses.length > 0
      || filters.value.featuredOnly
  )

  const filteredItems = computed(() => {
    const query = filters.value.search.trim().toLowerCase()
    return items.value.filter((item) => {
      if (filters.value.featuredOnly && !item.featured) return false
      if (filters.value.industries.length && !filters.value.industries.includes(item.industry)) return false
      if (filters.value.technologies.length
        && !item.technologies.some(tech => filters.value.technologies.includes(tech))) return false
      if (filters.value.serviceTypes.length
        && !item.serviceTypes.some(service => filters.value.serviceTypes.includes(service))) return false
      if (filters.value.years.length && !filters.value.years.includes(item.year)) return false
      if (filters.value.scales.length && !filters.value.scales.includes(item.scale)) return false
      if (filters.value.statuses.length && !filters.value.statuses.includes(item.status)) return false
      if (!query) return true
      return [item.name, item.summary, item.reference, item.industry, ...item.technologies, ...item.serviceTypes]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  const featuredProjects = computed(() => items.value.filter(item => item.featured))

  async function load() {
    loading.value = true
    error.value = null
    try {
      const [list, summary] = await Promise.all([
        portfolioService.fetchProjects(),
        portfolioService.fetchDashboardSummary()
      ])
      items.value = list.data
      totals.value = summary.totals ?? createTotals()
      industries.value = summary.industries ?? []
      technologies.value = summary.technologies ?? []
      averageRoi.value = summary.averageRoi ?? null
      performanceTrend.value = summary.performanceTrend ?? []
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load portfolio data.'
    } finally {
      loading.value = false
      loaded.value = true
    }
  }

  function resetFilters() {
    filters.value = createFilters()
  }

  function setViewMode(mode: ResponsiveViewMode) {
    viewMode.value = mode
  }

  function findById(id: string) {
    return items.value.find(item => item.id === id) ?? null
  }

  return {
    items,
    totals,
    industries,
    technologies,
    averageRoi,
    performanceTrend,
    filters,
    viewMode,
    loading,
    loaded,
    error,
    hasActiveFilters,
    filteredItems,
    featuredProjects,
    load,
    resetFilters,
    setViewMode,
    findById
  }
})
