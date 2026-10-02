<script setup lang="ts">
import type { NavigationItem } from '~/types/navigation'

interface Props {
  item: NavigationItem
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})

const route = useRoute()
const expanded = ref(false)

const hasActiveChild = computed(() =>
  (props.item.children ?? []).some(child => route.path === child.to || route.path.startsWith(`${child.to}/`))
)

const isActive = computed(() => {
  if (props.item.to) return route.path === props.item.to
  return hasActiveChild.value
})

watch(
  () => route.path,
  () => {
    if (hasActiveChild.value) expanded.value = true
  },
  { immediate: true }
)
</script>

<template>
  <li>
    <NuxtLink
      v-if="item.to"
      :to="item.to"
      class="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors"
      :class="[
        isActive
          ? 'text-primary bg-primary/10 font-semibold'
          : 'text-muted hover:bg-elevated/60 hover:text-highlighted',
        collapsed ? 'lg:justify-center lg:px-0' : ''
      ]"
      :aria-current="isActive ? 'page' : undefined"
      :title="collapsed ? item.label : undefined"
    >
      <UIcon
        :name="item.icon"
        class="size-4 shrink-0"
        aria-hidden="true"
      />
      <span :class="collapsed ? 'lg:hidden' : ''">{{ item.label }}</span>
    </NuxtLink>

    <div v-else>
      <button
        type="button"
        class="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors"
        :class="[
          hasActiveChild ? 'text-highlighted' : 'text-muted hover:bg-elevated/60 hover:text-highlighted',
          collapsed ? 'lg:justify-center lg:px-0' : ''
        ]"
        :aria-expanded="expanded"
        :title="collapsed ? item.label : undefined"
        @click="expanded = !expanded"
      >
        <UIcon
          :name="item.icon"
          class="size-4 shrink-0"
          aria-hidden="true"
        />
        <span
          class="min-w-0 flex-1 truncate"
          :class="collapsed ? 'lg:hidden' : ''"
        >{{ item.label }}</span>
        <UIcon
          name="i-lucide-chevron-right"
          class="text-muted size-3.5 shrink-0 transition-transform"
          :class="[expanded ? 'rotate-90' : '', collapsed ? 'lg:hidden' : '']"
          aria-hidden="true"
        />
      </button>
      <ul
        v-show="expanded"
        class="mt-1 space-y-0.5 border-l border-default pl-2"
      >
        <li
          v-for="child in item.children"
          :key="child.to"
        >
          <AppSidebarNavChild
            :child="child"
            :collapsed="collapsed"
            nested
          />
        </li>
      </ul>
    </div>
  </li>
</template>
