import type { AuditEntry, ManagedContentItem, ManagedUser } from '~/types/admin'
import type { ServiceResult } from '~/types/common'
import { emptyList, simulateLatency } from '../base.service'

/**
 * Administration service abstraction (BRD FR-AD-01, FR-AD-03, FR-AD-04).
 * No CRUD endpoint is called: all lists start empty and export is a UI stub.
 */
export const administrationService = {
  async fetchContent(): Promise<ServiceResult<ManagedContentItem[]>> {
    await simulateLatency()
    return emptyList<ManagedContentItem>()
  },

  async fetchUsers(): Promise<ServiceResult<ManagedUser[]>> {
    await simulateLatency()
    return emptyList<ManagedUser>()
  },

  async fetchAuditTrail(): Promise<ServiceResult<AuditEntry[]>> {
    await simulateLatency()
    return emptyList<AuditEntry>()
  },

  /** FR-AD-03 export is disabled until a backend export job exists. */
  async exportDataset(_dataset: 'partners' | 'partnerships' | 'audit-trail'): Promise<ServiceResult<{ available: boolean }>> {
    await simulateLatency(160)
    return { data: { available: false }, status: 'not_connected', message: 'Export requires a backend endpoint.' }
  }
}
