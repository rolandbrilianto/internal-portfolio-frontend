<script setup lang="ts">
import type { AppNotification, NotificationSeverity } from '~/types/notification'
import {
  NOTIFICATION_CATEGORY_LABELS,
  NOTIFICATION_SEVERITY_COLORS,
  NOTIFICATION_SEVERITY_ICONS,
  NOTIFICATION_TYPE_LABELS,
  formatDateTime
} from '~/utils/formatters'

const ICON_CLASSES: Record<NotificationSeverity, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  critical: 'text-error'
}

withDefaults(defineProps<{
  notification: AppNotification
  compact?: boolean
}>(), {
  compact: false
})

defineEmits<{ select: [] }>()
</script>

<template>
  <Component
    :is="notification.link ? 'NuxtLink' : 'button'"
    :to="notification.link ?? undefined"
    :type="notification.link ? undefined : 'button'"
    class="flex w-full items-start gap-3 rounded-md p-2.5 text-left transition-colors"
    :class="notification.read ? 'opacity-70 hover:bg-elevated/60' : 'hover:bg-elevated'"
    @click="$emit('select')"
  >
    <UIcon
      :name="NOTIFICATION_SEVERITY_ICONS[notification.severity]"
      :class="['mt-0.5 size-4 shrink-0', ICON_CLASSES[notification.severity]]"
      aria-hidden="true"
    />

    <span class="min-w-0 flex-1">
      <span class="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span class="text-highlighted text-sm font-medium">{{ notification.title }}</span>
        <CommonStatusBadge
          :label="NOTIFICATION_TYPE_LABELS[notification.type]"
          :color="NOTIFICATION_SEVERITY_COLORS[notification.severity]"
          variant="subtle"
          size="xs"
        />
      </span>

      <span
        v-if="!compact"
        class="text-muted mt-1 block text-xs leading-relaxed"
      >
        {{ notification.body }}
      </span>

      <span class="text-dimmed mt-1 flex flex-wrap items-center gap-x-2 text-xs">
        <span>{{ NOTIFICATION_CATEGORY_LABELS[notification.category] }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ formatDateTime(notification.createdAt) }}</span>
        <template v-if="notification.actor">
          <span aria-hidden="true">·</span>
          <span>{{ notification.actor }}</span>
        </template>
      </span>
    </span>

    <span
      v-if="!notification.read"
      class="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full"
      aria-label="Unread"
    />
  </Component>
</template>
