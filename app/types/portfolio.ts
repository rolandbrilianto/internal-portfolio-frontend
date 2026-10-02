import type { ResponsiveViewMode } from './common'

export type PortfolioStatus = 'draft' | 'active' | 'completed' | 'on-hold'

export type PortfolioScale = 'small' | 'medium' | 'large' | 'strategic'

export type PortfolioMediaType = 'image' | 'video'

export interface PortfolioMedia {
  id: string
  type: PortfolioMediaType
  title: string
  url: string
}

export interface PortfolioSuccessMetric {
  id: string
  label: string
  /** Null when no verified measurement has been recorded yet. */
  value: string | null
  unit?: string
  description?: string
}

export interface PortfolioPartnerLink {
  partnerId: string
  partnerName: string
  contribution: string
}

export interface PortfolioProject {
  id: string
  reference: string
  name: string
  summary: string
  industry: string
  technologies: string[]
  serviceTypes: string[]
  scale: PortfolioScale
  year: number
  status: PortfolioStatus
  featured: boolean
  background: string
  challenges: string
  solution: string
  impact: string
  media: PortfolioMedia[]
  caseStudyUrl: string | null
  internalDocumentation: string
  successMetrics: PortfolioSuccessMetric[]
  partners: PortfolioPartnerLink[]
}

export interface PortfolioFilters {
  search: string
  industries: string[]
  technologies: string[]
  serviceTypes: string[]
  years: number[]
  scales: PortfolioScale[]
  statuses: PortfolioStatus[]
  featuredOnly: boolean
}

export interface PortfolioTotals {
  total: number
  active: number
  completed: number
  featured: number
}

export interface PortfolioCategoryShare {
  label: string
  value: number
  share: number
}

export interface PortfolioTrendPoint {
  period: string
  label: string
  value: number | null
}

export interface PortfolioDashboardSummary {
  totals: PortfolioTotals
  industries: PortfolioCategoryShare[]
  technologies: PortfolioCategoryShare[]
  averageRoi: number | null
  performanceTrend: PortfolioTrendPoint[]
  featured: PortfolioProject[]
}

export interface PortfolioState {
  items: PortfolioProject[]
  totals: PortfolioTotals
  industries: PortfolioCategoryShare[]
  technologies: PortfolioCategoryShare[]
  averageRoi: number | null
  performanceTrend: PortfolioTrendPoint[]
  filters: PortfolioFilters
  viewMode: ResponsiveViewMode
  loading: boolean
  loaded: boolean
  error: string | null
}
