<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio'
import { PORTFOLIO_SCALE_LABELS } from '~/utils/formatters'

const props = defineProps<{
  projects: PortfolioProject[]
  emptyTitle: string
  emptyDescription?: string
}>()

const store = usePortfolioStore()

const columns = [
  { key: 'project', label: 'Project', class: 'min-w-64' },
  { key: 'industry', label: 'Industry' },
  { key: 'scale', label: 'Scale' },
  { key: 'year', label: 'Year', align: 'right' as const },
  { key: 'partners', label: 'Partners', align: 'right' as const },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions', align: 'right' as const }
]
</script>

<template>
  <CommonDataTable
    :columns="columns"
    caption="Portfolio directory"
    :empty="props.projects.length === 0"
    :empty-title="emptyTitle"
    :empty-description="emptyDescription ?? 'Data will appear here once project records are added.'"
    empty-icon="i-lucide-folder-open"
    min-width="58rem"
  >
    <tr
      v-for="project in projects"
      :key="project.id"
      class="hover:bg-elevated/40 transition-colors"
    >
      <td class="px-4 py-3">
        <div class="flex items-start gap-2">
          <UBadge
            v-if="project.featured"
            color="primary"
            variant="subtle"
            size="xs"
          >
            Featured
          </UBadge>
          <div class="min-w-0">
            <NuxtLink
              :to="`/portfolio/${project.id}`"
              class="text-highlighted block truncate text-sm font-medium hover:underline"
            >
              {{ project.name }}
            </NuxtLink>
            <p class="text-dimmed truncate text-xs">
              {{ project.reference }}
            </p>
          </div>
        </div>
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ project.industry || '—' }}
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ PORTFOLIO_SCALE_LABELS[project.scale] }}
      </td>
      <td class="text-muted px-4 py-3 text-sm tabular-nums">
        {{ project.year }}
      </td>
      <td class="text-muted px-4 py-3 text-sm tabular-nums">
        {{ project.partners.length }}
      </td>
      <td class="px-4 py-3">
        <PortfolioStatusBadge :status="project.status" />
      </td>
      <td class="px-4 py-3 text-right">
        <UButton
          :to="`/portfolio/${project.id}`"
          icon="i-lucide-arrow-up-right"
          color="neutral"
          variant="ghost"
          size="xs"
          :aria-label="`Open ${project.name}`"
        />
      </td>
    </tr>

    <template #empty-action>
      <UButton
        label="Clear filters"
        icon="i-lucide-filter-x"
        color="neutral"
        variant="subtle"
        size="xs"
        :disabled="!store.hasActiveFilters"
        @click="store.resetFilters()"
      />
    </template>
  </CommonDataTable>
</template>
