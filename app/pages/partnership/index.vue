<script setup lang="ts">
import { PARTNERSHIP_STAGES } from '~/utils/constants'

definePageMeta({
  title: 'Partnership Pipeline',
  breadcrumb: [{ label: 'Partnership', to: '/partners' }, { label: 'Pipeline' }]
})

useHead({ title: 'Partnership Pipeline' })

const store = usePartnershipStore()

const stageColumns = computed(() =>
  PARTNERSHIP_STAGES.map(stage => ({
    ...stage,
    partnerships: store.byStage(stage.key),
    count: store.filteredItems.filter(item => item.stage === stage.key).length
  }))
)

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Partnership lifecycle"
      title="Partnership pipeline"
      description="Track partnerships from draft through review to active, expired and terminated stages."
      icon="i-lucide-kanban"
    >
      <template #actions>
        <CommonViewModeToggle
          :model-value="store.viewMode"
          @update:model-value="store.setViewMode($event)"
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <PartnershipFilters />

    <CommonLoadingState
      v-if="store.loading"
      label="Loading partnerships"
    />

    <template v-else-if="store.hasRecords">
      <div class="flex items-center justify-between gap-3">
        <p class="text-muted text-xs">
          Showing {{ store.filteredItems.length }} of {{ store.items.length }} partnerships
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
        <PartnershipTable :partnerships="store.filteredItems" />
      </div>

      <div
        v-else
        class="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
      >
        <PartnershipStageColumn
          v-for="stage in stageColumns"
          :key="stage.key"
          :stage="stage.key"
          :label="stage.label"
          :icon="stage.icon"
          :partnerships="stage.partnerships"
          :count="stage.count"
        />
      </div>
    </template>

    <CommonEmptyState
      v-else
      title="No partnership records available yet"
      description="Partnerships are created from the partner directory once internal verification is complete."
      icon="i-lucide-kanban"
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
        to="/partners"
        label="Open partner directory"
        icon="i-lucide-users"
        color="neutral"
        variant="subtle"
        size="sm"
      />
    </CommonEmptyState>
  </div>
</template>
