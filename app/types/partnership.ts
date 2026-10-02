import type { PartnershipStatus, PartnerCategory } from './partner'
import type { ResponsiveViewMode } from './common'

export type PartnershipStage = PartnershipStatus

export type PartnershipType
  = | 'technology'
    | 'channel'
    | 'service'
    | 'marketing'
    | 'strategic'

export interface PartnershipOwner {
  id: string
  name: string
  team: string
}

export interface Partnership {
  id: string
  reference: string
  title: string
  partnerId: string
  partnerName: string
  category: PartnerCategory
  type: PartnershipType
  stage: PartnershipStage
  scope: string
  startedAt: string | null
  expiresAt: string | null
  owners: PartnershipOwner[]
  tags: string[]
}

export interface PartnershipStageSummary {
  stage: PartnershipStage
  label: string
  count: number
}

export interface PartnershipFilters {
  search: string
  stages: PartnershipStage[]
  categories: PartnerCategory[]
  types: PartnershipType[]
}

export interface PartnershipState {
  items: Partnership[]
  stageSummaries: PartnershipStageSummary[]
  filters: PartnershipFilters
  viewMode: ResponsiveViewMode
  loading: boolean
  loaded: boolean
  error: string | null
}
