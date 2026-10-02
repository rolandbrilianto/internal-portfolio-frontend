<script setup lang="ts">
import { formatPercent } from '~/utils/formatters'

const portfolioStore = usePortfolioStore()
const partnerStore = usePartnerStore()
const documentStore = useDocumentStore()
const administrationStore = useAdministrationStore()
const notificationStore = useNotificationStore()

const pendingTasks = computed(() => ({
  'partner-verification': partnerStore.items.filter(item => item.verification === 'pending').length,
  'document-review': documentStore.counts.pending,
  'content-scheduled': administrationStore.content.filter(item => item.workflow === 'scheduled').length
}))
</script>

<template>
  <div class="space-y-5">
    <DashboardMetricGrid :columns="4">
      <DashboardMetricCard
        label="Portfolio health"
        icon="i-lucide-activity"
        :value="null"
        description="Aggregate health across all recorded projects."
        to="/portfolio/dashboard"
        link-label="Open portfolio dashboard"
        unavailable
      />
      <DashboardMetricCard
        label="Portfolio coverage"
        icon="i-lucide-folder-kanban"
        :value="portfolioStore.totals.total > 0 ? String(portfolioStore.totals.total) : null"
        description="Total projects recorded in the internal portfolio."
        to="/portfolio"
        link-label="Open directory"
        unavailable
      />
      <DashboardMetricCard
        label="Registered partners"
        icon="i-lucide-handshake"
        :value="partnerStore.items.length > 0 ? String(partnerStore.items.length) : null"
        description="Partner entities available across all categories."
        to="/partners"
        link-label="Open partner directory"
        unavailable
      />
      <DashboardMetricCard
        label="Pending administrative tasks"
        icon="i-lucide-list-todo"
        :value="null"
        description="Verifications, document reviews and scheduled publications."
        to="/admin"
        link-label="Open administration"
        unavailable
      />
    </DashboardMetricGrid>

    <div class="grid gap-5 xl:grid-cols-3">
      <DashboardSection
        title="Business performance"
        description="Macro business performance, revenue and ROI reporting."
        icon="i-lucide-trending-up"
        class="xl:col-span-2"
        empty-title="Business performance reporting is scheduled for a later phase"
        empty-description="Performance visualisation is listed as out of scope for the current release in the BRD scope matrix."
      >
        <div class="grid gap-3 sm:grid-cols-3">
          <DashboardEmptyMetric
            label="ROI overview"
            reason="ROI aggregation requires verified portfolio and finance data."
            icon="i-lucide-percent"
          />
          <DashboardEmptyMetric
            label="Revenue pipeline"
            reason="Pipeline figures come from the external CRM synchronisation planned for a later phase."
            icon="i-lucide-coins"
          />
          <DashboardEmptyMetric
            label="Performance trend"
            reason="Trend charts appear once periodic performance records exist."
            icon="i-lucide-chart-line"
          />
        </div>
        <p class="text-dimmed mt-4 text-xs leading-relaxed">
          Average recorded ROI:
          <span class="font-medium">{{ formatPercent(portfolioStore.averageRoi) }}</span>
        </p>
      </DashboardSection>

      <DashboardSection
        title="Partnership overview"
        description="Current partnership lifecycle distribution."
        icon="i-lucide-handshake"
        empty-title="No partnership records available"
        empty-description="Partner entities and collaboration status appear once records are added."
      >
        <dl class="space-y-2.5">
          <div
            v-for="(count, status) in partnerStore.countsByStatus"
            :key="status"
            class="flex items-center justify-between gap-3 border-b border-default pb-2.5 last:border-0 last:pb-0"
          >
            <dt class="text-muted text-sm">
              {{ status.replace('-', ' ') }}
            </dt>
            <dd class="text-highlighted text-sm font-semibold tabular-nums">
              {{ count }}
            </dd>
          </div>
        </dl>
        <CommonEmptyState
          v-if="!partnerStore.items.length"
          title="No partnership records available"
          description="Lifecycle stages stay visible so the structure is clear before data is loaded."
          icon="i-lucide-handshake"
          size="sm"
          class="mt-4 border border-dashed"
        >
          <UButton
            to="/partnership"
            label="Open pipeline"
            icon="i-lucide-arrow-right"
            size="xs"
            color="neutral"
            variant="subtle"
          />
        </CommonEmptyState>
        <p class="text-dimmed mt-4 text-xs leading-relaxed">
          Partner distribution is derived from the partner directory only. No aggregated business figures are pre-filled.
        </p>
      </DashboardSection>
    </div>

    <div class="grid gap-5 xl:grid-cols-3">
      <DashboardSection
        title="Pending administrative tasks"
        description="Verification and review workload across the platform."
        icon="i-lucide-list-todo"
        class="xl:col-span-2"
      >
        <dl class="grid gap-3 sm:grid-cols-3">
          <CommonMetricPlaceholder
            label="Partner verification"
            hint="Verification status pending"
            :value="pendingTasks['partner-verification'] > 0 ? String(pendingTasks['partner-verification']) : null"
          />
          <CommonMetricPlaceholder
            label="Document review"
            hint="Documents pending"
            :value="pendingTasks['document-review'] > 0 ? String(pendingTasks['document-review']) : null"
          />
          <CommonMetricPlaceholder
            label="Scheduled content"
            hint="Scheduled publication"
            :value="pendingTasks['content-scheduled'] > 0 ? String(pendingTasks['content-scheduled']) : null"
          />
        </dl>
        <CommonEmptyState
          v-if="!partnerStore.items.length && !documentStore.items.length && !administrationStore.content.length"
          title="No administrative tasks queued"
          description="Verification assignments, document reviews and publication schedules appear here."
          icon="i-lucide-clipboard-list"
          size="sm"
          class="mt-4 border border-dashed"
        />
      </DashboardSection>

      <DashboardSection
        title="Recent activity"
        description="Latest record-level events."
        icon="i-lucide-history"
        empty-title="No recent activity"
      >
        <DashboardActivityFeed :notifications="notificationStore.filteredItems.slice(0, 6)" />
        <UButton
          to="/admin/audit-trail"
          label="Open audit trail"
          icon="i-lucide-scroll-text"
          color="neutral"
          variant="subtle"
          size="sm"
          block
          class="mt-4"
        />
      </DashboardSection>
    </div>

    <DashboardSection
      title="Quick access"
      description="Frequently used executive modules."
      icon="i-lucide-zap"
    >
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardShortcutCard
          icon="i-lucide-folder-kanban"
          label="Portfolio Directory"
          to="/portfolio"
        />
        <DashboardShortcutCard
          icon="i-lucide-users"
          label="Partner Directory"
          to="/partners"
        />
        <DashboardShortcutCard
          icon="i-lucide-kanban"
          label="Partnership Pipeline"
          to="/partnership"
        />
        <DashboardShortcutCard
          icon="i-lucide-file-pen-line"
          label="Content Management"
          to="/admin/content"
        />
      </div>
    </DashboardSection>
  </div>
</template>
