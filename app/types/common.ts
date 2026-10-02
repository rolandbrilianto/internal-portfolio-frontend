export type ServiceStatus = 'success' | 'empty' | 'not_connected'

export interface ServiceResult<T> {
  data: T
  status: ServiceStatus
  message?: string
}

export interface ListQuery {
  page: number
  pageSize: number
  search: string
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface SelectOption<T extends string = string> {
  label: string
  value: T
  description?: string
}

export type TableDensity = 'comfortable' | 'compact'

export type ResponsiveViewMode = 'table' | 'cards' | 'kanban'
