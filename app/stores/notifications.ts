import { defineStore } from 'pinia'
import type {
  AppNotification,
  NotificationCounts,
  NotificationFilters
} from '~/types/notification'
import { notificationService } from '~/services/notifications/notification.service'

function createFilters(): NotificationFilters {
  return { search: '', types: [], severities: [], categories: [], unreadOnly: false }
}

function createCounts(): NotificationCounts {
  return { total: 0, unread: 0, critical: 0 }
}

export const useNotificationStore = defineStore('notifications', () => {
  const items = ref<AppNotification[]>([])
  const counts = ref<NotificationCounts>(createCounts())
  const filters = ref<NotificationFilters>(createFilters())
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref<string | null>(null)

  const hasActiveFilters = computed(
    () =>
      filters.value.search.trim().length > 0
      || filters.value.types.length > 0
      || filters.value.severities.length > 0
      || filters.value.categories.length > 0
      || filters.value.unreadOnly
  )

  const filteredItems = computed(() => {
    const query = filters.value.search.trim().toLowerCase()
    return items.value.filter((notification) => {
      if (filters.value.unreadOnly && notification.read) return false
      if (filters.value.types.length && !filters.value.types.includes(notification.type)) return false
      if (filters.value.severities.length && !filters.value.severities.includes(notification.severity)) return false
      if (filters.value.categories.length && !filters.value.categories.includes(notification.category)) return false
      if (!query) return true
      return [notification.title, notification.body, notification.reference, notification.actor ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  })

  const unreadItems = computed(() => items.value.filter(notification => !notification.read))

  async function load() {
    loading.value = true
    error.value = null
    try {
      const result = await notificationService.fetchNotifications()
      items.value = result.data
      counts.value = result.counts ?? createCounts()
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load notifications.'
    } finally {
      loading.value = false
      loaded.value = true
    }
  }

  function resetFilters() {
    filters.value = createFilters()
  }

  function markAsRead(id: string) {
    const target = items.value.find(notification => notification.id === id)
    if (target && !target.read) {
      target.read = true
      recomputeCounts()
      void notificationService.updateReadState({ id, read: true })
    }
  }

  function markAllAsRead() {
    for (const notification of items.value) {
      notification.read = true
    }
    recomputeCounts()
    void notificationService.updateReadState({ id: null, read: true })
  }

  function recomputeCounts() {
    counts.value = {
      total: items.value.length,
      unread: items.value.filter(notification => !notification.read).length,
      critical: items.value.filter(notification => !notification.read && notification.severity === 'critical').length
    }
  }

  return {
    items,
    counts,
    filters,
    loading,
    loaded,
    error,
    hasActiveFilters,
    filteredItems,
    unreadItems,
    load,
    resetFilters,
    markAsRead,
    markAllAsRead
  }
})
