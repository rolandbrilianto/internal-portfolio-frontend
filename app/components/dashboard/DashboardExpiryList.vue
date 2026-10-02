<script setup lang="ts">
import type { LegalDocument } from '~/types/document'
import { formatDate, daysUntil } from '~/utils/formatters'
import { CONTRACT_EXPIRY_REMINDER_DAYS } from '~/utils/constants'

const props = withDefaults(defineProps<{
  documents: LegalDocument[]
  limit?: number
}>(), {
  limit: 5
})

const sorted = computed(() =>
  [...props.documents]
    .filter(item => daysUntil(item.expiresAt) !== null)
    .sort((a, b) => (daysUntil(a.expiresAt) ?? 0) - (daysUntil(b.expiresAt) ?? 0))
    .slice(0, props.limit)
)
</script>

<template>
  <ul
    v-if="sorted.length"
    class="divide-y divide-default"
  >
    <li
      v-for="item in sorted"
      :key="item.id"
      class="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
    >
      <div class="min-w-0">
        <p class="truncate text-sm font-medium text-highlighted">
          {{ item.title }}
        </p>
        <p class="text-muted truncate text-xs">
          {{ item.partnerName }} · expires {{ formatDate(item.expiresAt) }}
        </p>
      </div>
      <CommonStatusBadge
        :label="`${daysUntil(item.expiresAt)}d left`"
        :color="(daysUntil(item.expiresAt) ?? 99) <= CONTRACT_EXPIRY_REMINDER_DAYS ? 'warning' : 'neutral'"
        variant="subtle"
      />
    </li>
  </ul>
  <CommonEmptyState
    v-else
    title="No contracts expiring soon"
    :description="`Reminders are generated ${CONTRACT_EXPIRY_REMINDER_DAYS} days before a contract expires.`"
    icon="i-lucide-calendar-clock"
    size="sm"
    class="border border-dashed"
  />
</template>
