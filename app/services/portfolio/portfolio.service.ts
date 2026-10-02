import type {
  PortfolioCategoryShare,
  PortfolioDashboardSummary,
  PortfolioProject,
  PortfolioTotals,
  PortfolioTrendPoint
} from '~/types/portfolio'
import type { ServiceResult } from '~/types/common'
import { emptyList, notFound, simulateLatency } from '../base.service'

/**
 * Portfolio service abstraction (BRD FR-PF-01 … FR-PF-04).
 * Frontend only — replace the bodies with an API client when a backend exists.
 */
function createEmptySummary(): PortfolioDashboardSummary {
  const totals: PortfolioTotals = { total: 0, active: 0, completed: 0, featured: 0 }
  const industries: PortfolioCategoryShare[] = []
  const technologies: PortfolioCategoryShare[] = []
  const performanceTrend: PortfolioTrendPoint[] = []
  return {
    totals,
    industries,
    technologies,
    averageRoi: null,
    performanceTrend,
    featured: []
  }
}

export const portfolioService = {
  async fetchProjects(): Promise<ServiceResult<PortfolioProject[]>> {
    await simulateLatency()
    return emptyList<PortfolioProject>()
  },

  async fetchProject(id: string): Promise<ServiceResult<PortfolioProject | null>> {
    await simulateLatency()
    return notFound<PortfolioProject>(`No portfolio record found for reference "${id}".`)
  },

  async fetchDashboardSummary(): Promise<PortfolioDashboardSummary> {
    await simulateLatency()
    return createEmptySummary()
  },

  async fetchIndustries(): Promise<ServiceResult<string[]>> {
    await simulateLatency()
    return emptyList<string>()
  },

  async fetchTechnologies(): Promise<ServiceResult<string[]>> {
    await simulateLatency()
    return emptyList<string>()
  },

  async fetchServiceTypes(): Promise<ServiceResult<string[]>> {
    await simulateLatency()
    return emptyList<string>()
  },

  async fetchYears(): Promise<ServiceResult<number[]>> {
    await simulateLatency()
    return emptyList<number>()
  }
}
