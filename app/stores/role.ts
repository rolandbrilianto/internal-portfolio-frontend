import { defineStore } from 'pinia'
import type { AppRoleDefinition, AppRoleKey, RoleProfile } from '~/types/role'
import { DEFAULT_ROLE, ROLE_DEFINITIONS } from '~/utils/constants'

const ROLE_STORAGE_KEY = 'portfolio-partnership:role-preview'

const ROLE_DASHBOARD: Record<AppRoleKey, RoleProfile['dashboard']> = {
  'super-admin': 'executive',
  'commercial': 'commercial',
  'engineering': 'engineering'
}

/**
 * Frontend-only role preview (BRD section 5).
 * This is NOT authentication and grants no real access — it only changes
 * which dashboard and navigation sections are presented in the UI.
 */
export const useRoleStore = defineStore('role', () => {
  const roles = useState<AppRoleDefinition[]>('role:definitions', () => ROLE_DEFINITIONS)
  const currentRole = useState<AppRoleKey>('role:current', () => DEFAULT_ROLE)

  const currentRoleDefinition = computed<AppRoleDefinition>(
    () => roles.value.find(role => role.key === currentRole.value) ?? roles.value[0]!
  )

  const dashboardKind = computed<RoleProfile['dashboard']>(
    () => ROLE_DASHBOARD[currentRole.value]
  )

  function setRole(role: AppRoleKey) {
    if (roles.value.some(item => item.key === role)) {
      currentRole.value = role
      persist()
    }
  }

  function hasRole(allowed: AppRoleKey[]): boolean {
    return allowed.includes(currentRole.value)
  }

  function restore() {
    if (!import.meta.client) return
    const stored = window.localStorage.getItem(ROLE_STORAGE_KEY) as AppRoleKey | null
    if (stored && roles.value.some(role => role.key === stored)) {
      currentRole.value = stored
    }
  }

  function persist() {
    if (!import.meta.client) return
    window.localStorage.setItem(ROLE_STORAGE_KEY, currentRole.value)
  }

  return {
    roles,
    currentRole,
    currentRoleDefinition,
    dashboardKind,
    setRole,
    hasRole,
    restore,
    persist
  }
})
