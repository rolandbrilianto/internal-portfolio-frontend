<script setup lang="ts">
import type { Partnership } from '~/types/partnership'
import {
  PARTNERSHIP_TYPE_ICONS,
  PARTNERSHIP_TYPE_LABELS,
  formatDate
} from '~/utils/formatters'

defineProps<{
  partnerships: Partnership[]
}>()
</script>

<template>
  <CommonDataTable
    :columns="[
      { key: 'partnership', label: 'Partnership', class: 'min-w-64' },
      { key: 'partner', label: 'Partner' },
      { key: 'type', label: 'Type' },
      { key: 'stage', label: 'Stage' },
      { key: 'started', label: 'Started' },
      { key: 'expires', label: 'Expires' },
      { key: 'owners', label: 'Owners', align: 'right' }
    ]"
    caption="Partnership pipeline"
    :empty="partnerships.length === 0"
    empty-title="No partnerships available"
    empty-description="Partnership records appear here once they are loaded through the service layer."
    empty-icon="i-lucide-handshake"
    min-width="64rem"
  >
    <tr
      v-for="partnership in partnerships"
      :key="partnership.id"
      class="hover:bg-elevated/40 transition-colors"
    >
      <td class="px-4 py-3">
        <p class="text-highlighted text-sm font-medium">
          {{ partnership.title }}
        </p>
        <p class="text-dimmed text-xs">
          {{ partnership.reference }}
        </p>
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ partnership.partnerName }}
      </td>
      <td class="px-4 py-3">
        <CommonStatusBadge
          :label="PARTNERSHIP_TYPE_LABELS[partnership.type]"
          :icon="PARTNERSHIP_TYPE_ICONS[partnership.type]"
          color="neutral"
          variant="outline"
          size="xs"
        />
      </td>
      <td class="px-4 py-3">
        <PartnershipStatusBadge :status="partnership.stage" />
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ formatDate(partnership.startedAt) }}
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ formatDate(partnership.expiresAt) }}
      </td>
      <td class="text-muted px-4 py-3 text-right text-sm">
        {{ partnership.owners.length }}
      </td>
    </tr>
  </CommonDataTable>
</template>
