<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { NotificationCategory, NotificationSeverity, NotificationType } from '~/types/notification'
import {
  NOTIFICATION_CATEGORY_LABELS,
  NOTIFICATION_TYPE_LABELS
} from '~/utils/formatters'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = useNotificationStore()

const types = toOptions<NotificationType>(NOTIFICATION_TYPE_LABELS)

const categories = toOptions<NotificationCategory>(NOTIFICATION_CATEGORY_LABELS)

const severities: SelectOption[] = [
  { value: 'info', label: 'Information' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'critical', label: 'Critical' }
]
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs p-3">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-end">
      <UFormField
        label="Search"
        name="search"
        class="flex-1"
      >
        <UInput
          :model-value="store.filters.search"
          icon="i-lucide-search"
          placeholder="Title, body, reference…"
          class="w-full"
          @update:model-value="store.filters.search = $event"
        />
      </UFormField>

      <CommonFilterSelect
        label="Type"
        :items="types"
        :model-value="store.filters.types"
        @update:model-value="store.filters.types = $event as NotificationType[]"
      />

      <CommonFilterSelect
        label="Severity"
        :items="severities"
        :model-value="store.filters.severities"
        @update:model-value="store.filters.severities = $event as NotificationSeverity[]"
      />

      <CommonFilterSelect
        label="Category"
        :items="categories"
        :model-value="store.filters.categories"
        @update:model-value="store.filters.categories = $event as NotificationCategory[]"
      />

      <UFormField
        label="Unread only"
        name="unread"
        class="lg:w-40"
      >
        <USwitch
          :model-value="store.filters.unreadOnly"
          aria-label="Show unread notifications only"
          @update:model-value="store.filters.unreadOnly = $event"
        />
      </UFormField>

      <UButton
        v-if="store.hasActiveFilters"
        label="Reset"
        icon="i-lucide-filter-x"
        color="neutral"
        variant="subtle"
        size="sm"
        class="lg:mb-1"
        @click="store.resetFilters()"
      />
    </div>
  </div>
</template>
