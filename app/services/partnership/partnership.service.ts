import type { Partnership, PartnershipStageSummary, PartnershipStage } from '~/types/partnership'
import type { ServiceResult } from '~/types/common'
import { emptyList, notFound, simulateLatency } from '../base.service'
import { PARTNERSHIP_STATUS_LABELS } from '~/utils/formatters'

const STAGES: PartnershipStage[] = ['draft', 'under-review', 'active', 'expired', 'terminated']

/**
 * Partnership pipeline service abstraction (BRD FR-AD-02).
 * The kanban columns are always rendered, even when they hold no records.
 */
export const partnershipService = {
  async fetchPartnerships(): Promise<ServiceResult<Partnership[]>> {
    await simulateLatency()
    return emptyList<Partnership>()
  },

  async fetchPartnership(id: string): Promise<ServiceResult<Partnership | null>> {
    await simulateLatency()
    return notFound<Partnership>(`No partnership record found for reference "${id}".`)
  },

  async fetchStageSummaries(): Promise<PartnershipStageSummary[]> {
    await simulateLatency()
    return STAGES.map(stage => ({ stage, label: PARTNERSHIP_STATUS_LABELS[stage], count: 0 }))
  }
}
