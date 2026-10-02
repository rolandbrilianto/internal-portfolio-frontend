<script setup lang="ts">
import type { PartnerCategory } from '~/types/partner'
import { PARTNER_CATEGORY_ICONS, PARTNER_CATEGORY_LABELS } from '~/utils/formatters'

const props = defineProps<{ category: PartnerCategory }>()

const label = computed(() => PARTNER_CATEGORY_LABELS[props.category])
const icon = computed(() => PARTNER_CATEGORY_ICONS[props.category])
</script>

<template>
  <CommonStatusBadge
    :label="label"
    color="neutral"
    variant="outline"
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
