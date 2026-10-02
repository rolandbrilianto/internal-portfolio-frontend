<script setup lang="ts">
import type { PartnershipStatus } from '~/types/partner'
import { PARTNERSHIP_STATUS_COLORS, PARTNERSHIP_STATUS_LABELS } from '~/utils/formatters'

const props = defineProps<{ status: PartnershipStatus }>()

const label = computed(() => PARTNERSHIP_STATUS_LABELS[props.status])
const color = computed(() => PARTNERSHIP_STATUS_COLORS[props.status])
</script>

<template>
  <CommonStatusBadge
    :label="label"
    :color="color"
    dot
  />
</template>
