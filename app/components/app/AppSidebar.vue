<script setup lang="ts">
import { APP_ORGANISATION, APP_SHORT_NAME } from '~/utils/constants'

const appStore = useAppStore()
const collapsed = computed(() => appStore.sidebarCollapsed)
</script>

<template>
  <aside
    class="bg-(--ui-bg) hidden shrink-0 border-r border-default lg:flex lg:flex-col"
    :class="collapsed ? 'w-16' : 'w-64'"
    aria-label="Sidebar"
  >
    <div class="flex h-14 items-center gap-2 border-b border-default px-3">
      <NuxtLink
        to="/dashboard"
        class="focus-visible:outline-primary flex min-w-0 items-center gap-2 rounded-md px-1 py-1"
        :aria-label="`${APP_SHORT_NAME} — go to dashboard`"
      >
        <span class="bg-primary/12 text-primary flex size-8 shrink-0 items-center justify-center rounded-md">
          <UIcon
            name="i-lucide-layers"
            class="size-4"
            aria-hidden="true"
          />
        </span>
        <span
          class="min-w-0"
          :class="collapsed ? 'lg:hidden' : ''"
        >
          <span class="block truncate text-sm font-semibold text-highlighted">{{ APP_SHORT_NAME }}</span>
          <span class="text-dimmed block truncate text-[0.68rem]">{{ APP_ORGANISATION }}</span>
        </span>
      </NuxtLink>
    </div>

    <AppSidebarNavigation
      variant="desktop"
      class="flex-1"
    />

    <div class="border-t border-default p-3">
      <UButton
        :label="collapsed ? 'Expand' : 'Collapse'"
        :icon="collapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
        color="neutral"
        variant="ghost"
        size="xs"
        block
        :aria-expanded="!collapsed"
        class="hidden lg:flex"
        :class="collapsed ? 'lg:justify-center lg:[&>span]:hidden' : ''"
        @click="appStore.toggleSidebar()"
      />
    </div>
  </aside>
</template>
