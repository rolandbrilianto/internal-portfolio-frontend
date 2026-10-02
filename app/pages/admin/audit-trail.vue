<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { AuditEntry, AuditSeverity } from '~/types/admin'
import {
  AUDIT_ACTION_ICONS,
  AUDIT_ACTION_LABELS,
  AUDIT_MODULE_LABELS,
  AUDIT_SEVERITY_COLORS,
  AUDIT_SEVERITY_LABELS,
  formatDateTime
} from '~/utils/formatters'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = useAdministrationStore()

const modules = toOptions(AUDIT_MODULE_LABELS)
const severities = toOptions<AuditSeverity>(AUDIT_SEVERITY_LABELS)

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Compliance"
      title="Audit trail"
      description="Chronological register of privileged and business actions across modules."
      icon="i-lucide-scroll-text"
    >
      <template #actions>
        <UButton
          label="Export CSV"
          icon="i-lucide-download"
          color="neutral"
          variant="subtle"
          size="sm"
          disabled
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs p-3">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end">
        <UFormField
          label="Search"
          name="search"
          class="flex-1"
        >
          <UInput
            :model-value="store.auditFilters.search"
            icon="i-lucide-search"
            placeholder="Actor, target, reference…"
            class="w-full"
            @update:model-value="store.auditFilters.search = $event"
          />
        </UFormField>

        <CommonFilterSelect
          label="Module"
          :items="modules"
          :model-value="store.auditFilters.modules"
          @update:model-value="store.auditFilters.modules = $event as AuditEntry['module'][]"
        />

        <CommonFilterSelect
          label="Severity"
          :items="severities"
          :model-value="store.auditFilters.severities"
          @update:model-value="store.auditFilters.severities = $event as AuditSeverity[]"
        />

        <UButton
          v-if="store.hasAuditFilters"
          label="Reset"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="subtle"
          size="sm"
          class="lg:mb-1"
          @click="store.resetAuditFilters()"
        />
      </div>
    </div>

    <CommonLoadingState
      v-if="store.loading"
      label="Loading audit trail"
    />

    <CommonSectionCard
      v-else
      title="Audit register"
      description="Newest entries first. Export becomes available with a connected backend."
      icon="i-lucide-history"
      flush
    >
      <ol
        v-if="store.filteredAuditTrail.length"
        class="divide-y divide-default"
      >
        <li
          v-for="entry in store.filteredAuditTrail"
          :key="entry.id"
          class="flex flex-wrap items-start justify-between gap-3 px-4 py-3"
        >
          <div class="flex min-w-0 items-start gap-3">
            <UIcon
              :name="AUDIT_ACTION_ICONS[entry.action]"
              class="text-muted mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <div class="min-w-0">
              <p class="text-highlighted truncate text-sm">
                {{ AUDIT_ACTION_LABELS[entry.action] }} · {{ entry.target }}
              </p>
              <p class="text-muted text-xs">
                {{ entry.summary }}
              </p>
              <p class="text-dimmed mt-0.5 text-xs">
                {{ entry.reference }} · {{ entry.actor }}
                <template v-if="entry.ipAddress">
                  · {{ entry.ipAddress }}
                </template>
              </p>
            </div>
          </div>

          <div class="flex shrink-0 flex-col items-end gap-1.5">
            <CommonStatusBadge
              :label="AUDIT_SEVERITY_LABELS[entry.severity]"
              :color="AUDIT_SEVERITY_COLORS[entry.severity]"
              variant="subtle"
              size="xs"
            />
            <CommonStatusBadge
              :label="AUDIT_MODULE_LABELS[entry.module]"
              color="neutral"
              variant="outline"
              size="xs"
            />
            <span class="text-dimmed text-xs">
              {{ formatDateTime(entry.occurredAt) }}
            </span>
          </div>
        </li>
      </ol>

      <CommonEmptyState
        v-else
        :title="store.hasAuditFilters ? 'No audit entries match the filters' : 'No audit entries recorded'"
        :description="store.hasAuditFilters
          ? 'Adjust or reset the filters to see the full register.'
          : 'Audit entries are written when business and administrative actions occur on a connected backend.'"
        :icon="store.hasAuditFilters ? 'i-lucide-filter-x' : 'i-lucide-scroll-text'"
      >
        <UButton
          v-if="store.hasAuditFilters"
          label="Reset filters"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="subtle"
          size="sm"
          @click="store.resetAuditFilters()"
        />
      </CommonEmptyState>
    </CommonSectionCard>
  </div>
</template>
