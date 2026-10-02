import type { ResponsiveViewMode } from './common'

/** FR-PT-05 evaluation cadence. */
export type EvaluationPeriod = 'quarterly' | 'semi-annual' | 'annual'

export type EvaluationRecommendation
  = | 'renew'
    | 'extend'
    | 'review'
    | 'terminate'

export type EvaluationCriterionKey
  = | 'delivery'
    | 'technical-capability'
    | 'collaboration'
    | 'commercial-value'
    | 'compliance'

export interface EvaluationCriterionScore {
  key: EvaluationCriterionKey
  label: string
  /** Null until an evaluator records a verified score. */
  score: number | null
  maxScore: number
  weight: number
}

export interface PartnerEvaluation {
  id: string
  reference: string
  partnerId: string
  partnerName: string
  partnershipTitle: string
  period: EvaluationPeriod
  periodLabel: string
  evaluatedAt: string | null
  evaluatedBy: string
  status: 'draft' | 'submitted' | 'acknowledged'
  criteria: EvaluationCriterionScore[]
  notes: string
  recommendations: string
  recommendation: EvaluationRecommendation | ''
}

export interface EvaluationFilters {
  search: string
  periods: EvaluationPeriod[]
  statuses: Array<PartnerEvaluation['status']>
}

export interface EvaluationDraft {
  evaluationId: string | null
  partnerId: string
  period: EvaluationPeriod
  notes: string
  recommendations: string
  recommendation: EvaluationRecommendation | ''
  scores: Record<string, number | null>
}

export interface EvaluationState {
  items: PartnerEvaluation[]
  filters: EvaluationFilters
  viewMode: ResponsiveViewMode
  loading: boolean
  loaded: boolean
  error: string | null
}
