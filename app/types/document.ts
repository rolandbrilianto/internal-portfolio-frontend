import type { ResponsiveViewMode } from './common'

/** FR-PT-05 / document module verification states. */
export type DocumentStatus = 'pending' | 'verified' | 'expired' | 'rejected'

export type DocumentCategory
  = | 'legal'
    | 'contract'
    | 'nda'
    | 'tax'
    | 'certification'
    | 'portfolio'

export interface LegalDocument {
  id: string
  reference: string
  title: string
  category: DocumentCategory
  status: DocumentStatus
  partnerId: string
  partnerName: string
  portfolioId: string | null
  fileName: string
  fileSize: number | null
  mimeType: string
  issuedAt: string | null
  expiresAt: string | null
  uploadedAt: string | null
  uploadedBy: string
  reviewedBy: string | null
  reviewedAt: string | null
  rejectionReason: string | null
}

export interface DocumentFilters {
  search: string
  categories: DocumentCategory[]
  statuses: DocumentStatus[]
  expiringWithinDays: number | null
}

export interface DocumentCounts {
  total: number
  pending: number
  verified: number
  expired: number
  rejected: number
  expiringSoon: number
}

export interface DocumentState {
  items: LegalDocument[]
  counts: DocumentCounts
  filters: DocumentFilters
  viewMode: ResponsiveViewMode
  loading: boolean
  loaded: boolean
  error: string | null
}
