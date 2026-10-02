<script setup lang="ts">
import type { AppNotification } from '~/types/notification'
import { formatDateTime } from '~/utils/formatters'

const props = withDefaults(defineProps<{
  notifications: AppNotification[]
  limit?: number
}>(), {
  limit: 5
})

const emit = defineEmits<{ select: [id: string] }>()

const visible = computed(() => props.notifications.slice(0, props.limit))
</script>

<template>
  <ul
    v-if="visible.length"
    class="divide-y divide-default"
  >
    <li
      v-for="item in visible"
      :key="item.id"
    >
      <button
        type="button"
        class="hover:bg-elevated/50 flex w-full items-start gap-3 px-4 py-3 text-left transition-colors sm:px-5"
        @click="emit('select', item.id)"
      >
        <span
          class="mt-1 size-1.5 shrink-0 rounded-full"
          :class="item.read ? 'bg-(--ui-border)' : 'bg-primary'"
          aria-hidden="true"
        />
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-medium text-highlighted">{{ item.title }}</span>
          <span class="text-muted mt-0.5 line-clamp-2 block text-xs leading-relaxed">{{ item.body }}</span>
          <span class="text-dimmed mt-1 block text-[0.7rem]">{{ formatDateTime(item.createdAt) }}</span>
        </span>
      </button>
    </li>
  </ul>
  <CommonEmptyState
    v-else
    title="No recent activity"
    description="Administrative and record-level activity will be listed here."
    icon="i-lucide-activity"
    size="sm"
    class="border border-dashed"
  />
</template>
