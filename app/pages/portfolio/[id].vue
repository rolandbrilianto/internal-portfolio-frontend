<script setup lang="ts">
const route = useRoute()
const store = usePortfolioStore()

const id = computed(() => String(route.params.id ?? ''))
const project = computed(() => store.findById(id.value))

onMounted(() => {
  if (!store.loaded) store.load()
})

useHead({ title: computed(() => project.value?.name ?? 'Portfolio record') })
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Portfolio record"
      :title="project?.name ?? 'Portfolio record unavailable'"
      :description="project?.summary ?? 'The requested portfolio record could not be found in the loaded dataset.'"
      :badge="project?.reference"
    >
      <template #actions>
        <UButton
          to="/portfolio"
          label="Back to directory"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </template>
      <template #meta>
        <div
          v-if="project"
          class="flex flex-wrap items-center gap-2"
        >
          <PortfolioStatusBadge :status="project.status" />
          <UBadge
            v-if="project.featured"
            color="primary"
            variant="subtle"
            size="sm"
          >
            Featured
          </UBadge>
          <span class="text-dimmed text-xs">{{ project.industry }}</span>
        </div>
      </template>
    </CommonPageHeader>

    <CommonLoadingState v-if="store.loading" />

    <PortfolioEmptyState
      v-else-if="!project"
      title="No portfolio record available"
      description="Portfolio records will appear here once they have been loaded through the service layer."
      class="border-default rounded-lg border bg-(--ui-bg) shadow-xs"
    >
      <UButton
        to="/portfolio"
        label="Back to directory"
        icon="i-lucide-arrow-left"
        size="sm"
        color="neutral"
        variant="subtle"
      />
    </PortfolioEmptyState>

    <PortfolioDetail
      v-else
      :project="project"
    />
  </div>
</template>
