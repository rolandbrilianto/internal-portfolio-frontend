<script setup lang="ts">
const props = withDefaults(defineProps<{
  limit?: number
}>(), {
  limit: 5
})

const notificationStore = useNotificationStore()

const items = computed(() => notificationStore.unreadItems.slice(0, props.limit))

function markAllRead() {
  notificationStore.markAllAsRead()
}
</script>

<template>
  <UPopover :content="{ align: 'end', side: 'bottom' }">
    <UButton
      icon="i-lucide-bell"
      color="neutral"
      variant="ghost"
      aria-label="Notifications"
      class="relative"
    >
      <UBadge
        v-if="notificationStore.counts.unread > 0"
        color="error"
        variant="solid"
        size="sm"
        class="absolute -top-1 -right-1 min-w-4 px-1 text-[0.6rem]"
      >
        {{ notificationStore.counts.unread > 99 ? '99+' : notificationStore.counts.unread }}
      </UBadge>
    </UButton>

    <template #content>
      <div class="w-96 max-w-[calc(100vw-2rem)]">
        <div class="flex items-center justify-between gap-2 border-b border-default px-3 py-2">
          <p class="text-sm font-semibold">
            Notifications
          </p>
          <UButton
            v-if="notificationStore.counts.unread > 0"
            label="Mark all read"
            color="neutral"
            variant="ghost"
            size="xs"
            @click="markAllRead"
          />
        </div>

        <div class="max-h-96 overflow-y-auto p-1.5">
          <NotificationsNotificationItem
            v-for="item in items"
            :key="item.id"
            :notification="item"
            compact
            @select="notificationStore.markAsRead(item.id)"
          />
          <CommonEmptyState
            v-if="items.length === 0"
            title="You're all caught up"
            description="Verification tasks, partnership updates and contract expiry reminders appear here."
            icon="i-lucide-bell-off"
            size="sm"
            class="border-0"
          />
        </div>

        <div class="border-t border-default p-1.5">
          <UButton
            to="/notifications"
            label="Open notification centre"
            icon="i-lucide-arrow-right"
            trailing
            color="neutral"
            variant="ghost"
            size="sm"
            block
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
