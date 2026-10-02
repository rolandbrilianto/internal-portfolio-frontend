import { defineStore } from 'pinia'
import type {
  DocumentCounts,
  DocumentFilters,
  LegalDocument
} from '~/types/document'
import type { ResponsiveViewMode } from '~/types/common'
import { documentService } from '~/services/documents/document.service'
import { CONTRACT_EXPIRY_REMINDER_DAYS } from '~/utils/constants'
import { daysUntil } from '~/utils/formatters'

function createFilters(): DocumentFilters {
  return { search: '', categories: [], statuses: [], expiringWithinDays: null }
}

function createCounts(): DocumentCounts {
  return { total: 0, pending: 0, verified: 0, expired: 0, rejected: 0, expiringSoon: 0 }
}

export const useDocumentStore = defineStore('documents', () => {
  const items = ref<LegalDocument[]>([])
  const counts = ref<DocumentCounts>(createCounts())
  const filters = ref<DocumentFilters>(createFilters())
  const viewMode = ref<ResponsiveViewMode>('table')
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasActiveFilters = computed(
    () =>
      filters.value.search.trim().length > 0
      || filters.value.categories.length > 0
      || filters.value.statuses.length > 0
      || filters.value.expiringWithinDays !== null
  )

  const filteredItems = computed(() => {
    const query = filters.value.search.trim().toLowerCase()
    return items.value.filter((document_) => {
      if (filters.value.categories.length && !filters.value.categories.includes(document_.category)) return false
      if (filters.value.statuses.length && !filters.value.statuses.includes(document_.status)) return false
      if (filters.value.expiringWithinDays !== null) {
        const remaining = daysUntil(document_.expiresAt)
        if (remaining === null || remaining > filters.value.expiringWithinDays) return false
      }
      if (!query) return true
      return [document_.title, document_.reference, document_.partnerName, document_.fileName]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  const expiringSoon = computed(() =>
    items.value.filter((document_) => {
      const remaining = daysUntil(document_.expiresAt)
      return remaining !== null && remaining >= 0 && remaining <= CONTRACT_EXPIRY_REMINDER_DAYS
    })
  )

  async function load() {
    loading.value = true
    error.value = null
    try {
      const result = await documentService.fetchDocuments()
      items.value = result.data
      counts.value = result.counts ?? createCounts()
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load documents.'
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
    counts,
    filters,
    viewMode,
    loading,
    loaded,
    error,
    hasActiveFilters,
    filteredItems,
    expiringSoon,
    load,
    resetFilters,
    setViewMode
  }
})
