<script setup lang="ts">
import type { NavigationChild } from '~/types/navigation'

interface Props {
  child: NavigationChild
  collapsed?: boolean
  nested?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  nested: false
})

const route = useRoute()

const isActive = computed(() => route.path === props.child.to || route.path.startsWith(`${props.child.to}/`))
</script>

<template>
  <NuxtLink
    :to="child.to"
    class="group flex items-center gap-2 rounded-md py-1.5 text-sm transition-colors"
    :class="[
      isActive
        ? 'text-primary bg-primary/10 font-semibold'
        : 'text-muted hover:bg-elevated/60 hover:text-highlighted',
      nested ? 'px-2 pl-8' : 'px-2.5',
      collapsed ? 'lg:justify-center lg:px-0' : ''
    ]"
    :aria-current="isActive ? 'page' : undefined"
    :title="collapsed ? child.label : undefined"
  >
    <UIcon
      v-if="child.icon"
      :name="child.icon"
      class="size-4 shrink-0"
      aria-hidden="true"
    />
    <span :class="collapsed ? 'lg:hidden' : ''">{{ child.label }}</span>
  </NuxtLink>
</template>
