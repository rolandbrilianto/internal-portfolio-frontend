import { defineStore } from 'pinia'
import type {
  AdministrationState,
  AuditFilters,
  ContentFilters
} from '~/types/admin'
import { administrationService } from '~/services/administration/administration.service'

function createContentFilters(): ContentFilters {
  return { search: '', types: [], workflows: [] }
}

function createAuditFilters(): AuditFilters {
  return { search: '', modules: [], severities: [] }
}

export const useAdministrationStore = defineStore('administration', () => {
  const content = ref<AdministrationState['content']>([])
  const users = ref<AdministrationState['users']>([])
  const auditTrail = ref<AdministrationState['auditTrail']>([])
  const contentFilters = ref<ContentFilters>(createContentFilters())
  const auditFilters = ref<AuditFilters>(createAuditFilters())
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasContentFilters = computed(
    () =>
      contentFilters.value.search.trim().length > 0
      || contentFilters.value.types.length > 0
      || contentFilters.value.workflows.length > 0
  )

  const hasAuditFilters = computed(
    () =>
      auditFilters.value.search.trim().length > 0
      || auditFilters.value.modules.length > 0
      || auditFilters.value.severities.length > 0
  )

  const filteredContent = computed(() => {
    const query = contentFilters.value.search.trim().toLowerCase()
    return content.value.filter((item) => {
      if (contentFilters.value.types.length && !contentFilters.value.types.includes(item.type)) return false
      if (contentFilters.value.workflows.length && !contentFilters.value.workflows.includes(item.workflow)) return false
      if (!query) return true
      return [item.title, item.reference, item.updatedBy].join(' ').toLowerCase().includes(query)
    })
  })

  const filteredAuditTrail = computed(() => {
    const query = auditFilters.value.search.trim().toLowerCase()
    return auditTrail.value.filter((entry) => {
      if (auditFilters.value.modules.length && !auditFilters.value.modules.includes(entry.module)) return false
      if (auditFilters.value.severities.length && !auditFilters.value.severities.includes(entry.severity)) return false
      if (!query) return true
      return [entry.summary, entry.actor, entry.target, entry.reference, entry.action]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  async function load() {
    loading.value = true
    error.value = null
    try {
      const [contentResult, userResult, auditResult] = await Promise.all([
        administrationService.fetchContent(),
        administrationService.fetchUsers(),
        administrationService.fetchAuditTrail()
      ])
      content.value = contentResult.data
      users.value = userResult.data
      auditTrail.value = auditResult.data
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load administration data.'
    } finally {
      loading.value = false
      loaded.value = true
    }
  }

  function resetContentFilters() {
    contentFilters.value = createContentFilters()
  }

  function resetAuditFilters() {
    auditFilters.value = createAuditFilters()
  }

  return {
    content,
    users,
    auditTrail,
    contentFilters,
    auditFilters,
    loading,
    loaded,
    error,
    hasContentFilters,
    hasAuditFilters,
    filteredContent,
    filteredAuditTrail,
    load,
    resetContentFilters,
    resetAuditFilters
  }
})
