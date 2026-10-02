<script setup lang="ts">
definePageMeta({
  title: 'Partners',
  breadcrumb: [{ label: 'Partners' }]
})

useHead({ title: 'Partners' })

const store = usePartnerStore()

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Partner directory"
      title="Partners"
      description="Track partner entities, verification state, capabilities and partnership contracts."
      icon="i-lucide-users"
    >
      <template #actions>
        <CommonViewModeToggle
          :model-value="store.viewMode"
          @update:model-value="store.setViewMode($event)"
        />
        <UButton
          to="/partners/create"
          label="Register partner"
          icon="i-lucide-user-plus"
          size="sm"
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <PartnerFilters />

    <CommonLoadingState
      v-if="store.loading"
      label="Loading partner records"
    />

    <template v-else-if="store.hasRecords">
      <div class="flex items-center justify-between gap-3">
        <p class="text-muted text-xs">
          Showing {{ store.filteredItems.length }} of {{ store.items.length }} partner records
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
        <PartnerTable :partners="store.filteredItems" />
      </div>

      <div
        v-else
        class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <PartnerCard
          v-for="partner in store.filteredItems"
          :key="partner.id"
          :partner="partner"
        />
      </div>
    </template>

    <PartnerEmptyState
      v-else
      :filtered="store.hasActiveFilters"
      action-label="Register the first partner"
      action-to="/partners/create"
      @reset="store.resetFilters()"
    />
  </div>
</template>
