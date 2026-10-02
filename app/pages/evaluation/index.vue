<script setup lang="ts">
import type { EvaluationPeriod } from '~/types/evaluation'

definePageMeta({
  title: 'Partner Evaluation',
  breadcrumb: [{ label: 'Partnership', to: '/partners' }, { label: 'Evaluation' }]
})

useHead({ title: 'Partner Evaluation' })

const store = useEvaluationStore()

const selectedPeriod = ref<EvaluationPeriod>('quarterly')

const scoreValue = computed(() => {
  if (store.overallScore === null) return null
  return `${store.overallScore.toFixed(1)} / 5`
})

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Performance review"
      title="Partner evaluation"
      description="Record periodic evaluations against weighted criteria and capture renewal recommendations."
      icon="i-lucide-clipboard-check"
    >
      <template #actions>
        <CommonViewModeToggle
          :model-value="store.viewMode"
          @update:model-value="store.setViewMode($event)"
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <div class="grid gap-4 sm:grid-cols-3">
      <CommonMetricPlaceholder
        label="Evaluations recorded"
        :value="store.items.length > 0 ? String(store.items.length) : null"
        hint="Loaded through the service layer"
      />
      <CommonMetricPlaceholder
        label="Average score"
        :value="scoreValue"
        hint="Weighted across recorded criteria"
      />
      <CommonMetricPlaceholder
        label="Evaluation cadence"
        value="Quarterly"
        hint="FR-PT-05 default cadence"
      />
    </div>

    <EvaluationFilters />

    <EvaluationCadencePanel v-model:period="selectedPeriod" />

    <CommonLoadingState
      v-if="store.loading"
      label="Loading evaluations"
    />

    <template v-else-if="store.items.length > 0">
      <div class="flex items-center justify-between gap-3">
        <p class="text-muted text-xs">
          Showing {{ store.filteredItems.length }} of {{ store.items.length }} evaluations
        </p>
        <UButton
          v-if="store.hasActiveFilters"
          label="Reset filters"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="ghost"
          size="xs"
          @click="store.resetFilters()"
        />
      </div>

      <div
        v-if="store.viewMode === 'table'"
        class="hidden lg:block"
      >
        <EvaluationTable :evaluations="store.filteredItems" />
      </div>

      <div
        v-else
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <EvaluationCard
          v-for="evaluation in store.filteredItems"
          :key="evaluation.id"
          :evaluation="evaluation"
          expanded
        />
      </div>
    </template>

    <CommonEmptyState
      v-else
      title="No evaluations recorded yet"
      :description="store.hasActiveFilters
        ? 'No evaluations match the selected filters.'
        : 'Evaluations are created from an active partnership once its first review period is due.'"
      :icon="store.hasActiveFilters ? 'i-lucide-filter-x' : 'i-lucide-clipboard-check'"
      size="lg"
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
      <UButton
        v-else
        to="/partnership"
        label="Open partnership pipeline"
        icon="i-lucide-kanban"
        color="neutral"
        variant="subtle"
        size="sm"
      />
    </CommonEmptyState>
  </div>
</template>
