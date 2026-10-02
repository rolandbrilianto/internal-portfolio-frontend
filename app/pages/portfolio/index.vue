<script setup lang="ts">
import { portfolioService } from '~/services/portfolio/portfolio.service'

definePageMeta({
  title: 'Portfolio Directory',
  breadcrumb: [{ label: 'Portfolio', to: '/portfolio' }, { label: 'Directory' }]
})

useHead({ title: 'Portfolio Directory' })

const store = usePortfolioStore()
const service = portfolioService

const industries = ref<string[]>([])
const technologies = ref<string[]>([])
const serviceTypes = ref<string[]>([])
const years = ref<number[]>([])

async function loadFilterOptions() {
  const [industryResult, technologyResult, serviceResult, yearResult] = await Promise.all([
    service.fetchIndustries(),
    service.fetchTechnologies(),
    service.fetchServiceTypes(),
    service.fetchYears()
  ])
  industries.value = industryResult.data
  technologies.value = technologyResult.data
  serviceTypes.value = serviceResult.data
  years.value = [...yearResult.data].sort((a, b) => b - a)
}

onMounted(loadFilterOptions)
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Portfolio management"
      title="Portfolio Directory"
      description="Search and filter the internal catalogue of projects, products and delivery experience. Entries are recorded by the responsible units."
    >
      <template #actions>
        <CommonViewModeToggle
          :model-value="store.viewMode"
          @update:model-value="store.setViewMode($event)"
        />
        <UButton
          to="/portfolio/dashboard"
          label="Portfolio dashboard"
          icon="i-lucide-chart-no-axes-combined"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </template>
    </CommonPageHeader>

    <PortfolioFilters
      :industries="industries"
      :technologies="technologies"
      :service-types="serviceTypes"
      :years="years"
      @reset="store.resetFilters()"
    />

    <UAlert
      v-if="store.error"
      color="error"
      variant="subtle"
      icon="i-lucide-circle-alert"
      title="Portfolio data could not be loaded"
      :description="store.error"
      class="mb-4"
    />

    <CommonLoadingState v-if="store.loading" />

    <template v-else>
      <PortfolioEmptyState
        v-if="store.filteredItems.length === 0"
        :filtered="store.hasActiveFilters"
        class="border-default rounded-lg border bg-(--ui-bg) shadow-xs"
      >
        <UButton
          v-if="store.hasActiveFilters"
          label="Reset filters"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="subtle"
          size="sm"
          @click="store.resetFilters()"
        />
      </PortfolioEmptyState>

      <PortfolioTable
        v-else-if="store.viewMode === 'table'"
        :projects="store.filteredItems"
        empty-title="No portfolio data available yet"
      />

      <div
        v-else
        class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <PortfolioCard
          v-for="project in store.filteredItems"
          :key="project.id"
          :project="project"
        />
      </div>
    </template>
  </div>
</template>
