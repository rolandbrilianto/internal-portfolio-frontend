<script setup lang="ts">
import { PARTNER_CATEGORY_ICONS, PARTNER_CATEGORY_LABELS } from '~/utils/formatters'

const partnershipStore = usePartnershipStore()
const partnerStore = usePartnerStore()
const documentStore = useDocumentStore()
const notificationStore = useNotificationStore()

const verificationQueue = computed(() =>
  partnerStore.items.filter(item => item.verification === 'pending' || item.verification === 'unverified')
)
</script>

<template>
  <div class="space-y-5">
    <DashboardMetricGrid :columns="4">
      <DashboardMetricCard
        label="Partnership pipeline"
        icon="i-lucide-kanban"
        :value="partnershipStore.filteredItems.length > 0 ? String(partnershipStore.filteredItems.length) : null"
        description="Partnerships tracked across every lifecycle stage."
        to="/partnership"
        link-label="Open pipeline"
        unavailable
      />
      <DashboardMetricCard
        label="Verification queue"
        icon="i-lucide-shield-question"
        :value="verificationQueue.length > 0 ? String(verificationQueue.length) : null"
        description="Partner records awaiting verification."
        to="/partners"
        link-label="Open partner directory"
        unavailable
      />
      <DashboardMetricCard
        label="Conversion rate"
        icon="i-lucide-percent"
        :value="null"
        description="Ratio of partnership prospects converted to active agreements."
        unavailable
      />
      <DashboardMetricCard
        label="Contracts expiring"
        icon="i-lucide-calendar-clock"
        :value="documentStore.expiringSoon.length > 0 ? String(documentStore.expiringSoon.length) : null"
        description="Contracts inside the 30-day reminder window."
        to="/documents"
        link-label="Open documents"
        unavailable
      />
    </DashboardMetricGrid>

    <div class="grid gap-5 xl:grid-cols-3">
      <DashboardSection
        title="Partnership pipeline by stage"
        description="Distribution across Draft, Under Review, Active, Expired and Terminated."
        icon="i-lucide-kanban"
        class="xl:col-span-2"
        empty-title="No partnership records available"
        empty-description="Every stage stays visible so the pipeline structure is clear before data is loaded."
      >
        <ul class="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="summary in partnershipStore.stageSummaries"
            :key="summary.stage"
            class="border-default rounded-lg border bg-(--ui-bg-muted)/40 flex items-center justify-between gap-3 px-3 py-2.5"
          >
            <PartnershipStatusBadge :status="summary.stage" />
            <span class="text-highlighted text-sm font-semibold tabular-nums">{{ summary.count }}</span>
          </li>
        </ul>
        <CommonEmptyState
          v-if="!partnershipStore.filteredItems.length"
          title="Pipeline is empty"
          description="Stage columns are pre-rendered; records will appear here once partnerships are recorded."
          icon="i-lucide-kanban"
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
      </DashboardSection>

      <DashboardSection
        title="Partner status"
        description="Lifecycle status of registered partners."
        icon="i-lucide-users"
        empty-title="No partner records available"
      >
        <ul class="space-y-2.5">
          <li
            v-for="(count, category) in partnerStore.countsByCategory"
            :key="category"
            class="flex items-center justify-between gap-3 border-b border-default pb-2.5 last:border-0 last:pb-0"
          >
            <span class="text-muted flex items-center gap-1.5 text-sm">
              <UIcon
                :name="PARTNER_CATEGORY_ICONS[category]"
                class="size-3.5"
                aria-hidden="true"
              />
              {{ PARTNER_CATEGORY_LABELS[category] }}
            </span>
            <span class="text-highlighted text-sm font-semibold tabular-nums">{{ count }}</span>
          </li>
        </ul>
        <CommonEmptyState
          v-if="!partnerStore.items.length"
          title="No partner records yet"
          description="Technology, Channel, Service and Marketing partner categories appear once records exist."
          icon="i-lucide-user-plus"
          size="sm"
          class="mt-4 border border-dashed"
        >
          <UButton
            to="/partners/create"
            label="Register a partner"
            icon="i-lucide-plus"
            size="xs"
            color="neutral"
            variant="subtle"
          />
        </CommonEmptyState>
      </DashboardSection>
    </div>

    <div class="grid gap-5 xl:grid-cols-2">
      <DashboardSection
        title="Contract expiry reminders"
        description="Partners whose contracts approach the 30-day reminder threshold."
        icon="i-lucide-calendar-clock"
      >
        <DashboardExpiryList :documents="documentStore.items" />
      </DashboardSection>

      <DashboardSection
        title="Partnership activity"
        description="Verification assignments and status updates."
        icon="i-lucide-bell-ring"
      >
        <DashboardActivityFeed
          :notifications="notificationStore.items.filter(item => item.category === 'partnership')"
          @select="notificationStore.markAsRead"
        />
      </DashboardSection>
    </div>
  </div>
</template>
