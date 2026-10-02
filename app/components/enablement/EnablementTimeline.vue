<script setup lang="ts">
import type { EnablementActivity, EnablementStatus } from '~/types/enablement'
import {
  ENABLEMENT_STATUS_COLORS,
  ENABLEMENT_STATUS_LABELS,
  ENABLEMENT_TRACK_LABELS,
  formatDate
} from '~/utils/formatters'

const props = withDefaults(defineProps<{
  activities: EnablementActivity[]
  limit?: number
}>(), {
  limit: 5
})

const MARKER_COLORS: Record<EnablementStatus, string> = {
  'planned': 'border-default bg-default',
  'in-progress': 'border-primary bg-primary',
  'completed': 'border-success bg-success',
  'cancelled': 'border-dimmed bg-dimmed'
}

const visibleActivities = computed(() => props.activities.slice(0, props.limit))
const overflow = computed(() => Math.max(props.activities.length - props.limit, 0))
</script>

<template>
  <ol
    v-if="visibleActivities.length"
    class="relative space-y-4"
  >
    <li
      v-for="activity in visibleActivities"
      :key="activity.id"
      class="relative pl-6"
    >
      <span
        class="absolute top-1.5 left-0 size-2.5 rounded-full border-2"
        :class="MARKER_COLORS[activity.status]"
        aria-hidden="true"
      />
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-highlighted text-sm font-medium">
          {{ activity.title }}
        </p>
        <CommonStatusBadge
          :label="ENABLEMENT_STATUS_LABELS[activity.status]"
          :color="ENABLEMENT_STATUS_COLORS[activity.status]"
          variant="subtle"
          size="xs"
        />
      </div>
      <p class="text-dimmed mt-0.5 text-xs">
        {{ activity.partnerName || activity.reference }} · {{ formatDate(activity.scheduledAt) }}
      </p>
      <p class="text-muted mt-0.5 text-xs">
        {{ ENABLEMENT_TRACK_LABELS[activity.track] }}
      </p>
    </li>

    <li
      v-if="overflow > 0"
      class="pl-6 text-xs"
    >
      <NuxtLink
        to="/enablement"
        class="text-primary hover:underline"
      >
        {{ overflow }} more activit{{ overflow === 1 ? 'y' : 'ies' }}
      </NuxtLink>
    </li>
  </ol>

  <CommonEmptyState
    v-else
    title="No enablement activity recorded"
    description="Knowledge, sales and marketing enablement activities appear here once delivered."
    icon="i-lucide-timeline"
    size="sm"
    class="border border-dashed"
  />
</template>
