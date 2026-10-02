import { defineStore } from 'pinia'
import type {
  EnablementActivity,
  EnablementFilters,
  EnablementTrack,
  EnablementTrackSummary
} from '~/types/enablement'
import type { ResponsiveViewMode } from '~/types/common'
import { enablementService } from '~/services/enablement/enablement.service'
import { ENABLEMENT_TRACK_LABELS } from '~/utils/formatters'

const TRACKS: EnablementTrack[] = ['knowledge', 'sales', 'marketing']

function createFilters(): EnablementFilters {
  return { search: '', tracks: [], statuses: [] }
}

export const useEnablementStore = defineStore('enablement', () => {
  const items = ref<EnablementActivity[]>([])
  const filters = ref<EnablementFilters>(createFilters())
  const viewMode = ref<ResponsiveViewMode>('table')
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasActiveFilters = computed(
    () =>
      filters.value.search.trim().length > 0
      || filters.value.tracks.length > 0
      || filters.value.statuses.length > 0
  )

  const filteredItems = computed(() => {
    const query = filters.value.search.trim().toLowerCase()
    return items.value.filter((activity) => {
      if (filters.value.tracks.length && !filters.value.tracks.includes(activity.track)) return false
      if (filters.value.statuses.length && !filters.value.statuses.includes(activity.status)) return false
      if (!query) return true
      return [activity.title, activity.reference, activity.partnerName, activity.owner, activity.description]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  const trackSummaries = computed<EnablementTrackSummary[]>(() =>
    TRACKS.map(track => ({
      track,
      label: ENABLEMENT_TRACK_LABELS[track],
      completed: filteredItems.value.filter(item => item.track === track && item.status === 'completed').length,
      inProgress: filteredItems.value.filter(item => item.track === track && item.status === 'in-progress').length,
      planned: filteredItems.value.filter(item => item.track === track && item.status === 'planned').length
    }))
  )

  const timeline = computed(() =>
    [...filteredItems.value].sort((a, b) => {
      const left = a.scheduledAt ? new Date(a.scheduledAt).getTime() : 0
      const right = b.scheduledAt ? new Date(b.scheduledAt).getTime() : 0
      return left - right
    })
  )

  async function load() {
    loading.value = true
    error.value = null
    try {
      const result = await enablementService.fetchActivities()
      items.value = result.data
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load enablement history.'
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
    filteredItems,
    trackSummaries,
    timeline,
    load,
    resetFilters,
    setViewMode
  }
})
