/** FR-NT-01 partner verification, FR-NT-02 30-day contract expiry reminder. */
export type NotificationType
  = | 'partner-verification'
    | 'partnership-status'
    | 'contract-expiry'
    | 'document-review'
    | 'system'

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'critical'

export type NotificationCategory = 'partnership' | 'portfolio' | 'administration' | 'system'

export interface AppNotification {
  id: string
  reference: string
  type: NotificationType
  severity: NotificationSeverity
  category: NotificationCategory
  title: string
  body: string
  link: string | null
  createdAt: string | null
  read: boolean
  actor: string | null
}

export interface NotificationFilters {
  search: string
  types: NotificationType[]
  severities: NotificationSeverity[]
  categories: NotificationCategory[]
  unreadOnly: boolean
}

export interface NotificationCounts {
  total: number
  unread: number
  critical: number
}

export interface NotificationState {
  items: AppNotification[]
  counts: NotificationCounts
  filters: NotificationFilters
  loading: boolean
  loaded: boolean
  error: string | null
}
