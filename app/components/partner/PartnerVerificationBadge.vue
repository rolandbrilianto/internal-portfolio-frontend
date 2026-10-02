<script setup lang="ts">
import type { VerificationStatus } from '~/types/partner'
import { VERIFICATION_STATUS_COLORS, VERIFICATION_STATUS_LABELS } from '~/utils/formatters'

const props = defineProps<{ status: VerificationStatus }>()

const label = computed(() => VERIFICATION_STATUS_LABELS[props.status])
const color = computed(() => VERIFICATION_STATUS_COLORS[props.status])
const icon = computed(() => {
  if (props.status === 'verified') return 'i-lucide-badge-check'
  if (props.status === 'pending') return 'i-lucide-hourglass'
  if (props.status === 'rejected') return 'i-lucide-circle-x'
  return 'i-lucide-shield-question'
})
</script>

<template>
  <CommonStatusBadge
    :label="label"
    :color="color"
    variant="outline"
    size="xs"
  >
    <template #leading>
      <UIcon
        :name="icon"
        class="size-3"
        aria-hidden="true"
      />
    </template>
  </CommonStatusBadge>
</template>
