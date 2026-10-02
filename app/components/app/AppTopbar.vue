<script setup lang="ts">
import { APP_SHORT_NAME } from '~/utils/constants'

const appStore = useAppStore()
const roleStore = useRoleStore()
</script>

<template>
  <header class="bg-(--ui-bg)/85 sticky top-0 z-30 border-b border-default backdrop-blur">
    <div class="flex h-14 items-center gap-2 px-3 sm:px-4">
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        aria-label="Open navigation"
        class="lg:hidden"
        @click="appStore.openMobileNavigation()"
      />

      <NuxtLink
        to="/dashboard"
        class="flex min-w-0 items-center gap-2 lg:hidden"
      >
        <span class="bg-primary/12 text-primary flex size-7 shrink-0 items-center justify-center rounded-md">
          <UIcon
            name="i-lucide-layers"
            class="size-3.5"
            aria-hidden="true"
          />
        </span>
        <span class="truncate text-sm font-semibold sm:hidden">{{ APP_SHORT_NAME }}</span>
      </NuxtLink>

      <div class="hidden min-w-0 flex-1 lg:flex">
        <AppBreadcrumb />
      </div>

      <div class="ml-auto flex items-center gap-1 sm:gap-2">
        <AppRoleSwitcher />
        <UButton
          icon="i-lucide-search"
          color="neutral"
          variant="ghost"
          aria-label="Quick navigation"
          class="hidden md:inline-flex"
          @click="appStore.toggleCommandPalette()"
        />
        <AppNotificationMenu />
        <AppThemeSwitcher />
        <USeparator
          orientation="vertical"
          class="mx-0.5 my-2 hidden sm:block"
        />
        <UAvatar
          :icon="roleStore.currentRoleDefinition.icon"
          size="sm"
          :alt="`Role preview: ${roleStore.currentRoleDefinition.label}`"
          class="hidden sm:flex"
        />
      </div>
    </div>

    <div class="border-t border-default px-3 py-1.5 lg:hidden">
      <AppBreadcrumb />
    </div>
  </header>
</template>
