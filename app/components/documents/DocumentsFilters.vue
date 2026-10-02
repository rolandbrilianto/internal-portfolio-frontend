<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { DocumentCategory, DocumentStatus } from '~/types/document'
import {
  DOCUMENT_CATEGORY_LABELS,
  DOCUMENT_STATUS_LABELS
} from '~/utils/formatters'
import { CONTRACT_EXPIRY_REMINDER_DAYS } from '~/utils/constants'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = useDocumentStore()

const categories = toOptions<DocumentCategory>(DOCUMENT_CATEGORY_LABELS)
const statuses = toOptions<DocumentStatus>(DOCUMENT_STATUS_LABELS)

const expiryOptions: SelectOption[] = [
  { value: 'expiring', label: `Expiring within ${CONTRACT_EXPIRY_REMINDER_DAYS} days` },
  { value: 'all', label: 'All documents' }
]

const expiryValue = computed(() =>
  store.filters.expiringWithinDays === null ? 'all' : 'expiring'
)

function onExpiryChange(value: string) {
  store.filters.expiringWithinDays = value === 'expiring' ? CONTRACT_EXPIRY_REMINDER_DAYS : null
}
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
          placeholder="Title, reference, partner…"
          class="w-full"
          @update:model-value="store.filters.search = $event"
        />
      </UFormField>

      <CommonFilterSelect
        label="Category"
        :items="categories"
        :model-value="store.filters.categories"
        @update:model-value="store.filters.categories = $event as DocumentCategory[]"
      />

      <CommonFilterSelect
        label="Status"
        :items="statuses"
        :model-value="store.filters.statuses"
        @update:model-value="store.filters.statuses = $event as DocumentStatus[]"
      />

      <UFormField
        label="Expiry"
        name="expiry"
        class="lg:w-64"
      >
        <USelect
          :model-value="expiryValue"
          :items="expiryOptions"
          class="w-full"
          @update:model-value="onExpiryChange($event as string)"
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
