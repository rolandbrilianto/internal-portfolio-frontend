import { defineStore } from 'pinia'
import type { Partner, PartnerFilters, PartnerCategory, PartnershipStatus } from '~/types/partner'
import type { ResponsiveViewMode } from '~/types/common'
import { partnerService } from '~/services/partner/partner.service'

function createFilters(): PartnerFilters {
  return {
    search: '',
    categories: [],
    statuses: [],
    contractStatuses: [],
    verificationStatuses: []
  }
}

export const usePartnerStore = defineStore('partner', () => {
  const items = ref<Partner[]>([])
  const filters = ref<PartnerFilters>(createFilters())
  const viewMode = ref<ResponsiveViewMode>('table')
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasActiveFilters = computed(
    () =>
      filters.value.search.trim().length > 0
      || filters.value.categories.length > 0
      || filters.value.statuses.length > 0
      || filters.value.contractStatuses.length > 0
      || filters.value.verificationStatuses.length > 0
  )

  const filteredItems = computed(() => {
    const query = filters.value.search.trim().toLowerCase()
    return items.value.filter((partner) => {
      if (filters.value.categories.length && !filters.value.categories.includes(partner.category)) return false
      if (filters.value.statuses.length && !filters.value.statuses.includes(partner.status)) return false
      if (filters.value.verificationStatuses.length
        && !filters.value.verificationStatuses.includes(partner.verification)) return false
      if (filters.value.contractStatuses.length) {
        const hasContract = partner.contracts.some(contract =>
          filters.value.contractStatuses.includes(contract.status)
        )
        if (!hasContract) return false
      }
      if (!query) return true
      return [
        partner.legalName,
        partner.tradingName,
        partner.partnershipCode,
        partner.industry,
        partner.summary,
        ...partner.capabilities.map(capability => capability.name)
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  const hasRecords = computed(() => items.value.length > 0)

  const countsByCategory = computed<Record<PartnerCategory, number>>(() => {
    const counts = {
      'technology-partner': 0,
      'channel-partner': 0,
      'service-partner': 0,
      'marketing-partner': 0
    } as Record<PartnerCategory, number>
    for (const partner of items.value) counts[partner.category] += 1
    return counts
  })

  const countsByStatus = computed<Record<PartnershipStatus, number>>(() => {
    const counts = {
      'draft': 0,
      'under-review': 0,
      'active': 0,
      'expired': 0,
      'terminated': 0
    } as Record<PartnershipStatus, number>
    for (const partner of items.value) counts[partner.status] += 1
    return counts
  })

  async function load() {
    loading.value = true
    error.value = null
    try {
      const result = await partnerService.fetchPartners()
      items.value = result.data
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load partner records.'
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
    filters,
    viewMode,
    loading,
    loaded,
    error,
    hasActiveFilters,
    hasRecords,
    filteredItems,
    countsByCategory,
    countsByStatus,
    load,
    resetFilters,
    setViewMode,
    findById
  }
})
