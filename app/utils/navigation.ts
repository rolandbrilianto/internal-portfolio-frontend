import type { NavigationSection } from '~/types/navigation'
import type { AppRoleKey } from '~/types/role'
import { ROLE_DEFINITIONS } from './constants'

const ALL_ROLES: AppRoleKey[] = ROLE_DEFINITIONS.map(role => role.key)

/**
 * Navigation structure derived from the BRD modules.
 * `roles` only drives the frontend preview — no authorization is implemented.
 */
export const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    key: 'workspace',
    label: 'Workspace',
    roles: ALL_ROLES,
    items: [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: 'i-lucide-layout-dashboard',
        to: '/dashboard',
        roles: ALL_ROLES
      }
    ]
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    roles: ALL_ROLES,
    items: [
      {
        key: 'portfolio-directory',
        label: 'Portfolio',
        icon: 'i-lucide-folder-kanban',
        roles: ALL_ROLES,
        children: [
          {
            label: 'Portfolio Directory',
            to: '/portfolio',
            icon: 'i-lucide-list',
            roles: ALL_ROLES
          },
          {
            label: 'Portfolio Dashboard',
            to: '/portfolio/dashboard',
            icon: 'i-lucide-chart-no-axes-combined',
            roles: ALL_ROLES
          }
        ]
      }
    ]
  },
  {
    key: 'partnership',
    label: 'Partnership',
    roles: ALL_ROLES,
    items: [
      {
        key: 'partner-directory',
        label: 'Partnership',
        icon: 'i-lucide-handshake',
        roles: ALL_ROLES,
        children: [
          {
            label: 'Partner Directory',
            to: '/partners',
            icon: 'i-lucide-users',
            roles: ALL_ROLES
          },
          {
            label: 'Partnership Pipeline',
            to: '/partnership',
            icon: 'i-lucide-kanban',
            roles: ALL_ROLES
          },
          {
            label: 'Partner Evaluation',
            to: '/evaluation',
            icon: 'i-lucide-clipboard-check',
            roles: ALL_ROLES
          },
          {
            label: 'Enablement & Co-Marketing',
            to: '/enablement',
            icon: 'i-lucide-graduation-cap',
            roles: ALL_ROLES
          }
        ]
      }
    ]
  },
  {
    key: 'management',
    label: 'Management',
    roles: ALL_ROLES,
    items: [
      {
        key: 'documents',
        label: 'Documents',
        icon: 'i-lucide-folder-lock',
        to: '/documents',
        roles: ALL_ROLES
      },
      {
        key: 'notifications',
        label: 'Notifications',
        icon: 'i-lucide-bell',
        to: '/notifications',
        roles: ALL_ROLES
      }
    ]
  },
  {
    key: 'administration',
    label: 'Administration',
    roles: ['super-admin'],
    items: [
      {
        key: 'admin',
        label: 'Administration',
        icon: 'i-lucide-settings-2',
        roles: ['super-admin'],
        children: [
          {
            label: 'Overview',
            to: '/admin',
            icon: 'i-lucide-gauge',
            roles: ['super-admin']
          },
          {
            label: 'CMS / Content Management',
            to: '/admin/content',
            icon: 'i-lucide-file-pen-line',
            roles: ['super-admin']
          },
          {
            label: 'User Management',
            to: '/admin/users',
            icon: 'i-lucide-user-cog',
            roles: ['super-admin']
          },
          {
            label: 'Audit Trail',
            to: '/admin/audit-trail',
            icon: 'i-lucide-scroll-text',
            roles: ['super-admin']
          }
        ]
      }
    ]
  }
]

export const SETTINGS_NAV_ITEM = {
  key: 'settings',
  label: 'Settings',
  icon: 'i-lucide-settings',
  to: '/settings',
  roles: ALL_ROLES
} as const
