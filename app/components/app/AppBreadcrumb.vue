<script setup lang="ts">
import type { BreadcrumbEntry } from '~/types/navigation'

const route = useRoute()

interface PageMeta {
  title?: string
  breadcrumb?: BreadcrumbEntry[]
}

const entries = computed<BreadcrumbEntry[]>(() => {
  const meta = route.meta as PageMeta
  return meta.breadcrumb ?? []
})
</script>

<template>
  <UBreadcrumb
    v-if="entries.length"
    :items="entries"
    separator-icon="i-lucide-chevron-right"
    class="text-xs"
    :ui="{ linkLabel: 'truncate' }"
  />
</template>
