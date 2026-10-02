<script setup lang="ts">
interface Column {
  key: string
  label: string
  class?: string
  align?: 'left' | 'right' | 'center'
}

interface Props {
  columns: Column[]
  caption: string
  /** Hides the body and renders the designed empty state instead. */
  empty: boolean
  emptyTitle: string
  emptyDescription?: string
  emptyIcon?: string
  minWidth?: string
}

withDefaults(defineProps<Props>(), {
  emptyDescription: undefined,
  emptyIcon: 'i-lucide-database',
  minWidth: '46rem'
})

const alignClass: Record<'left' | 'right' | 'center', string> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center'
}

function headerClass(column: Column) {
  return [alignClass[column.align ?? 'left'], column.class].filter(Boolean).join(' ')
}
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs overflow-hidden">
    <div class="scrollbar-thin overflow-x-auto">
      <table
        class="w-full border-collapse text-sm"
        :style="{ minWidth }"
      >
        <caption class="sr-only">
          {{ caption }}
        </caption>
        <thead>
          <tr class="border-b border-default">
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="text-muted text-xs font-semibold tracking-wider uppercase px-4 py-3"
              :class="headerClass(column)"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody
          v-if="!empty"
          class="divide-y divide-default"
        >
          <slot />
        </tbody>
        <tbody v-else>
          <tr>
            <td
              :colspan="columns.length"
              class="p-4"
            >
              <CommonEmptyState
                :title="emptyTitle"
                :description="emptyDescription"
                :icon="emptyIcon"
                class="border border-dashed"
              >
                <slot name="empty-action" />
              </CommonEmptyState>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
