<script setup lang="ts">
import type { Partner } from '~/types/partner'

defineProps<{ partner: Partner }>()
</script>

<template>
  <ul
    v-if="partner.projects.length"
    class="divide-y divide-default"
  >
    <li
      v-for="project in partner.projects"
      :key="project.portfolioId"
    >
      <NuxtLink
        :to="`/portfolio/${project.portfolioId}`"
        class="hover:bg-elevated/50 flex items-center justify-between gap-3 py-3 transition-colors"
      >
        <div class="min-w-0">
          <p class="text-highlighted truncate text-sm font-medium">
            {{ project.portfolioName }}
          </p>
          <p class="text-muted truncate text-xs">
            {{ project.role || 'No role recorded' }}
          </p>
        </div>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="text-dimmed size-4 shrink-0"
          aria-hidden="true"
        />
      </NuxtLink>
    </li>
  </ul>
  <CommonEmptyState
    v-else
    title="No project relationships recorded"
    description="Project – partner mapping links this partner to portfolio projects."
    icon="i-lucide-unlink"
    size="sm"
    class="border border-dashed"
  />
</template>
