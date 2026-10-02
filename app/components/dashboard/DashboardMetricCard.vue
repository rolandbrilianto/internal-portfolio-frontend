<script setup lang="ts">
interface Props {
  label: string
  icon: string
  /** Null when the metric has no verified data yet. */
  value?: string | null
  description?: string
  to?: string
  linkLabel?: string
  /** Marks the metric as unavailable because its data source is not connected. */
  unavailable?: boolean
}

withDefaults(defineProps<Props>(), {
  value: null,
  description: undefined,
  to: undefined,
  linkLabel: 'Open',
  unavailable: false
})
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs flex flex-col justify-between gap-3 p-4 transition-colors hover:bg-elevated/40">
    <div class="flex items-start justify-between gap-3">
      <p class="text-muted text-xs font-medium">
        {{ label }}
      </p>
      <span class="bg-elevated text-muted flex size-7 shrink-0 items-center justify-center rounded-md">
        <UIcon
          :name="icon"
          class="size-4"
          aria-hidden="true"
        />
      </span>
    </div>

    <div>
      <p
        v-if="value"
        class="text-highlighted text-2xl font-semibold tracking-tight tabular-nums"
      >
        {{ value }}
      </p>
      <p
        v-else
        class="text-dimmed text-2xl leading-8 font-semibold tracking-tight"
        aria-label="No data available"
      >
        —
      </p>
      <p
        v-if="description"
        class="text-muted mt-1 text-xs leading-relaxed"
      >
        {{ description }}
      </p>
      <p
        v-if="unavailable && !value"
        class="text-dimmed mt-2 text-[0.7rem]"
      >
        Data source not connected
      </p>
    </div>

    <NuxtLink
      v-if="to"
      :to="to"
      class="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
    >
      {{ linkLabel }}
      <UIcon
        name="i-lucide-arrow-right"
        class="size-3"
        aria-hidden="true"
      />
    </NuxtLink>
  </div>
</template>
