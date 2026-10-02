<script setup lang="ts">
interface Props {
  /** Label of the metric that cannot be calculated yet. */
  label: string
  reason: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'i-lucide-chart-no-axes-combined'
})
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs flex flex-col gap-2 border-dashed p-4">
    <div class="flex items-center gap-2">
      <UIcon
        :name="icon"
        class="text-dimmed size-4 shrink-0"
        aria-hidden="true"
      />
      <p class="text-muted text-xs font-medium">
        {{ label }}
      </p>
    </div>
    <p class="text-dimmed text-xs leading-relaxed">
      {{ reason }}
    </p>
    <div
      class="text-dimmed flex h-16 items-end gap-1.5"
      aria-hidden="true"
    >
      <span
        v-for="height in [28, 46, 34, 58, 40, 64, 52]"
        :key="height"
        class="bg-(--ui-bg-muted) flex-1 rounded-sm"
        :style="{ height: `${height}%` }"
      />
    </div>
  </div>
</template>
