<script setup lang="ts">
import { DATA_SOURCE_NOTICE } from '~/utils/constants'

const appStore = useAppStore()
</script>

<template>
  <UAlert
    v-if="!appStore.dataSourceNoticeDismissed"
    color="info"
    variant="subtle"
    icon="i-lucide-info"
    title="Frontend-only phase"
    :description="DATA_SOURCE_NOTICE"
    class="mb-6"
  >
    <template #actions>
      <UButton
        label="Dismiss"
        color="neutral"
        variant="ghost"
        size="xs"
        @click="appStore.dismissDataSourceNotice()"
      />
    </template>
  </UAlert>
</template>
