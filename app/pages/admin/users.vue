<script setup lang="ts">
import type { AppRoleKey } from '~/types/role'
import {
  MANAGED_USER_STATUS_COLORS,
  MANAGED_USER_STATUS_LABELS,
  formatDateTime
} from '~/utils/formatters'
import { ROLE_DEFINITIONS } from '~/utils/constants'

definePageMeta({
  title: 'User management',
  breadcrumb: [{ label: 'Administration', to: '/admin' }, { label: 'Users' }]
})

useHead({ title: 'User Management' })

const store = useAdministrationStore()

const roleLabels = computed<Record<AppRoleKey, string>>(() =>
  Object.fromEntries(ROLE_DEFINITIONS.map(role => [role.key, role.label])) as Record<AppRoleKey, string>
)

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Access control"
      title="User management"
      description="Internal accounts, role assignment and lifecycle status."
      icon="i-lucide-user-cog"
    />

    <CommonDataSourceNotice />

    <UAlert
      color="warning"
      variant="subtle"
      icon="i-lucide-shield-alert"
      title="No accounts in this phase"
      description="Authentication, invitations and SSO are not implemented. No user records are fabricated — the register stays empty until an identity provider is connected."
    />

    <CommonLoadingState
      v-if="store.loading"
      label="Loading managed users"
    />

    <CommonSectionCard
      v-else
      title="User register"
      description="Accounts with an assigned platform role."
      icon="i-lucide-users"
      flush
    >
      <ul
        v-if="store.users.length"
        class="divide-y divide-default"
      >
        <li
          v-for="user in store.users"
          :key="user.id"
          class="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
        >
          <div class="min-w-0">
            <p class="text-highlighted truncate text-sm font-medium">
              {{ user.fullName }}
            </p>
            <p class="text-dimmed truncate text-xs">
              {{ user.email }} · {{ user.unit }}
            </p>
          </div>
          <div class="flex shrink-0 flex-wrap items-center gap-2">
            <CommonStatusBadge
              :label="roleLabels[user.role] ?? user.role"
              color="neutral"
              variant="outline"
              size="xs"
            />
            <CommonStatusBadge
              :label="MANAGED_USER_STATUS_LABELS[user.status]"
              :color="MANAGED_USER_STATUS_COLORS[user.status]"
              variant="subtle"
              size="xs"
            />
            <span class="text-dimmed text-xs">
              {{ formatDateTime(user.lastActiveAt) }}
            </span>
          </div>
        </li>
      </ul>

      <CommonEmptyState
        v-else
        title="No managed users available"
        description="User records appear here once the identity provider integration is implemented."
        icon="i-lucide-user-x"
      />
    </CommonSectionCard>
  </div>
</template>
