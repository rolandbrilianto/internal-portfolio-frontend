import type { EnablementActivity, EnablementTrack } from '~/types/enablement'
import type { ServiceResult } from '~/types/common'
import { emptyList, notFound, simulateLatency } from '../base.service'

/**
 * Partner enablement & co-marketing service abstraction
 * (BRD feature 6: Knowledge / Sales / Marketing enablement).
 */
export const enablementService = {
  async fetchActivities(): Promise<ServiceResult<EnablementActivity[]>> {
    await simulateLatency()
    return emptyList<EnablementActivity>()
  },

  async fetchActivity(id: string): Promise<ServiceResult<EnablementActivity | null>> {
    await simulateLatency()
    return notFound<EnablementActivity>(`No enablement record found for reference "${id}".`)
  },

  async fetchHistory(_partnerId: string): Promise<ServiceResult<EnablementActivity[]>> {
    await simulateLatency()
    return emptyList<EnablementActivity>()
  },

  async fetchTracks(): Promise<EnablementTrack[]> {
    await simulateLatency()
    return ['knowledge', 'sales', 'marketing']
  }
}
