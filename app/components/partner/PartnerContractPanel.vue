<script setup lang="ts">
import type { PartnerContract } from '~/types/partner'
import { CONTRACT_STATUS_COLORS, CONTRACT_STATUS_LABELS, formatDate } from '~/utils/formatters'

defineProps<{ contracts: PartnerContract[] }>()
</script>

<template>
  <ol
    v-if="contracts.length"
    class="space-y-3"
  >
    <li
      v-for="contract in contracts"
      :key="contract.id"
      class="border-l-2 border-default pl-4 transition-colors hover:border-primary/50"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-highlighted text-sm font-medium">
          {{ contract.title }}
        </p>
        <CommonStatusBadge
          :label="CONTRACT_STATUS_LABELS[contract.status]"
          :color="CONTRACT_STATUS_COLORS[contract.status]"
          variant="subtle"
          size="xs"
        />
      </div>
      <p class="text-dimmed text-xs">
        {{ contract.reference }}
      </p>
      <dl class="text-muted mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-xs">
        <div class="flex gap-1.5">
          <dt>Start</dt>
          <dd class="font-medium">
            {{ formatDate(contract.startDate) }}
          </dd>
        </div>
        <div class="flex gap-1.5">
          <dt>End</dt>
          <dd class="font-medium">
            {{ formatDate(contract.endDate) }}
          </dd>
        </div>
      </dl>
    </li>
  </ol>
  <CommonEmptyState
    v-else
    title="No contract information recorded"
    description="Legal agreements are archived chronologically once partners are onboarded."
    icon="i-lucide-file-signature"
    size="sm"
    class="border border-dashed"
  />
</template>
