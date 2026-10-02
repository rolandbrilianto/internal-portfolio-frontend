import type { AppRoleKey } from './role'

export interface NavigationChild {
  label: string
  to: string
  icon?: string
  description?: string
  roles: AppRoleKey[]
}

export interface NavigationItem {
  key: string
  label: string
  icon: string
  to?: string
  roles: AppRoleKey[]
  children?: NavigationChild[]
}

export interface NavigationSection {
  key: string
  label: string
  roles: AppRoleKey[]
  items: NavigationItem[]
}

export interface BreadcrumbEntry {
  label: string
  to?: string
}
