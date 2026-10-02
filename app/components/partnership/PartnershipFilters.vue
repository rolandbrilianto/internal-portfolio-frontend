<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { PartnerCategory, PartnershipStatus } from '~/types/partner'
import type { PartnershipType } from '~/types/partnership'
import {
  PARTNERSHIP_TYPE_LABELS,
  PARTNER_CATEGORY_LABELS,
  PARTNERSHIP_STATUS_LABELS
} from '~/utils/formatters'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = usePartnershipStore()

const categories = toOptions<PartnerCategory>(PARTNER_CATEGORY_LABELS)
const stages = toOptions(PARTNERSHIP_STATUS_LABELS)
const types = toOptions<PartnershipType>(PARTNERSHIP_TYPE_LABELS)
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
          placeholder="Partnership, reference, partner…"
          class="w-full"
          @update:model-value="store.filters.search = $event"
        />
      </UFormField>

      <CommonFilterSelect
        label="Stage"
        :items="stages"
        :model-value="store.filters.stages"
        @update:model-value="store.filters.stages = $event as PartnershipStatus[]"
      />

      <CommonFilterSelect
        label="Type"
        :items="types"
        :model-value="store.filters.types"
        @update:model-value="store.filters.types = $event as PartnershipType[]"
      />

      <CommonFilterSelect
        label="Category"
        :items="categories"
        :model-value="store.filters.categories"
        @update:model-value="store.filters.categories = $event as PartnerCategory[]"
      />

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
