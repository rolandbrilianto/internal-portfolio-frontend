<script setup lang="ts">
import type { PortfolioStatus } from '~/types/portfolio'
import { PORTFOLIO_STATUS_COLORS, PORTFOLIO_STATUS_LABELS } from '~/utils/formatters'

const props = defineProps<{ status: PortfolioStatus }>()

const label = computed(() => PORTFOLIO_STATUS_LABELS[props.status])
const color = computed(() => PORTFOLIO_STATUS_COLORS[props.status])
</script>

<template>
  <CommonStatusBadge
    :label="label"
    :color="color"
    dot
  />
</template>
