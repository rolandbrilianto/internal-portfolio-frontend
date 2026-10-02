import type {
  ContractStatus,
  PartnerCategory,
  PartnershipStatus,
  VerificationStatus
} from '~/types/partner'
import type { DocumentCategory, DocumentStatus } from '~/types/document'
import type { PartnershipType } from '~/types/partnership'
import type { EnablementStatus, EnablementTrack } from '~/types/enablement'
import type {
  EvaluationCriterionKey,
  EvaluationPeriod,
  EvaluationRecommendation,
  PartnerEvaluation
} from '~/types/evaluation'
import type { PortfolioScale, PortfolioStatus } from '~/types/portfolio'
import type {
  AuditAction,
  AuditEntry,
  AuditSeverity,
  ContentType,
  ContentWorkflow,
  ManagedUser
} from '~/types/admin'
import type { NotificationCategory, NotificationSeverity, NotificationType } from '~/types/notification'

type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'

export function formatDate(value: string | null | undefined, fallback = '—'): string {
  if (!value) return fallback
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return fallback
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(parsed)
}

export function formatDateTime(value: string | null | undefined, fallback = '—'): string {
  if (!value) return fallback
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return fallback
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(parsed)
}

export function formatRelative(value: string | null | undefined, fallback = '—'): string {
  if (!value) return fallback
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return fallback
  const diffDays = Math.round((parsed.getTime() - Date.now()) / 86_400_000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays > 0) return `In ${diffDays} days`
  return `${Math.abs(diffDays)} days ago`
}

export function formatNumber(value: number | null | undefined, fallback = '—'): string {
  if (value === null || value === undefined || Number.isNaN(value)) return fallback
  return new Intl.NumberFormat('en-GB').format(value)
}

export function formatPercent(value: number | null | undefined, fallback = '—'): string {
  if (value === null || value === undefined || Number.isNaN(value)) return fallback
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 }).format(value)}%`
}

export function formatFileSize(bytes: number | null | undefined, fallback = '—'): string {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return fallback
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB', 'MB', 'GB']
  let size = bytes / 1024
  let index = 0
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index += 1
  }
  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[index]}`
}

export function titleCase(value: string): string {
  return value
    .split('-')
    .map(part => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(' ')
}

export function daysUntil(value: string | null | undefined): number | null {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return Math.ceil((parsed.getTime() - Date.now()) / 86_400_000)
}

/* ------------------------------------------------------------------ */
/* Label + colour mappings for every business status in the platform.  */
/* ------------------------------------------------------------------ */

export const PORTFOLIO_STATUS_LABELS: Record<PortfolioStatus, string> = {
  'draft': 'Draft',
  'active': 'Active',
  'completed': 'Completed',
  'on-hold': 'On Hold'
}

export const PORTFOLIO_STATUS_COLORS: Record<PortfolioStatus, BadgeColor> = {
  'draft': 'neutral',
  'active': 'success',
  'completed': 'info',
  'on-hold': 'warning'
}

export const PORTFOLIO_SCALE_LABELS: Record<PortfolioScale, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  strategic: 'Strategic'
}

export const PARTNERSHIP_STATUS_LABELS: Record<PartnershipStatus, string> = {
  'draft': 'Draft',
  'under-review': 'Under Review',
  'active': 'Active',
  'expired': 'Expired',
  'terminated': 'Terminated'
}

export const PARTNERSHIP_TYPE_LABELS: Record<PartnershipType, string> = {
  technology: 'Technology',
  channel: 'Channel',
  service: 'Service',
  marketing: 'Marketing',
  strategic: 'Strategic'
}

export const PARTNERSHIP_TYPE_DESCRIPTIONS: Record<PartnershipType, string> = {
  technology: 'Technology integration and product alliances',
  channel: 'Reseller and distribution channels',
  service: 'Implementation and managed service providers',
  marketing: 'Joint go-to-market collaboration',
  strategic: 'Enterprise-wide strategic alliance'
}

export const PARTNERSHIP_TYPE_ICONS: Record<PartnershipType, string> = {
  technology: 'i-lucide-cpu',
  channel: 'i-lucide-network',
  service: 'i-lucide-wrench',
  marketing: 'i-lucide-megaphone',
  strategic: 'i-lucide-compass'
}

export const PARTNERSHIP_STATUS_COLORS: Record<PartnershipStatus, BadgeColor> = {
  'draft': 'neutral',
  'under-review': 'warning',
  'active': 'success',
  'expired': 'info',
  'terminated': 'error'
}

export const PARTNER_CATEGORY_LABELS: Record<PartnerCategory, string> = {
  'technology-partner': 'Technology Partner',
  'channel-partner': 'Channel Partner',
  'service-partner': 'Service Partner',
  'marketing-partner': 'Marketing Partner'
}

export const PARTNER_CATEGORY_ICONS: Record<PartnerCategory, string> = {
  'technology-partner': 'i-lucide-cpu',
  'channel-partner': 'i-lucide-network',
  'service-partner': 'i-lucide-concierge-bell',
  'marketing-partner': 'i-lucide-megaphone'
}

export const CONTRACT_STATUS_LABELS: Record<ContractStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'active': 'Active',
  'expiring': 'Expiring Soon',
  'expired': 'Expired'
}

export const CONTRACT_STATUS_COLORS: Record<ContractStatus, BadgeColor> = {
  'not-started': 'neutral',
  'in-progress': 'warning',
  'active': 'success',
  'expiring': 'warning',
  'expired': 'error'
}

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  unverified: 'Unverified',
  pending: 'Pending Verification',
  verified: 'Verified',
  rejected: 'Rejected'
}

export const VERIFICATION_STATUS_COLORS: Record<VerificationStatus, BadgeColor> = {
  unverified: 'neutral',
  pending: 'warning',
  verified: 'success',
  rejected: 'error'
}

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  legal: 'Legal',
  contract: 'Contract',
  nda: 'NDA',
  tax: 'Tax',
  certification: 'Certification',
  portfolio: 'Portfolio'
}

export const DOCUMENT_CATEGORY_ICONS: Record<DocumentCategory, string> = {
  legal: 'i-lucide-scale',
  contract: 'i-lucide-file-signature',
  nda: 'i-lucide-handshake',
  tax: 'i-lucide-receipt',
  certification: 'i-lucide-badge-check',
  portfolio: 'i-lucide-folder-kanban'
}

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  pending: 'Pending',
  verified: 'Verified',
  expired: 'Expired',
  rejected: 'Rejected'
}

export const DOCUMENT_STATUS_COLORS: Record<DocumentStatus, BadgeColor> = {
  pending: 'warning',
  verified: 'success',
  expired: 'info',
  rejected: 'error'
}

export const ENABLEMENT_TRACK_LABELS: Record<EnablementTrack, string> = {
  knowledge: 'Knowledge Enablement',
  sales: 'Sales Enablement',
  marketing: 'Marketing Enablement'
}

export const ENABLEMENT_TRACK_DESCRIPTIONS: Record<EnablementTrack, string> = {
  knowledge: 'Technical and product knowledge transfer sessions delivered to partner teams.',
  sales: 'Sales readiness programmes covering positioning, pitching and joint account plans.',
  marketing: 'Co-marketing campaigns, joint events and shared collateral.'
}

export const ENABLEMENT_STATUS_LABELS: Record<EnablementStatus, string> = {
  'planned': 'Planned',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'cancelled': 'Cancelled'
}

export const ENABLEMENT_STATUS_COLORS: Record<EnablementStatus, BadgeColor> = {
  'planned': 'neutral',
  'in-progress': 'info',
  'completed': 'success',
  'cancelled': 'error'
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  'portfolio-project': 'Portfolio project',
  'partner-profile': 'Partner profile',
  'partnership': 'Partnership',
  'enablement': 'Enablement'
}

export const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  'portfolio-project': 'i-lucide-folder-kanban',
  'partner-profile': 'i-lucide-building-2',
  'partnership': 'i-lucide-handshake',
  'enablement': 'i-lucide-graduation-cap'
}

export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
  create: 'Created',
  update: 'Updated',
  publish: 'Published',
  archive: 'Archived',
  delete: 'Deleted',
  verify: 'Verified',
  export: 'Exported'
}

export const AUDIT_ACTION_ICONS: Record<AuditAction, string> = {
  create: 'i-lucide-plus',
  update: 'i-lucide-pencil',
  publish: 'i-lucide-send',
  archive: 'i-lucide-archive',
  delete: 'i-lucide-trash-2',
  verify: 'i-lucide-badge-check',
  export: 'i-lucide-download'
}

export const AUDIT_MODULE_LABELS: Record<AuditEntry['module'], string> = {
  portfolio: 'Portfolio',
  partner: 'Partners',
  partnership: 'Partnerships',
  documents: 'Documents',
  notifications: 'Notifications',
  administration: 'Administration'
}

export const AUDIT_SEVERITY_LABELS: Record<AuditSeverity, string> = {
  info: 'Information',
  notice: 'Notice',
  warning: 'Warning',
  critical: 'Critical'
}

export const AUDIT_SEVERITY_COLORS: Record<AuditSeverity, BadgeColor> = {
  info: 'info',
  notice: 'neutral',
  warning: 'warning',
  critical: 'error'
}

export const MANAGED_USER_STATUS_LABELS: Record<ManagedUser['status'], string> = {
  active: 'Active',
  invited: 'Invited',
  suspended: 'Suspended'
}

export const MANAGED_USER_STATUS_COLORS: Record<ManagedUser['status'], BadgeColor> = {
  active: 'success',
  invited: 'info',
  suspended: 'error'
}

export const CONTENT_WORKFLOW_LABELS: Record<ContentWorkflow, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  published: 'Published',
  archived: 'Archived'
}

export const CONTENT_WORKFLOW_COLORS: Record<ContentWorkflow, BadgeColor> = {
  draft: 'neutral',
  scheduled: 'warning',
  published: 'success',
  archived: 'info'
}

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  'partner-verification': 'Partner Verification',
  'partnership-status': 'Partnership Status Update',
  'contract-expiry': 'Contract Expiry Reminder',
  'document-review': 'Document Review',
  'system': 'System Notification'
}

export const NOTIFICATION_SEVERITY_COLORS: Record<NotificationSeverity, BadgeColor> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  critical: 'error'
}

export const NOTIFICATION_SEVERITY_ICONS: Record<NotificationSeverity, string> = {
  info: 'i-lucide-info',
  success: 'i-lucide-circle-check',
  warning: 'i-lucide-triangle-alert',
  critical: 'i-lucide-octagon-alert'
}

export const NOTIFICATION_CATEGORY_LABELS: Record<NotificationCategory, string> = {
  partnership: 'Partnership',
  portfolio: 'Portfolio',
  administration: 'Administration',
  system: 'System'
}

export const EVALUATION_PERIOD_LABELS: Record<EvaluationPeriod, string> = {
  'quarterly': 'Quarterly',
  'semi-annual': 'Semi-annual',
  'annual': 'Annual'
}

export const EVALUATION_STATUS_LABELS: Record<PartnerEvaluation['status'], string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  acknowledged: 'Acknowledged'
}

export const EVALUATION_STATUS_COLORS: Record<PartnerEvaluation['status'], BadgeColor> = {
  draft: 'neutral',
  submitted: 'warning',
  acknowledged: 'success'
}

export const EVALUATION_RECOMMENDATION_LABELS: Record<EvaluationRecommendation, string> = {
  renew: 'Renew',
  extend: 'Extend',
  review: 'Review',
  terminate: 'Terminate'
}

export const EVALUATION_RECOMMENDATION_COLORS: Record<EvaluationRecommendation, BadgeColor> = {
  renew: 'success',
  extend: 'info',
  review: 'warning',
  terminate: 'error'
}

export const EVALUATION_CRITERION_DESCRIPTIONS: Record<EvaluationCriterionKey, string> = {
  'delivery': 'Quality and timeliness of delivered work',
  'technical-capability': 'Depth of technical and product expertise',
  'collaboration': 'Communication and internal collaboration',
  'commercial-value': 'Commercial contribution and pipeline value',
  'compliance': 'Security, legal and regulatory compliance'
}
