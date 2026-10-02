<script setup lang="ts">
definePageMeta({
  title: 'Notifications',
  breadcrumb: [{ label: 'Notifications' }]
})

useHead({ title: 'Notifications' })

const store = useNotificationStore()

onMounted(() => {
  if (!store.loaded) store.load()
})
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Notification centre"
      title="Notifications"
      description="Partner verification tasks, partnership updates and contract expiry reminders."
      icon="i-lucide-bell"
    >
      <template #actions>
        <UButton
          v-if="store.counts.unread > 0"
          label="Mark all read"
          icon="i-lucide-check-check"
          color="neutral"
          variant="subtle"
          size="sm"
          @click="store.markAllAsRead()"
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <div class="grid gap-4 sm:grid-cols-3">
      <CommonMetricPlaceholder
        label="Total notifications"
        :value="store.counts.total > 0 ? String(store.counts.total) : null"
        hint="Loaded through the service layer"
      />
      <CommonMetricPlaceholder
        label="Unread"
        :value="store.counts.unread > 0 ? String(store.counts.unread) : null"
        hint="Requires acknowledgement"
      />
      <CommonMetricPlaceholder
        label="Critical"
        :value="store.counts.critical > 0 ? String(store.counts.critical) : null"
        hint="Contract expiry reminders"
      />
    </div>

    <NotificationsFilters />

    <CommonLoadingState
      v-if="store.loading"
      label="Loading notifications"
    />

    <CommonSectionCard
      v-else
      title="Inbox"
      description="Newest notifications first."
      icon="i-lucide-inbox"
      flush
    >
      <ul
        v-if="store.filteredItems.length"
        class="divide-y divide-default"
      >
        <li
          v-for="notification in store.filteredItems"
          :key="notification.id"
        >
          <NotificationsNotificationItem
            :notification="notification"
            @select="store.markAsRead(notification.id)"
          />
        </li>
      </ul>

      <CommonEmptyState
        v-else
        :title="store.hasActiveFilters ? 'No notifications match the selected filters' : 'You are all caught up'"
        :description="store.hasActiveFilters
          ? 'Adjust or reset the filters to see the full inbox.'
          : 'Verification tasks, partnership updates and contract expiry reminders appear here.'"
        :icon="store.hasActiveFilters ? 'i-lucide-filter-x' : 'i-lucide-bell-off'"
      >
        <UButton
          v-if="store.hasActiveFilters"
          label="Reset filters"
          icon="i-lucide-filter-x"
          color="neutral"
          variant="subtle"
          size="sm"
          @click="store.resetFilters()"
        />
      </CommonEmptyState>
    </CommonSectionCard>
  </div>
</template>
