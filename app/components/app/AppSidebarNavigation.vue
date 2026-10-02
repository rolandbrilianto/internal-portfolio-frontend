<script setup lang="ts">
import type { NavigationSection } from '~/types/navigation'
import { NAVIGATION_SECTIONS, SETTINGS_NAV_ITEM } from '~/utils/navigation'

/** `desktop` renders the collapsible rail, `mobile` renders a drawer list. */
defineProps<{ variant: 'desktop' | 'mobile' }>()

const appStore = useAppStore()
const roleStore = useRoleStore()

const sections = computed<NavigationSection[]>(() =>
  NAVIGATION_SECTIONS
    .filter(section => roleStore.hasRole(section.roles))
    .map(section => ({
      ...section,
      items: section.items.filter(item => roleStore.hasRole(item.roles))
    }))
    .filter(section => section.items.length > 0)
)

const settingsItem = computed(() =>
  roleStore.hasRole([...SETTINGS_NAV_ITEM.roles]) ? SETTINGS_NAV_ITEM : null
)
</script>

<template>
  <nav
    class="flex h-full flex-col gap-6 overflow-y-auto px-3 py-4"
    aria-label="Main navigation"
  >
    <div
      v-for="section in sections"
      :key="section.key"
      class="space-y-1"
    >
      <p
        class="text-dimmed px-2.5 pb-1 text-[0.68rem] font-semibold tracking-wider uppercase"
        :class="variant === 'desktop' ? 'lg:sr-only' : ''"
      >
        {{ section.label }}
      </p>
      <ul class="space-y-0.5">
        <AppSidebarNavItem
          v-for="item in section.items"
          :key="item.key"
          :item="item"
          :collapsed="variant === 'desktop' && appStore.sidebarCollapsed"
        />
      </ul>
    </div>

    <div
      v-if="settingsItem"
      class="mt-auto space-y-1 border-t border-default pt-4"
    >
      <ul>
        <AppSidebarNavItem
          :item="settingsItem"
          :collapsed="variant === 'desktop' && appStore.sidebarCollapsed"
        />
      </ul>
    </div>
  </nav>
</template>
