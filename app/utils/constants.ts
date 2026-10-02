import type { AppRoleDefinition } from '~/types/role'
import type { PartnershipStage } from '~/types/partnership'

export const APP_NAME = 'Internal Portfolio & Partnership Management Platform'
export const APP_SHORT_NAME = 'Portfolio & Partnership'
export const APP_ORGANISATION = 'Internal Business Strategic Platform'

export const APP_DESCRIPTION
  = 'Internal system for recording, managing and monitoring the company project portfolio, partner database and partnership lifecycle.'

/** BRD FR-NT-02: reminder is issued 30 days before a contract expires. */
export const CONTRACT_EXPIRY_REMINDER_DAYS = 30

export const DEFAULT_PAGE_SIZE = 25
export const MAX_PAGE_SIZE = 100

/**
 * Roles from BRD section 5 "User Roles & Personas".
 * Presentation-only: no authentication is implemented in this frontend phase.
 */
export const ROLE_DEFINITIONS: AppRoleDefinition[] = [
  {
    key: 'super-admin',
    label: 'Super Admin / Executive',
    shortLabel: 'Executive',
    description: 'Full platform oversight, system configuration, user management and executive-level reporting.',
    focus: ['Portfolio health', 'Business performance', 'Administration'],
    icon: 'i-lucide-shield-check'
  },
  {
    key: 'commercial',
    label: 'Commercial / Partnership Officer',
    shortLabel: 'Commercial',
    description: 'Manages partner records, partnership documents, collaboration status and pipeline follow-up.',
    focus: ['Partnership pipeline', 'Partner verification', 'Contract expiry'],
    icon: 'i-lucide-handshake'
  },
  {
    key: 'engineering',
    label: 'Engineer / Project Lead',
    shortLabel: 'Engineering',
    description: 'Maintains technical portfolio data, reviews partner capabilities and tracks delivery status.',
    focus: ['Project portfolio', 'Technical capabilities', 'Resource utilisation'],
    icon: 'i-lucide-blocks'
  }
]

export const DEFAULT_ROLE = 'super-admin' as const

export const NAV_SECTION_KEYS = ['workspace', 'portfolio', 'partnership', 'management', 'administration'] as const

export const PHASE_LABELS = {
  phase1: 'Phase 1 — Portfolio Management',
  phase2: 'Phase 2 — Partnership Management',
  phase3: 'Phase 3 — Business Performance'
} as const

/** Out-of-scope capabilities described in the BRD scope matrix. */
export const DEFERRED_CAPABILITIES = [
  'Public access',
  'ERP system integration & data synchronisation',
  'External CRM real-time sync',
  'AI analytic dashboard summariser',
  'Smart Partner Matching & portfolio recommendation',
  'Business performance visualisation dashboard'
]

export const DATA_SOURCE_NOTICE = 'Frontend-only phase. Business records are loaded from the service layer once a backend API is connected.'

/** Kanban stage metadata for the partnership pipeline (BRD lifecycle order). */
export const PARTNERSHIP_STAGES: readonly {
  key: PartnershipStage
  label: string
  icon: string
}[] = [
  { key: 'draft', label: 'Draft', icon: 'i-lucide-pencil-line' },
  { key: 'under-review', label: 'Under Review', icon: 'i-lucide-scan-search' },
  { key: 'active', label: 'Active', icon: 'i-lucide-circle-check' },
  { key: 'expired', label: 'Expired', icon: 'i-lucide-calendar-x-2' },
  { key: 'terminated', label: 'Terminated', icon: 'i-lucide-circle-slash' }
]
