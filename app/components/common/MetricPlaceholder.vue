<script setup lang="ts">
interface Props {
  label: string
  hint?: string
  /** Rendered when a real measurement becomes available. */
  value?: string | null
}

withDefaults(defineProps<Props>(), {
  hint: undefined,
  value: null
})
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg-muted)/40 flex items-baseline justify-between gap-3 px-3 py-2">
    <div class="min-w-0">
      <p class="text-muted truncate text-xs font-medium">
        {{ label }}
      </p>
      <p
        v-if="hint"
        class="text-dimmed truncate text-[0.7rem]"
      >
        {{ hint }}
      </p>
    </div>
    <span
      v-if="value"
      class="text-highlighted shrink-0 font-semibold tabular-nums"
    >{{ value }}</span>
    <span
      v-else
      class="text-dimmed shrink-0 font-medium"
      aria-label="No data available"
    >—</span>
  </div>
</template>
