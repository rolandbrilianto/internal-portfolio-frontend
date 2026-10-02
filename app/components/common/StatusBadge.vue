<script setup lang="ts">
interface Props {
  label: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  variant?: 'subtle' | 'outline' | 'solid' | 'soft'
  dot?: boolean
  size?: 'xs' | 'sm' | 'md'
}

withDefaults(defineProps<Props>(), {
  color: 'neutral',
  variant: 'subtle',
  dot: false,
  size: 'sm'
})
</script>

<template>
  <UBadge
    :color="color"
    :variant="variant"
    :size="size"
    class="gap-1.5 whitespace-nowrap"
  >
    <slot name="leading">
      <span
        v-if="dot"
        class="size-1.5 shrink-0 rounded-full bg-current"
        aria-hidden="true"
      />
    </slot>
    {{ label }}
  </UBadge>
</template>
