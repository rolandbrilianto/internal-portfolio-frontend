<script setup lang="ts">
import type { EnablementTrack } from '~/types/enablement'
import { ENABLEMENT_TRACK_DESCRIPTIONS, ENABLEMENT_TRACK_LABELS } from '~/utils/formatters'

const TRACK_ICONS: Record<EnablementTrack, string> = {
  knowledge: 'i-lucide-book-open',
  sales: 'i-lucide-badge-dollar-sign',
  marketing: 'i-lucide-megaphone'
}

defineProps<{
  summaries: Array<{ track: EnablementTrack, completed: number, inProgress: number, planned: number }>
}>()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <CommonSectionCard
      v-for="summary in summaries"
      :key="summary.track"
      :title="ENABLEMENT_TRACK_LABELS[summary.track]"
      :description="ENABLEMENT_TRACK_DESCRIPTIONS[summary.track]"
      :icon="TRACK_ICONS[summary.track]"
    >
      <dl class="grid grid-cols-3 gap-2 text-center">
        <div class="rounded-md border border-default p-2">
          <dt class="text-dimmed text-[0.7rem]">
            Planned
          </dt>
          <dd class="text-highlighted text-lg font-semibold tabular-nums">
            {{ summary.planned }}
          </dd>
        </div>
        <div class="rounded-md border border-default p-2">
          <dt class="text-dimmed text-[0.7rem]">
            In progress
          </dt>
          <dd class="text-highlighted text-lg font-semibold tabular-nums">
            {{ summary.inProgress }}
          </dd>
        </div>
        <div class="rounded-md border border-default p-2">
          <dt class="text-dimmed text-[0.7rem]">
            Completed
          </dt>
          <dd class="text-highlighted text-lg font-semibold tabular-nums">
            {{ summary.completed }}
          </dd>
        </div>
      </dl>
      <p
        v-if="!summary.planned && !summary.inProgress && !summary.completed"
        class="text-dimmed mt-3 text-xs leading-relaxed"
      >
        No items recorded for this track yet.
      </p>
    </CommonSectionCard>
  </div>
</template>
