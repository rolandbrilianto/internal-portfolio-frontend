<script setup lang="ts">
interface Props {
  icon: string
  label: string
  to: string
  badge?: string | null
}

withDefaults(defineProps<Props>(), {
  badge: null
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="border-default rounded-lg border bg-(--ui-bg) shadow-xs hover:border-primary/40 flex items-center gap-3 p-4 transition-colors hover:bg-elevated/40"
  >
    <span class="bg-primary/12 text-primary flex size-9 shrink-0 items-center justify-center rounded-md">
      <UIcon
        :name="icon"
        class="size-4"
        aria-hidden="true"
      />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block truncate text-sm font-medium text-highlighted">{{ label }}</span>
      <span
        v-if="badge"
        class="text-muted block truncate text-xs"
      >{{ badge }}</span>
    </span>
    <UIcon
      name="i-lucide-chevron-right"
      class="text-dimmed size-4 shrink-0"
      aria-hidden="true"
    />
  </NuxtLink>
</template>
