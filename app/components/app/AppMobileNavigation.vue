<script setup lang="ts">
import { APP_SHORT_NAME } from '~/utils/constants'

const appStore = useAppStore()

const route = useRoute()

watch(
  () => route.fullPath,
  () => appStore.closeMobileNavigation()
)
</script>

<template>
  <USlideover
    :open="appStore.mobileNavigationOpen"
    side="left"
    :ui="{ content: 'w-[17rem] max-w-[85vw]' }"
    @update:open="appStore.mobileNavigationOpen = $event"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <span class="bg-primary/12 text-primary flex size-8 items-center justify-center rounded-md">
          <UIcon
            name="i-lucide-layers"
            class="size-4"
            aria-hidden="true"
          />
        </span>
        <span class="truncate text-sm font-semibold">{{ APP_SHORT_NAME }}</span>
      </div>
    </template>
    <template #body>
      <AppSidebarNavigation
        variant="mobile"
        class="-mx-3 h-full"
      />
    </template>
  </USlideover>
</template>
