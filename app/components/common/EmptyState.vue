<script setup lang="ts">
interface Props {
  title: string
  description?: string
  icon?: string
  /** `inline` for toolbars, `card` for full page areas. */
  size?: 'sm' | 'md' | 'lg'
  bordered?: boolean
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  icon: 'i-lucide-inbox',
  size: 'md',
  bordered: true
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-3 rounded-lg px-6 text-center"
    :class="[
      bordered ? 'border-default rounded-lg border bg-(--ui-bg-muted)/40' : '',
      size === 'sm' ? 'py-6' : size === 'lg' ? 'py-14' : 'py-10'
    ]"
    role="status"
  >
    <span
      class="flex size-11 shrink-0 items-center justify-center rounded-full border border-default bg-default text-muted"
      aria-hidden="true"
    >
      <UIcon
        :name="icon"
        class="size-5"
      />
    </span>
    <div class="space-y-1">
      <p class="text-highlighted font-semibold">
        {{ title }}
      </p>
      <p
        v-if="description"
        class="text-muted mx-auto max-w-md text-sm leading-relaxed"
      >
        {{ description }}
      </p>
    </div>
    <div
      v-if="$slots.default"
      class="mt-1 flex flex-wrap items-center justify-center gap-2"
    >
      <slot />
    </div>
  </div>
</template>
