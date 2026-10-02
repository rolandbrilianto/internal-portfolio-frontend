<script setup lang="ts">
definePageMeta({
  title: 'Partner record',
  breadcrumb: [{ label: 'Partners', to: '/partners' }, { label: 'Partner record' }]
})

const route = useRoute()
const store = usePartnerStore()

const id = computed(() => String(route.params.id ?? ''))
const partner = computed(() => store.findById(id.value))

onMounted(() => {
  if (!store.loaded) store.load()
})

useHead({ title: computed(() => partner.value?.legalName ?? 'Partner record') })
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Partner record"
      :title="partner?.legalName ?? 'Partner record unavailable'"
      :description="partner?.tradingName ? `Trading as ${partner.tradingName}` : 'The requested partner record could not be found in the loaded dataset.'"
      :badge="partner?.partnershipCode"
      icon="i-lucide-building-2"
    >
      <template #actions>
        <UButton
          to="/partners"
          label="Back to directory"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="subtle"
          size="sm"
        />
        <UButton
          v-if="partner"
          :to="`/partnerships?partner=${partner.id}`"
          label="View partnership"
          icon="i-lucide-handshake"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </template>

      <template #meta>
        <div
          v-if="partner"
          class="flex flex-wrap items-center gap-2"
        >
          <PartnerStatusBadge :status="partner.status" />
          <PartnerCategoryBadge :category="partner.category" />
          <PartnerVerificationBadge :status="partner.verification" />
          <span class="text-dimmed text-xs">{{ partner.country || 'Country not recorded' }}</span>
        </div>
      </template>
    </CommonPageHeader>

    <CommonLoadingState
      v-if="store.loading"
      label="Loading partner record"
    />

    <PartnerEmptyState
      v-else-if="!partner"
      title="No partner record available"
      description="Partner records appear here once they have been loaded through the service layer."
      class="border-default rounded-lg border bg-(--ui-bg) shadow-xs"
    >
      <UButton
        to="/partners"
        label="Back to directory"
        icon="i-lucide-arrow-left"
        size="sm"
        color="neutral"
        variant="subtle"
      />
    </PartnerEmptyState>

    <PartnerDetail
      v-else
      :partner="partner"
    />
  </div>
</template>
