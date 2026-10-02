<script setup lang="ts">
import { ROLE_DEFINITIONS } from '~/utils/constants'

definePageMeta({
  title: 'Administration',
  breadcrumb: [{ label: 'Administration' }]
})

useHead({ title: 'Administration' })

const roleStore = useRoleStore()
const store = useAdministrationStore()

const isAdministrator = computed(() => roleStore.hasRole(['super-admin']))

const modules = [
  { label: 'Overview', description: 'Platform modules, data sources and integration status.', icon: 'i-lucide-gauge', to: '/admin' },
  { label: 'CMS / Content', description: 'Draft, schedule, publish and archive platform content.', icon: 'i-lucide-file-pen-line', to: '/admin/content' },
  { label: 'User management', description: 'Role assignment and account lifecycle placeholders.', icon: 'i-lucide-user-cog', to: '/admin/users' },
  { label: 'Audit trail', description: 'Immutable register of privileged and business actions.', icon: 'i-lucide-scroll-text', to: '/admin/audit-trail' }
]

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Platform control"
      title="Administration"
      description="Content management, user roles and audit visibility for the internal platform."
      icon="i-lucide-settings-2"
    />

    <CommonDataSourceNotice />

    <UAlert
      v-if="!isAdministrator"
      color="warning"
      variant="subtle"
      icon="i-lucide-shield-alert"
      title="Read-only preview"
      :description="`Administration modules are reserved for the ${ROLE_DEFINITIONS.find(role => role.key === 'super-admin')?.label ?? 'administrator'} preview. Role preview does not enforce authorization.`"
    />

    <div class="grid gap-4 sm:grid-cols-2">
      <CommonSectionCard
        v-for="module in modules"
        :key="module.to"
        :title="module.label"
        :description="module.description"
        :icon="module.icon"
      >
        <template #actions>
          <UButton
            :to="module.to"
            label="Open"
            icon="i-lucide-arrow-right"
            trailing
            color="neutral"
            variant="subtle"
            size="xs"
          />
        </template>

        <dl class="grid gap-3 sm:grid-cols-3">
          <CommonMetricPlaceholder
            label="Content items"
            :value="store.content.length > 0 ? String(store.content.length) : null"
          />
          <CommonMetricPlaceholder
            label="Managed users"
            :value="store.users.length > 0 ? String(store.users.length) : null"
          />
          <CommonMetricPlaceholder
            label="Audit entries"
            :value="store.auditTrail.length > 0 ? String(store.auditTrail.length) : null"
          />
        </dl>
      </CommonSectionCard>
    </div>

    <CommonSectionCard
      title="Integration status"
      description="Every data source stays disconnected in this phase by design."
      icon="i-lucide-plug-zap"
    >
      <ul class="divide-y divide-default">
        <li
          v-for="source in [
            { label: 'Core REST API', detail: 'Portfolio, partners, partnerships and documents' },
            { label: 'ERP synchronisation', detail: 'Deferred capability described in the BRD scope matrix' },
            { label: 'External CRM', detail: 'Deferred capability described in the BRD scope matrix' },
            { label: 'Identity provider', detail: 'Authentication and SSO are not implemented' }
          ]"
          :key="source.label"
          class="flex flex-wrap items-center justify-between gap-3 py-3"
        >
          <div class="min-w-0">
            <p class="text-highlighted text-sm font-medium">
              {{ source.label }}
            </p>
            <p class="text-muted text-xs">
              {{ source.detail }}
            </p>
          </div>
          <CommonStatusBadge
            label="Not connected"
            icon="i-lucide-plug"
            color="neutral"
            variant="outline"
            size="xs"
          />
        </li>
      </ul>
    </CommonSectionCard>
  </div>
</template>
