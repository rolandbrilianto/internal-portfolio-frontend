<script setup lang="ts">
interface Props {
  rows?: number
  label?: string
}

withDefaults(defineProps<Props>(), {
  rows: 4,
  label: 'Loading data…'
})
</script>

<template>
  <div
    class="space-y-3"
    role="status"
    aria-live="polite"
  >
    <p class="text-muted flex items-center gap-2 text-sm">
      <UIcon
        name="i-lucide-loader-circle"
        class="size-4 animate-spin"
        aria-hidden="true"
      />
      {{ label }}
    </p>
    <USkeleton
      v-for="row in rows"
      :key="row"
      class="h-10 w-full"
    />
  </div>
</template>
