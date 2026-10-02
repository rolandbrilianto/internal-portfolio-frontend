import type { Partner, PartnerDraft } from '~/types/partner'
import type { ServiceResult } from '~/types/common'
import { emptyList, notFound, simulateLatency } from '../base.service'

/**
 * Partner service abstraction (BRD FR-PT-01 … FR-PT-05).
 * Frontend only — no persistence happens in this phase.
 */
export const partnerService = {
  async fetchPartners(): Promise<ServiceResult<Partner[]>> {
    await simulateLatency()
    return emptyList<Partner>()
  },

  async fetchPartner(id: string): Promise<ServiceResult<Partner | null>> {
    await simulateLatency()
    return notFound<Partner>(`No partner record found for reference "${id}".`)
  },

  /**
   * FR-PT-03 would generate the unique partnership code server-side.
   * The preview code below is only used to demonstrate the confirmation state.
   */
  async previewPartnershipCode(): Promise<string> {
    await simulateLatency(120)
    return 'PRT-PENDING'
  },

  /** Draft submissions are intentionally discarded in this phase. */
  async submitDraft(_draft: PartnerDraft): Promise<ServiceResult<{ accepted: boolean }>> {
    await simulateLatency(240)
    return { data: { accepted: false }, status: 'not_connected', message: 'Persistence is not connected in the frontend-only phase.' }
  }
}
