<script setup lang="ts">
import type { Partnership } from '~/types/partnership'
import {
  PARTNERSHIP_TYPE_ICONS,
  PARTNERSHIP_TYPE_LABELS,
  daysUntil,
  formatDate
} from '~/utils/formatters'
import { CONTRACT_EXPIRY_REMINDER_DAYS } from '~/utils/constants'

const props = defineProps<{
  partnership: Partnership
}>()

const expiresSoon = computed(() => {
  const remaining = daysUntil(props.partnership.expiresAt)
  return remaining !== null && remaining >= 0 && remaining <= CONTRACT_EXPIRY_REMINDER_DAYS
})
</script>

<template>
  <article class="border-default rounded-lg border bg-(--ui-bg) p-3 shadow-xs transition-colors hover:border-primary/40">
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0">
        <p class="text-highlighted truncate text-sm font-semibold">
          {{ partnership.title }}
        </p>
        <p class="text-dimmed truncate text-xs">
          {{ partnership.reference }}
        </p>
      </div>
      <CommonStatusBadge
        :label="PARTNERSHIP_TYPE_LABELS[partnership.type]"
        color="neutral"
        variant="outline"
        size="xs"
        :icon="PARTNERSHIP_TYPE_ICONS[partnership.type]"
      />
    </div>

    <p class="text-muted mt-2 line-clamp-2 text-xs leading-relaxed">
      {{ partnership.scope || 'No scope recorded.' }}
    </p>

    <dl class="text-muted mt-3 space-y-1 text-xs">
      <div class="flex items-center justify-between gap-2">
        <dt>Partner</dt>
        <dd class="text-highlighted truncate font-medium">
          {{ partnership.partnerName }}
        </dd>
      </div>
      <div class="flex items-center justify-between gap-2">
        <dt>Expires</dt>
        <dd
          class="font-medium"
          :class="expiresSoon ? 'text-warning' : ''"
        >
          {{ formatDate(partnership.expiresAt) }}
        </dd>
      </div>
    </dl>

    <div
      v-if="partnership.tags.length"
      class="mt-2 flex flex-wrap gap-1"
    >
      <UBadge
        v-for="tag in partnership.tags"
        :key="tag"
        color="neutral"
        variant="subtle"
        size="xs"
      >
        {{ tag }}
      </UBadge>
    </div>
  </article>
</template>
