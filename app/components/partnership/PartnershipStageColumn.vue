<script setup lang="ts">
import type { Partnership, PartnershipStage } from '~/types/partnership'
import { PARTNERSHIP_STATUS_LABELS } from '~/utils/formatters'

defineProps<{
  stage: PartnershipStage
  label: string
  partnerships: Partnership[]
  count: number
  icon: string
}>()
</script>

<template>
  <section
    class="border-default flex min-h-48 flex-col rounded-lg border bg-(--ui-bg-muted)/30 p-2.5"
    :aria-label="`${PARTNERSHIP_STATUS_LABELS[stage]} stage`"
  >
    <header class="flex items-center justify-between gap-2 px-1 pb-2.5">
      <div class="flex min-w-0 items-center gap-2">
        <UIcon
          :name="icon"
          class="text-muted size-4 shrink-0"
          aria-hidden="true"
        />
        <h3 class="text-highlighted truncate text-sm font-semibold">
          {{ PARTNERSHIP_STATUS_LABELS[stage] }}
        </h3>
        <UBadge
          color="neutral"
          variant="subtle"
          size="xs"
        >
          {{ count }}
        </UBadge>
      </div>
    </header>

    <div
      v-if="partnerships.length"
      class="space-y-2"
    >
      <PartnershipCard
        v-for="partnership in partnerships"
        :key="partnership.id"
        :partnership="partnership"
      />
    </div>

    <div
      v-else
      class="flex flex-1 items-center justify-center rounded-md border border-dashed p-3 text-center"
    >
      <p class="text-dimmed text-xs">
        No {{ label.toLowerCase() }} partnerships
      </p>
    </div>
  </section>
</template>
