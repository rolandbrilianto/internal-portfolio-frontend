<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
  /** Removes inner padding for tables and lists. */
  flush?: boolean
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  icon: undefined,
  flush: false
})
</script>

<template>
  <section class="border-default rounded-lg border bg-(--ui-bg) shadow-xs flex flex-col overflow-hidden">
    <header class="flex flex-wrap items-start justify-between gap-3 border-b border-default px-4 py-3 sm:px-5">
      <div class="flex min-w-0 items-start gap-2.5">
        <UIcon
          v-if="icon"
          :name="icon"
          class="text-muted mt-0.5 size-4 shrink-0"
          aria-hidden="true"
        />
        <div class="min-w-0">
          <h2 class="text-sm font-semibold text-highlighted">
            {{ title }}
          </h2>
          <p
            v-if="description"
            class="text-muted mt-0.5 text-xs leading-relaxed"
          >
            {{ description }}
          </p>
        </div>
      </div>
      <div
        v-if="$slots.actions"
        class="flex shrink-0 items-center gap-2"
      >
        <slot name="actions" />
      </div>
    </header>
    <div :class="flush ? '' : 'p-4 sm:p-5'">
      <slot />
    </div>
  </section>
</template>
