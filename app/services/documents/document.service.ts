import type { DocumentCounts, LegalDocument } from '~/types/document'
import type { PartnerDraftDocument } from '~/types/partner'
import type { ServiceResult } from '~/types/common'
import { emptyList, notFound, simulateLatency } from '../base.service'

/**
 * Legal / partnership document service abstraction.
 * File selection is local to the browser; nothing is uploaded in this phase.
 */
export const documentService = {
  async fetchDocuments(): Promise<{ data: LegalDocument[], counts: DocumentCounts }> {
    await simulateLatency()
    return {
      data: [],
      counts: { total: 0, pending: 0, verified: 0, expired: 0, rejected: 0, expiringSoon: 0 }
    }
  },

  async fetchDocument(id: string): Promise<ServiceResult<LegalDocument | null>> {
    await simulateLatency()
    return notFound<LegalDocument>(`No document record found for reference "${id}".`)
  },

  async fetchDocumentsForPartner(_partnerId: string): Promise<ServiceResult<LegalDocument[]>> {
    await simulateLatency()
    return emptyList<LegalDocument>()
  },

  /** Uploads are intentionally not performed in this phase. */
  async registerDocuments(_documents: PartnerDraftDocument[]): Promise<ServiceResult<{ accepted: boolean }>> {
    await simulateLatency(200)
    return { data: { accepted: false }, status: 'not_connected', message: 'File storage is not connected in the frontend-only phase.' }
  }
}
