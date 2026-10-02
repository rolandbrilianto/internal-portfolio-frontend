import type { ResponsiveViewMode } from './common'

/** BRD partner categories. */
export type PartnerCategory
  = | 'technology-partner'
    | 'channel-partner'
    | 'service-partner'
    | 'marketing-partner'

/** BRD FR-PT-04 partnership lifecycle states. */
export type PartnershipStatus
  = | 'draft'
    | 'under-review'
    | 'active'
    | 'expired'
    | 'terminated'

export type ContractStatus
  = | 'not-started'
    | 'in-progress'
    | 'active'
    | 'expiring'
    | 'expired'

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'

export interface PartnerCapability {
  id: string
  name: string
  level: 'basic' | 'intermediate' | 'advanced' | 'expert'
  certified: boolean
}

export interface PartnerContactRole {
  id: string
  role: string
  name: string
  email: string
  phone: string
}

export interface PartnerContract {
  id: string
  title: string
  reference: string
  startDate: string | null
  endDate: string | null
  status: ContractStatus
  documentId: string | null
}

export interface PartnerProjectLink {
  portfolioId: string
  portfolioName: string
  role: string
}

export interface Partner {
  id: string
  /** FR-PT-03 unique partnership code. */
  partnershipCode: string
  legalName: string
  tradingName: string
  website: string
  country: string
  industry: string
  category: PartnerCategory
  status: PartnershipStatus
  verification: VerificationStatus
  summary: string
  capabilities: PartnerCapability[]
  contacts: PartnerContactRole[]
  contracts: PartnerContract[]
  projects: PartnerProjectLink[]
  onboardedAt: string | null
  lastReviewedAt: string | null
}

export interface PartnerFilters {
  search: string
  categories: PartnerCategory[]
  statuses: PartnershipStatus[]
  contractStatuses: ContractStatus[]
  verificationStatuses: VerificationStatus[]
}

export type PartnerFormStepKey
  = | 'profile'
    | 'capabilities'
    | 'partnership'
    | 'documents'
    | 'review'

export interface PartnerDraftContact {
  role: string
  name: string
  email: string
  phone: string
}

export interface PartnerDraftDocument {
  id: string
  label: string
  fileName: string
  fileSize: number | null
  issuedAt: string | null
  notes: string
}

export interface PartnerDraft {
  legalName: string
  tradingName: string
  website: string
  country: string
  industry: string
  category: PartnerCategory | ''
  summary: string
  capabilities: PartnerCapability[]
  contacts: PartnerDraftContact[]
  partnershipStatus: PartnershipStatus | ''
  contractStartDate: string | null
  contractEndDate: string | null
  contractNotes: string
  documents: PartnerDraftDocument[]
}

export interface PartnerState {
  items: Partner[]
  filters: PartnerFilters
  viewMode: ResponsiveViewMode
  loading: boolean
  loaded: boolean
  error: string | null
}
