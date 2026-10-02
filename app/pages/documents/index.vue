<script setup lang="ts">
definePageMeta({
  title: 'Documents',
  breadcrumb: [{ label: 'Documents' }]
})

useHead({ title: 'Documents' })

const store = useDocumentStore()

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Document archive"
      title="Documents"
      description="Archived legalities, contracts and certifications with chronological issuance tracking and expiry reminders."
      icon="i-lucide-folder-lock"
    >
      <template #actions>
        <CommonViewModeToggle
          :model-value="store.viewMode"
          @update:model-value="store.setViewMode($event)"
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <CommonMetricPlaceholder
        label="Archived documents"
        :value="store.counts.total > 0 ? String(store.counts.total) : null"
        hint="Loaded through the service layer"
      />
      <CommonMetricPlaceholder
        label="Awaiting verification"
        :value="store.counts.pending > 0 ? String(store.counts.pending) : null"
        hint="FR-PT-05 verification queue"
      />
      <CommonMetricPlaceholder
        label="Expiring soon"
        :value="store.counts.expiringSoon > 0 ? String(store.counts.expiringSoon) : null"
        hint="Within the 30-day reminder window"
      />
      <CommonMetricPlaceholder
        label="Rejected"
        :value="store.counts.rejected > 0 ? String(store.counts.rejected) : null"
        hint="Awaiting re-upload"
      />
    </div>

    <DocumentsFilters />

    <CommonLoadingState
      v-if="store.loading"
      label="Loading documents"
    />

    <template v-else-if="store.items.length > 0">
      <div class="flex items-center justify-between gap-3">
        <p class="text-muted text-xs">
          Showing {{ store.filteredItems.length }} of {{ store.items.length }} documents
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

      <DocumentsTable :documents="store.filteredItems" />
    </template>

    <CommonEmptyState
      v-else
      title="No documents archived yet"
      :description="store.hasActiveFilters
        ? 'No documents match the selected filters.'
        : 'Documents are archived during partner registration and contract management.'"
      :icon="store.hasActiveFilters ? 'i-lucide-filter-x' : 'i-lucide-folder-lock'"
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
