<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { EnablementStatus, EnablementTrack } from '~/types/enablement'
import {
  ENABLEMENT_STATUS_LABELS,
  ENABLEMENT_TRACK_LABELS
} from '~/utils/formatters'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = useEnablementStore()

const tracks = toOptions<EnablementTrack>(ENABLEMENT_TRACK_LABELS)
const statuses = toOptions<EnablementStatus>(ENABLEMENT_STATUS_LABELS)
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
          placeholder="Activity, partner, reference…"
          class="w-full"
          @update:model-value="store.filters.search = $event"
        />
      </UFormField>

      <CommonFilterSelect
        label="Track"
        :items="tracks"
        :model-value="store.filters.tracks"
        @update:model-value="store.filters.tracks = $event as EnablementTrack[]"
      />

      <CommonFilterSelect
        label="Status"
        :items="statuses"
        :model-value="store.filters.statuses"
        @update:model-value="store.filters.statuses = $event as EnablementStatus[]"
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
