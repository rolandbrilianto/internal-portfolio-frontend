import type {
  EvaluationCriterionKey,
  EvaluationDraft,
  PartnerEvaluation
} from '~/types/evaluation'
import type { ServiceResult } from '~/types/common'
import { emptyList, notFound, simulateLatency } from '../base.service'

/**
 * BRD FR-PT-05 evaluation criteria.
 * `maxScore` and `weight` are configuration, not measured results.
 */
export const EVALUATION_CRITERIA: Array<{
  key: EvaluationCriterionKey
  label: string
  description: string
  maxScore: number
  weight: number
}> = [
  {
    key: 'delivery',
    label: 'Delivery Reliability',
    description: 'Consistency of delivery against agreed milestones and quality targets.',
    maxScore: 5,
    weight: 25
  },
  {
    key: 'technical-capability',
    label: 'Technical Capability',
    description: 'Depth of engineering expertise, certification level and solution fitness.',
    maxScore: 5,
    weight: 25
  },
  {
    key: 'collaboration',
    label: 'Collaboration',
    description: 'Communication, transparency and responsiveness of the partner team.',
    maxScore: 5,
    weight: 20
  },
  {
    key: 'commercial-value',
    label: 'Commercial Value',
    description: 'Contribution to pipeline, joint opportunities and shared revenue.',
    maxScore: 5,
    weight: 20
  },
  {
    key: 'compliance',
    label: 'Compliance & Documentation',
    description: 'Adherence to internal security, legal and documentation requirements.',
    maxScore: 5,
    weight: 10
  }
]

/**
 * Partner evaluation service abstraction (BRD FR-PT-05).
 * No scores are fabricated — every score stays null until an evaluator submits one.
 */
export const evaluationService = {
  async fetchEvaluations(): Promise<ServiceResult<PartnerEvaluation[]>> {
    await simulateLatency()
    return emptyList<PartnerEvaluation>()
  },

  async fetchEvaluation(id: string): Promise<ServiceResult<PartnerEvaluation | null>> {
    await simulateLatency()
    return notFound<PartnerEvaluation>(`No evaluation record found for reference "${id}".`)
  },

  async fetchEvaluationHistory(_partnerId: string): Promise<ServiceResult<PartnerEvaluation[]>> {
    await simulateLatency()
    return emptyList<PartnerEvaluation>()
  },

  /** Draft evaluations are intentionally discarded in this phase. */
  async submitEvaluation(_draft: EvaluationDraft): Promise<ServiceResult<{ accepted: boolean }>> {
    await simulateLatency(240)
    return { data: { accepted: false }, status: 'not_connected', message: 'Persistence is not connected in the frontend-only phase.' }
  }
}
