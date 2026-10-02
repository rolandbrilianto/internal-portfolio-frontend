<script setup lang="ts">
import type { AppRoleKey } from '~/types/role'
import DashboardCommercialPanel from '~/components/dashboard/CommercialPanel.vue'
import DashboardEngineeringPanel from '~/components/dashboard/EngineeringPanel.vue'
import DashboardExecutivePanel from '~/components/dashboard/ExecutivePanel.vue'

definePageMeta({
  title: 'Dashboard',
  breadcrumb: [{ label: 'Dashboard' }]
})

useHead({ title: 'Dashboard' })

const roleStore = useRoleStore()
const partnerStore = usePartnerStore()
const portfolioStore = usePortfolioStore()
const partnershipStore = usePartnershipStore()
const documentStore = useDocumentStore()
const notificationStore = useNotificationStore()

const ROLE_PANELS: Record<AppRoleKey, Component> = {
  'super-admin': DashboardExecutivePanel,
  'commercial': DashboardCommercialPanel,
  'engineering': DashboardEngineeringPanel
}

const rolePanel = computed(() => ROLE_PANELS[roleStore.currentRole])

const loading = computed(
  () => portfolioStore.loading
    || partnerStore.loading
    || partnershipStore.loading
    || documentStore.loading
    || notificationStore.loading
)

onMounted(() => {
  void roleStore.restore()
  void portfolioStore.load()
  void partnerStore.load()
  void partnershipStore.load()
  void documentStore.load()
  void notificationStore.load()
})
</script>

<template>
  <div class="space-y-6">
    <DashboardHeader />

    <CommonDataSourceNotice />

    <CommonLoadingState
      v-if="loading"
      label="Loading dashboard data"
    />

    <component
      :is="rolePanel"
      v-else-if="rolePanel"
    />
  </div>
</template>
