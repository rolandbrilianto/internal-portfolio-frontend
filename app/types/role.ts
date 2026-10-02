/**
 * Role definitions mirror the BRD "User Roles & Personas" section.
 * These are presentation-only personas used for frontend role preview.
 */
export type AppRoleKey = 'super-admin' | 'commercial' | 'engineering'

export interface AppRoleDefinition {
  key: AppRoleKey
  label: string
  shortLabel: string
  description: string
  focus: string[]
  icon: string
}

export interface RoleProfile {
  role: AppRoleKey
  dashboard: 'executive' | 'commercial' | 'engineering'
  availableNavigation: string[]
}
