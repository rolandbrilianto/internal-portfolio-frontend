<script setup lang="ts">
import type { PortfolioScale, PortfolioStatus } from '~/types/portfolio'
import type { SelectOption } from '~/types/common'
import { PORTFOLIO_SCALE_LABELS, PORTFOLIO_STATUS_LABELS } from '~/utils/formatters'

interface Props {
  industries: string[]
  technologies: string[]
  serviceTypes: string[]
  years: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{ reset: [] }>()

const store = usePortfolioStore()

const scaleOptions: SelectOption[] = Object.entries(PORTFOLIO_SCALE_LABELS)
  .map(([value, label]) => ({ value, label }))

const statusOptions: SelectOption[] = Object.entries(PORTFOLIO_STATUS_LABELS)
  .map(([value, label]) => ({ value, label }))

const industryOptions = computed<SelectOption[]>(() => props.industries.map(value => ({ value, label: value })))
const technologyOptions = computed<SelectOption[]>(() => props.technologies.map(value => ({ value, label: value })))
const serviceTypeOptions = computed<SelectOption[]>(() => props.serviceTypes.map(value => ({ value, label: value })))
const yearOptions = computed<SelectOption[]>(() => props.years.map(value => ({ value: String(value), label: String(value) })))
const selectedYears = computed<string[]>(() => store.filters.years.map(String))
const resultSummary = computed(() => {
  const total = store.items.length
  const visible = store.filteredItems.length
  return store.hasActiveFilters ? `${visible} of ${total} projects match the active filters` : `${total} projects`
})
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs space-y-4 p-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <UInput
        :model-value="store.filters.search"
        icon="i-lucide-search"
        placeholder="Search projects, references, industries or technologies"
        aria-label="Search the portfolio directory"
        class="w-full sm:max-w-sm"
        @update:model-value="store.filters.search = $event"
      />
      <div class="flex items-center gap-3">
        <p class="text-muted text-xs">
          {{ resultSummary }}
        </p>
        <UButton
          label="Reset"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="ghost"
          size="sm"
          :disabled="!store.hasActiveFilters"
          @click="emit('reset')"
        />
      </div>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CommonFilterSelect
        label="Industry"
        :items="industryOptions"
        :model-value="store.filters.industries"
        @update:model-value="store.filters.industries = $event"
      />
      <CommonFilterSelect
        label="Technology"
        :items="technologyOptions"
        :model-value="store.filters.technologies"
        @update:model-value="store.filters.technologies = $event"
      />
      <CommonFilterSelect
        label="Service type"
        :items="serviceTypeOptions"
        :model-value="store.filters.serviceTypes"
        @update:model-value="store.filters.serviceTypes = $event"
      />
      <CommonFilterSelect
        label="Year"
        :items="yearOptions"
        :model-value="selectedYears"
        @update:model-value="store.filters.years = $event.map(Number)"
      />
      <CommonFilterSelect
        label="Scale"
        :items="scaleOptions"
        :model-value="store.filters.scales"
        @update:model-value="store.filters.scales = $event as PortfolioScale[]"
      />
      <CommonFilterSelect
        label="Status"
        :items="statusOptions"
        :model-value="store.filters.statuses"
        @update:model-value="store.filters.statuses = $event as PortfolioStatus[]"
      />
    </div>

    <label class="text-muted flex w-fit cursor-pointer items-center gap-2 text-sm">
      <USwitch
        :model-value="store.filters.featuredOnly"
        aria-label="Show featured portfolio only"
        @update:model-value="store.filters.featuredOnly = $event"
      />
      Featured portfolio only
    </label>
  </div>
</template>
