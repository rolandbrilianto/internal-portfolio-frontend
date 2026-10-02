<script setup lang="ts">
import type { EnablementActivity } from '~/types/enablement'
import {
  ENABLEMENT_STATUS_COLORS,
  ENABLEMENT_STATUS_LABELS,
  ENABLEMENT_TRACK_LABELS,
  formatDate
} from '~/utils/formatters'

const DELIVERY_MODE_LABELS: Record<EnablementActivity['mode'], string> = {
  'workshop': 'Workshop',
  'training': 'Training',
  'certification': 'Certification',
  'campaign': 'Co-marketing campaign',
  'asset-pack': 'Asset pack'
}

defineProps<{
  activities: EnablementActivity[]
}>()
</script>

<template>
  <CommonDataTable
    :columns="[
      { key: 'activity', label: 'Activity', class: 'min-w-64' },
      { key: 'partner', label: 'Partner' },
      { key: 'track', label: 'Track' },
      { key: 'mode', label: 'Mode' },
      { key: 'status', label: 'Status' },
      { key: 'scheduled', label: 'Scheduled' },
      { key: 'owner', label: 'Owner', align: 'right' }
    ]"
    caption="Enablement activities"
    :empty="activities.length === 0"
    empty-title="No enablement activities recorded"
    empty-description="Knowledge, sales and marketing enablement appears here once delivered."
    empty-icon="i-lucide-graduation-cap"
    min-width="64rem"
  >
    <tr
      v-for="activity in activities"
      :key="activity.id"
      class="hover:bg-elevated/40 transition-colors"
    >
      <td class="px-4 py-3">
        <p class="text-highlighted text-sm font-medium">
          {{ activity.title }}
        </p>
        <p class="text-dimmed text-xs">
          {{ activity.reference }}
        </p>
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ activity.partnerName || '—' }}
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ ENABLEMENT_TRACK_LABELS[activity.track] }}
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ DELIVERY_MODE_LABELS[activity.mode] }}
      </td>
      <td class="px-4 py-3">
        <CommonStatusBadge
          :label="ENABLEMENT_STATUS_LABELS[activity.status]"
          :color="ENABLEMENT_STATUS_COLORS[activity.status]"
          variant="subtle"
          size="xs"
        />
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ formatDate(activity.scheduledAt) }}
      </td>
      <td class="text-muted px-4 py-3 text-right text-sm">
        {{ activity.owner || '—' }}
      </td>
    </tr>
  </CommonDataTable>
</template>
