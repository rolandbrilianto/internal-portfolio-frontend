import { defineStore } from 'pinia'
import type {
  Partnership,
  PartnershipFilters,
  PartnershipStageSummary, PartnershipStage
} from '~/types/partnership'
import type { ResponsiveViewMode } from '~/types/common'
import { partnershipService } from '~/services/partnership/partnership.service'
import { PARTNERSHIP_STATUS_LABELS } from '~/utils/formatters'

function createFilters(): PartnershipFilters {
  return { search: '', stages: [], categories: [], types: [] }
}

export const usePartnershipStore = defineStore('partnership', () => {
  const items = ref<Partnership[]>([])
  const filters = ref<PartnershipFilters>(createFilters())
  const viewMode = ref<ResponsiveViewMode>('kanban')
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasActiveFilters = computed(
    () =>
      filters.value.search.trim().length > 0
      || filters.value.stages.length > 0
      || filters.value.categories.length > 0
      || filters.value.types.length > 0
  )

  const filteredItems = computed(() => {
    const query = filters.value.search.trim().toLowerCase()
    return items.value.filter((partnership) => {
      if (filters.value.stages.length && !filters.value.stages.includes(partnership.stage)) return false
      if (filters.value.categories.length && !filters.value.categories.includes(partnership.category)) return false
      if (filters.value.types.length && !filters.value.types.includes(partnership.type)) return false
      if (!query) return true
      return [partnership.title, partnership.reference, partnership.partnerName, partnership.scope]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  const hasRecords = computed(() => items.value.length > 0)

  const stageSummaries = computed<PartnershipStageSummary[]>(() => {
    const stages: PartnershipStage[] = ['draft', 'under-review', 'active', 'expired', 'terminated']
    return stages.map(stage => ({
      stage,
      label: PARTNERSHIP_STATUS_LABELS[stage],
      count: filteredItems.value.filter(item => item.stage === stage).length
    }))
  })

  function byStage(stage: PartnershipStage) {
    return filteredItems.value.filter(item => item.stage === stage)
  }

  async function load() {
    loading.value = true
    error.value = null
    try {
      const result = await partnershipService.fetchPartnerships()
      items.value = result.data
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load the partnership pipeline.'
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

  return {
    items,
    filters,
    viewMode,
    loading,
    loaded,
    error,
    hasActiveFilters,
    hasRecords,
    filteredItems,
    stageSummaries,
    byStage,
    load,
    resetFilters,
    setViewMode
  }
})
