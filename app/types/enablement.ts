import type { ResponsiveViewMode } from './common'

/** BRD enablement tracks. */
export type EnablementTrack
  = | 'knowledge'
    | 'sales'
    | 'marketing'

export type EnablementStatus = 'planned' | 'in-progress' | 'completed' | 'cancelled'

export type EnablementDeliveryMode = 'workshop' | 'training' | 'certification' | 'campaign' | 'asset-pack'

export interface EnablementActivity {
  id: string
  reference: string
  title: string
  track: EnablementTrack
  partnerId: string
  partnerName: string
  status: EnablementStatus
  mode: EnablementDeliveryMode
  owner: string
  scheduledAt: string | null
  completedAt: string | null
  description: string
  coMarketingAssets: string[]
}

export interface EnablementTrackSummary {
  track: EnablementTrack
  label: string
  completed: number
  inProgress: number
  planned: number
}

export interface EnablementFilters {
  search: string
  tracks: EnablementTrack[]
  statuses: EnablementStatus[]
}

export interface EnablementState {
  items: EnablementActivity[]
  trackSummaries: EnablementTrackSummary[]
  filters: EnablementFilters
  viewMode: ResponsiveViewMode
  loading: boolean
  loaded: boolean
  error: string | null
}
