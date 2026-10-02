<script setup lang="ts">
const route = useRoute()

const roleStore = useRoleStore()
const appStore = useAppStore()
const portfolioStore = usePortfolioStore()
const partnerStore = usePartnerStore()
const partnershipStore = usePartnershipStore()
const evaluationStore = useEvaluationStore()
const enablementStore = useEnablementStore()
const documentStore = useDocumentStore()
const notificationStore = useNotificationStore()
const administrationStore = useAdministrationStore()

/** Domain stores are hydrated once per page load, always through their service. */
function loadDomainData() {
  void portfolioStore.load()
  void partnerStore.load()
  void partnershipStore.load()
  void evaluationStore.load()
  void enablementStore.load()
  void documentStore.load()
  void notificationStore.load()
  void administrationStore.load()
}

onMounted(() => {
  roleStore.restore()
  loadDomainData()
})

useHead({
  titleTemplate: title => (title ? `${title} · Portfolio & Partnership` : 'Portfolio & Partnership')
})

watch(
  () => route.fullPath,
  () => appStore.closeMobileNavigation()
)
</script>

<template>
  <div class="bg-(--ui-bg-muted)/30 flex min-h-screen">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-(--ui-bg) focus:px-3 focus:py-2 focus:text-sm focus:shadow-lg"
    >
      Skip to main content
    </a>

    <AppSidebar />

    <div class="flex min-w-0 flex-1 flex-col">
      <AppTopbar />

      <main
        id="main-content"
        class="flex-1 px-3 py-5 sm:px-5 sm:py-6 lg:px-7"
      >
        <div class="mx-auto w-full max-w-[100rem] space-y-6">
          <CommonDataSourceNotice />
          <slot />
        </div>
      </main>

      <footer class="border-t border-default px-4 py-4 sm:px-6">
        <div class="text-muted mx-auto flex max-w-[100rem] flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>Internal Portfolio &amp; Partnership Management Platform — frontend phase.</p>
          <p>Restricted to internal users. Business data is not yet connected.</p>
        </div>
      </footer>
    </div>

    <AppMobileNavigation />
    <AppCommandPalette />
  </div>
</template>
