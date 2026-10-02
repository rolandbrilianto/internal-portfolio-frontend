<script setup lang="ts">
interface Props {
  title: string
  description?: string
  eyebrow?: string
  /** Short status/context chip rendered next to the title. */
  badge?: string
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  eyebrow: undefined,
  badge: undefined
})
</script>

<template>
  <header class="flex flex-col gap-4 border-b border-default pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
    <div class="min-w-0 space-y-1.5">
      <p
        v-if="eyebrow"
        class="text-muted text-xs font-semibold tracking-wider uppercase"
      >
        {{ eyebrow }}
      </p>
      <div class="flex flex-wrap items-center gap-2.5">
        <h1 class="text-2xl font-semibold tracking-tight text-highlighted sm:text-[1.6rem]">
          {{ title }}
        </h1>
        <UBadge
          v-if="badge"
          color="neutral"
          variant="subtle"
          size="sm"
        >
          {{ badge }}
        </UBadge>
      </div>
      <p
        v-if="description"
        class="text-muted max-w-3xl text-sm leading-relaxed"
      >
        {{ description }}
      </p>
      <slot name="meta" />
    </div>
    <div
      v-if="$slots.actions"
      class="flex shrink-0 flex-wrap items-center gap-2"
    >
      <slot name="actions" />
    </div>
  </header>
</template>
