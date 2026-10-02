import type { AppRoleKey } from './role'

export type ContentType
  = | 'portfolio-project'
    | 'partner-profile'
    | 'partnership'
    | 'enablement'

export type ContentWorkflow = 'draft' | 'scheduled' | 'published' | 'archived'

export type AuditSeverity = 'info' | 'notice' | 'warning' | 'critical'

export type AuditAction
  = | 'create'
    | 'update'
    | 'publish'
    | 'archive'
    | 'delete'
    | 'verify'
    | 'export'

export interface ManagedContentItem {
  id: string
  reference: string
  title: string
  type: ContentType
  workflow: ContentWorkflow
  updatedAt: string | null
  updatedBy: string
  scheduledFor: string | null
  version: number
}

export interface AuditEntry {
  id: string
  reference: string
  occurredAt: string | null
  actor: string
  actorRole: AppRoleKey | null
  action: AuditAction
  module: 'portfolio' | 'partner' | 'partnership' | 'documents' | 'notifications' | 'administration'
  severity: AuditSeverity
  target: string
  summary: string
  ipAddress: string | null
}

export interface ManagedUser {
  id: string
  fullName: string
  email: string
  role: AppRoleKey
  unit: string
  status: 'active' | 'invited' | 'suspended'
  lastActiveAt: string | null
}

export interface ContentFilters {
  search: string
  types: ContentType[]
  workflows: ContentWorkflow[]
}

export interface AuditFilters {
  search: string
  modules: AuditEntry['module'][]
  severities: AuditSeverity[]
}

export interface AdministrationState {
  content: ManagedContentItem[]
  users: ManagedUser[]
  auditTrail: AuditEntry[]
  contentFilters: ContentFilters
  auditFilters: AuditFilters
  loading: boolean
  loaded: boolean
  error: string | null
}
