<script setup lang="ts">
import type { PortfolioCategoryShare } from '~/types/portfolio'
import { formatPercent } from '~/utils/formatters'

interface Props {
  title: string
  description: string
  icon: string
  shares: PortfolioCategoryShare[]
  emptyTitle: string
  emptyDescription: string
}

defineProps<Props>()
</script>

<template>
  <CommonSectionCard
    :title="title"
    :description="description"
    :icon="icon"
  >
    <ul
      v-if="shares.length"
      class="space-y-3"
    >
      <li
        v-for="share in shares"
        :key="share.label"
      >
        <div class="flex items-baseline justify-between gap-3">
          <span class="text-muted truncate text-sm">{{ share.label }}</span>
          <span class="text-highlighted text-sm font-semibold tabular-nums">
            {{ share.value }} · {{ formatPercent(share.share) }}
          </span>
        </div>
        <div class="bg-(--ui-bg-muted) mt-1.5 h-1.5 w-full overflow-hidden rounded-full">
          <div
            class="bg-primary h-full rounded-full"
            :style="{ width: `${Math.min(share.share, 100)}%` }"
          />
        </div>
      </li>
    </ul>
    <CommonEmptyState
      v-else
      :title="emptyTitle"
      :description="emptyDescription"
      :icon="icon"
      size="sm"
      class="border border-dashed"
    />
  </CommonSectionCard>
</template>
