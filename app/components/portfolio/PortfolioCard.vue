<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio'
import { PORTFOLIO_SCALE_LABELS, formatPercent } from '~/utils/formatters'

defineProps<{ project: PortfolioProject }>()
</script>

<template>
  <article class="border-default rounded-lg border bg-(--ui-bg) shadow-xs flex flex-col gap-3 p-4 transition-colors hover:border-primary/40">
    <header class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <NuxtLink
          :to="`/portfolio/${project.id}`"
          class="text-highlighted block truncate text-sm font-semibold hover:underline"
        >
          {{ project.name }}
        </NuxtLink>
        <p class="text-dimmed truncate text-xs">
          {{ project.reference }} · {{ project.year }}
        </p>
      </div>
      <PortfolioStatusBadge :status="project.status" />
    </header>

    <p class="text-muted line-clamp-3 text-xs leading-relaxed">
      {{ project.summary || 'No summary has been recorded for this project yet.' }}
    </p>

    <dl class="grid grid-cols-2 gap-2 text-xs">
      <div>
        <dt class="text-dimmed">
          Industry
        </dt>
        <dd class="text-muted truncate">
          {{ project.industry || '—' }}
        </dd>
      </div>
      <div>
        <dt class="text-dimmed">
          Scale
        </dt>
        <dd class="text-muted truncate">
          {{ PORTFOLIO_SCALE_LABELS[project.scale] }}
        </dd>
      </div>
      <div>
        <dt class="text-dimmed">
          Average ROI
        </dt>
        <dd class="text-muted">
          {{ formatPercent(null) }}
        </dd>
      </div>
      <div>
        <dt class="text-dimmed">
          Partners
        </dt>
        <dd class="text-muted">
          {{ project.partners.length }}
        </dd>
      </div>
    </dl>

    <div class="mt-auto flex flex-wrap gap-1.5">
      <UBadge
        v-for="technology in project.technologies.slice(0, 3)"
        :key="technology"
        color="neutral"
        variant="outline"
        size="xs"
      >
        {{ technology }}
      </UBadge>
      <UBadge
        v-if="project.technologies.length > 3"
        color="neutral"
        variant="soft"
        size="xs"
      >
        +{{ project.technologies.length - 3 }}
      </UBadge>
    </div>
  </article>
</template>
