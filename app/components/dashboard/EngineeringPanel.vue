<script setup lang="ts">
import { PARTNER_CATEGORY_LABELS } from '~/utils/formatters'

const portfolioStore = usePortfolioStore()
const partnerStore = usePartnerStore()
const enablementStore = useEnablementStore()

const capabilityMatrix = computed(() =>
  partnerStore.items.flatMap(partner =>
    partner.capabilities.map(capability => ({
      partnerName: partner.legalName,
      capability
    }))
  )
)
</script>

<template>
  <div class="space-y-5">
    <DashboardMetricGrid :columns="4">
      <DashboardMetricCard
        label="Active projects"
        icon="i-lucide-folder-kanban"
        :value="portfolioStore.totals.active > 0 ? String(portfolioStore.totals.active) : null"
        description="Portfolio projects currently in execution."
        to="/portfolio"
        link-label="Open portfolio"
        unavailable
      />
      <DashboardMetricCard
        label="Projects in portfolio"
        icon="i-lucide-layers"
        :value="portfolioStore.totals.total > 0 ? String(portfolioStore.totals.total) : null"
        description="Total technical project records maintained."
        to="/portfolio/dashboard"
        link-label="Open portfolio dashboard"
        unavailable
      />
      <DashboardMetricCard
        label="Resource utilisation"
        icon="i-lucide-users-round"
        :value="null"
        description="Internal allocation across the active project portfolio."
        unavailable
      />
      <DashboardMetricCard
        label="Partner capabilities"
        icon="i-lucide-cpu"
        :value="capabilityMatrix.length > 0 ? String(capabilityMatrix.length) : null"
        description="Technical capabilities recorded across partner records."
        to="/partners"
        link-label="Open partner directory"
        unavailable
      />
    </DashboardMetricGrid>

    <div class="grid gap-5 xl:grid-cols-3">
      <DashboardSection
        title="Project portfolio status"
        description="Delivery status of recorded portfolio projects."
        icon="i-lucide-activity"
        class="xl:col-span-2"
        empty-title="No portfolio data available yet"
        empty-description="Portfolio projects will be listed here as they are recorded by the responsible units."
      >
        <ul
          v-if="portfolioStore.filteredItems.length"
          class="divide-y divide-default"
        >
          <li
            v-for="project in portfolioStore.filteredItems"
            :key="project.id"
          >
            <NuxtLink
              :to="`/portfolio/${project.id}`"
              class="hover:bg-elevated/50 flex items-center justify-between gap-3 py-2.5 transition-colors"
            >
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium text-highlighted">{{ project.name }}</span>
                <span class="text-muted block truncate text-xs">{{ project.industry }} · {{ project.year }}</span>
              </span>
              <PortfolioStatusBadge :status="project.status" />
            </NuxtLink>
          </li>
        </ul>
        <CommonEmptyState
          v-else
          title="No portfolio data available yet"
          description="Data will appear here once project records are added."
          icon="i-lucide-folder-open"
          size="sm"
          class="border border-dashed"
        >
          <UButton
            to="/portfolio"
            label="Open portfolio directory"
            icon="i-lucide-arrow-right"
            size="xs"
            color="neutral"
            variant="subtle"
          />
        </CommonEmptyState>
      </DashboardSection>

      <DashboardSection
        title="Partner technical capabilities"
        description="Capability coverage by partner category."
        icon="i-lucide-cpu"
        empty-title="No capability records available"
      >
        <ul class="space-y-2.5">
          <li
            v-for="(count, category) in partnerStore.countsByCategory"
            :key="category"
            class="flex items-center justify-between gap-3 border-b border-default pb-2.5 last:border-0 last:pb-0"
          >
            <span class="text-muted truncate text-sm">{{ PARTNER_CATEGORY_LABELS[category] }}</span>
            <span class="text-highlighted text-sm font-semibold tabular-nums">{{ count }}</span>
          </li>
        </ul>
        <CommonEmptyState
          v-if="!partnerStore.items.length"
          title="No partner capabilities recorded"
          description="Technology, Service, Channel and Marketing capability data appears once partner records exist."
          icon="i-lucide-cpu"
          size="sm"
          class="mt-4 border border-dashed"
        />
      </DashboardSection>
    </div>

    <div class="grid gap-5 xl:grid-cols-2">
      <DashboardSection
        title="Resource utilisation"
        description="Planned internal allocation across active projects."
        icon="i-lucide-chart-pie"
      >
        <DashboardEmptyMetric
          label="Utilisation by project"
          reason="Utilisation figures depend on verified project schedules and capacity data, which are not connected yet."
          icon="i-lucide-gauge"
        />
      </DashboardSection>

      <DashboardSection
        title="Project activity"
        description="Enablement and evaluation activity linked to delivered projects."
        icon="i-lucide-timeline"
        empty-title="No project activity recorded"
      >
        <EnablementTimeline
          :activities="enablementStore.timeline"
          :limit="4"
        />
      </DashboardSection>
    </div>
  </div>
</template>
