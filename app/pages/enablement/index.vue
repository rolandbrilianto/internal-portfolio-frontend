<script setup lang="ts">
definePageMeta({
  title: 'Enablement & Co-Marketing',
  breadcrumb: [{ label: 'Partnership', to: '/partners' }, { label: 'Enablement' }]
})

useHead({ title: 'Enablement & Co-Marketing' })

const store = useEnablementStore()

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Partner readiness"
      title="Enablement & co-marketing"
      description="Track knowledge, sales and marketing enablement delivered to partners, including co-marketing assets."
      icon="i-lucide-graduation-cap"
    >
      <template #actions>
        <CommonViewModeToggle
          :model-value="store.viewMode"
          @update:model-value="store.setViewMode($event)"
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <EnablementFilters />

    <EnablementTrackSummaryCards :summaries="store.trackSummaries" />

    <div class="grid gap-5 xl:grid-cols-3">
      <CommonSectionCard
        class="xl:col-span-2"
        title="Activity register"
        description="Chronological enablement activities by scheduled date."
        icon="i-lucide-list-checks"
      >
        <CommonLoadingState
          v-if="store.loading"
          label="Loading enablement activities"
        />

        <template v-else-if="store.items.length > 0">
          <div class="mb-3 flex items-center justify-between gap-3">
            <p class="text-muted text-xs">
              Showing {{ store.filteredItems.length }} of {{ store.items.length }} activities
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

          <EnablementTable
            v-if="store.viewMode === 'table'"
            :activities="store.filteredItems"
          />

          <EnablementTimeline
            v-else
            :activities="store.timeline"
            :limit="20"
          />
        </template>

        <CommonEmptyState
          v-else
          title="No enablement activities recorded"
          :description="store.hasActiveFilters
            ? 'No activities match the selected filters.'
            : 'Enablement is scheduled once a partnership reaches an active stage.'"
          :icon="store.hasActiveFilters ? 'i-lucide-filter-x' : 'i-lucide-graduation-cap'"
          size="sm"
          class="border border-dashed"
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
      </CommonSectionCard>

      <CommonSectionCard
        title="Activity timeline"
        description="Scheduled enablement across all tracks."
        icon="i-lucide-timeline"
      >
        <EnablementTimeline
          :activities="store.timeline"
          :limit="6"
        />
      </CommonSectionCard>
    </div>

    <CommonSectionCard
      title="Co-marketing assets"
      description="Shared campaign material produced with partners."
      icon="i-lucide-megaphone"
    >
      <CommonEmptyState
        title="No co-marketing assets archived"
        description="Joint campaign assets, decks and one-pagers are archived against the partnership once approved."
        icon="i-lucide-folder-open"
        size="sm"
        class="border border-dashed"
      />
    </CommonSectionCard>
  </div>
</template>
