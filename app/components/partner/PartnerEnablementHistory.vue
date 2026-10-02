<script setup lang="ts">
import type { EnablementActivity } from '~/types/enablement'
import { ENABLEMENT_STATUS_COLORS, ENABLEMENT_STATUS_LABELS, ENABLEMENT_TRACK_LABELS, formatDate } from '~/utils/formatters'

defineProps<{ activities: EnablementActivity[] }>()
</script>

<template>
  <ol
    v-if="activities.length"
    class="space-y-3"
  >
    <li
      v-for="activity in activities"
      :key="activity.id"
      class="border-l-2 border-default pl-4"
    >
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
      <p class="text-muted mt-0.5 text-xs">
        {{ ENABLEMENT_TRACK_LABELS[activity.track] }} · {{ formatDate(activity.scheduledAt) }}
      </p>
    </li>
  </ol>
  <CommonEmptyState
    v-else
    title="No enablement history recorded"
    description="Knowledge, sales and marketing enablement activities appear here once delivered."
    icon="i-lucide-graduation-cap"
    size="sm"
    class="border border-dashed"
  />
</template>
