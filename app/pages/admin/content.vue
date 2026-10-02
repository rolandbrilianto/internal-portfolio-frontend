<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { ContentType, ContentWorkflow } from '~/types/admin'
import {
  CONTENT_TYPE_LABELS,
  CONTENT_WORKFLOW_COLORS,
  CONTENT_WORKFLOW_LABELS,
  formatDateTime
} from '~/utils/formatters'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = useAdministrationStore()

const types = toOptions<ContentType>(CONTENT_TYPE_LABELS)
const workflows = toOptions<ContentWorkflow>(CONTENT_WORKFLOW_LABELS)

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Content management"
      title="CMS / content"
      description="Draft, schedule, publish and archive platform content across modules."
      icon="i-lucide-file-pen-line"
    />

    <CommonDataSourceNotice />

    <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs p-3">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-end">
        <UFormField
          label="Search"
          name="search"
          class="flex-1"
        >
          <UInput
            :model-value="store.contentFilters.search"
            icon="i-lucide-search"
            placeholder="Title, reference…"
            class="w-full"
            @update:model-value="store.contentFilters.search = $event"
          />
        </UFormField>

        <CommonFilterSelect
          label="Content type"
          :items="types"
          :model-value="store.contentFilters.types"
          @update:model-value="store.contentFilters.types = $event as ContentType[]"
        />

        <CommonFilterSelect
          label="Workflow"
          :items="workflows"
          :model-value="store.contentFilters.workflows"
          @update:model-value="store.contentFilters.workflows = $event as ContentWorkflow[]"
        />

        <UButton
          v-if="store.hasContentFilters"
          label="Reset"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="subtle"
          size="sm"
          class="lg:mb-1"
          @click="store.resetContentFilters()"
        />
      </div>
    </div>

    <CommonLoadingState
      v-if="store.loading"
      label="Loading content items"
    />

    <CommonSectionCard
      v-else
      title="Content register"
      description="Draft, scheduled, published and archived records."
      icon="i-lucide-files"
      flush
    >
      <ul
        v-if="store.filteredContent.length"
        class="divide-y divide-default"
      >
        <li
          v-for="item in store.filteredContent"
          :key="item.id"
          class="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
        >
          <div class="min-w-0">
            <p class="text-highlighted truncate text-sm font-medium">
              {{ item.title }}
            </p>
            <p class="text-dimmed truncate text-xs">
              {{ item.reference }} · v{{ item.version }} · updated {{ formatDateTime(item.updatedAt) }}
            </p>
          </div>
          <div class="flex shrink-0 items-center gap-2">
            <CommonStatusBadge
              :label="CONTENT_TYPE_LABELS[item.type]"
              color="neutral"
              variant="outline"
              size="xs"
            />
            <CommonStatusBadge
              :label="CONTENT_WORKFLOW_LABELS[item.workflow]"
              :color="CONTENT_WORKFLOW_COLORS[item.workflow]"
              variant="subtle"
              size="xs"
            />
          </div>
        </li>
      </ul>

      <CommonEmptyState
        v-else
        :title="store.hasContentFilters ? 'No content items match the filters' : 'No content items available'"
        :description="store.hasContentFilters
          ? 'Adjust or reset the filters to see the full register.'
          : 'Portfolio projects, partner profiles, partnerships and enablement content appear here once records exist.'"
        :icon="store.hasContentFilters ? 'i-lucide-filter-x' : 'i-lucide-file-pen-line'"
      >
        <UButton
          v-if="store.hasContentFilters"
          label="Reset filters"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="subtle"
          size="sm"
          @click="store.resetContentFilters()"
        />
      </CommonEmptyState>
    </CommonSectionCard>
  </div>
</template>
