import { defineStore } from 'pinia'
import type {
  EvaluationDraft,
  EvaluationFilters,
  PartnerEvaluation
} from '~/types/evaluation'
import type { ResponsiveViewMode } from '~/types/common'
import { evaluationService } from '~/services/evaluation/evaluation.service'

function createFilters(): EvaluationFilters {
  return { search: '', periods: [], statuses: [] }
}

function createDraft(): EvaluationDraft {
  return {
    evaluationId: null,
    partnerId: '',
    period: 'quarterly',
    notes: '',
    recommendations: '',
    recommendation: '',
    scores: {}
  }
}

export const useEvaluationStore = defineStore('evaluation', () => {
  const items = ref<PartnerEvaluation[]>([])
  const filters = ref<EvaluationFilters>(createFilters())
  const draft = ref<EvaluationDraft>(createDraft())
  const viewMode = ref<ResponsiveViewMode>('table')
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasActiveFilters = computed(
    () =>
      filters.value.search.trim().length > 0
      || filters.value.periods.length > 0
      || filters.value.statuses.length > 0
  )

  const filteredItems = computed(() => {
    const query = filters.value.search.trim().toLowerCase()
    return items.value.filter((evaluation) => {
      if (filters.value.periods.length && !filters.value.periods.includes(evaluation.period)) return false
      if (filters.value.statuses.length && !filters.value.statuses.includes(evaluation.status)) return false
      if (!query) return true
      return [evaluation.reference, evaluation.partnerName, evaluation.partnershipTitle, evaluation.evaluatedBy]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  const overallScore = computed(() => {
    const scored = filteredItems.value.flatMap(item => item.criteria)
      .map(criterion => criterion.score)
      .filter((score): score is number => score !== null)
    if (!scored.length) return null
    return scored.reduce((total, score) => total + score, 0) / scored.length
  })

  async function load() {
    loading.value = true
    error.value = null
    try {
      const result = await evaluationService.fetchEvaluations()
      items.value = result.data
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load evaluation records.'
    } finally {
      loading.value = false
      loaded.value = true
    }
  }

  function resetFilters() {
    filters.value = createFilters()
  }

  function resetDraft() {
    draft.value = createDraft()
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
    draft,
    viewMode,
    loading,
    loaded,
    error,
    hasActiveFilters,
    filteredItems,
    overallScore,
    load,
    resetFilters,
    resetDraft,
    setViewMode,
    findById
  }
})
