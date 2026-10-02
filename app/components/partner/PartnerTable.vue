<script setup lang="ts">
import type { Partner } from '~/types/partner'
import { CONTRACT_STATUS_LABELS, formatDate } from '~/utils/formatters'

withDefaults(defineProps<{
  partners: Partner[]
  emptyTitle?: string
  emptyDescription?: string
}>(), {
  emptyTitle: 'No partner records available',
  emptyDescription: 'Partner records appear here once they are loaded through the service layer.'
})

const store = usePartnerStore()

const columns = [
  { key: 'partner', label: 'Partner', class: 'min-w-64' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
  { key: 'verification', label: 'Verification' },
  { key: 'contract', label: 'Contract' },
  { key: 'expires', label: 'Expires' },
  { key: 'actions', label: 'Actions', align: 'right' as const }
]

function primaryContract(partner: Partner) {
  return partner.contracts[0] ?? null
}
</script>

<template>
  <CommonDataTable
    :columns="columns"
    caption="Partner directory"
    :empty="partners.length === 0"
    :empty-title="emptyTitle"
    :empty-description="emptyDescription ?? 'Data will appear here once partner records are added.'"
    empty-icon="i-lucide-users"
    min-width="60rem"
  >
    <tr
      v-for="partner in partners"
      :key="partner.id"
      class="hover:bg-elevated/40 transition-colors"
    >
      <td class="px-4 py-3">
        <NuxtLink
          :to="`/partners/${partner.id}`"
          class="text-highlighted block truncate text-sm font-medium hover:underline"
        >
          {{ partner.legalName }}
        </NuxtLink>
        <p class="text-dimmed truncate text-xs">
          {{ partner.partnershipCode }}<template v-if="partner.industry">
            · {{ partner.industry }}
          </template>
        </p>
      </td>
      <td class="px-4 py-3">
        <PartnerCategoryBadge :category="partner.category" />
      </td>
      <td class="px-4 py-3">
        <PartnerStatusBadge :status="partner.status" />
      </td>
      <td class="px-4 py-3">
        <PartnerVerificationBadge :status="partner.verification" />
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ primaryContract(partner) ? CONTRACT_STATUS_LABELS[primaryContract(partner)!.status] : '—' }}
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ formatDate(primaryContract(partner)?.endDate) }}
      </td>
      <td class="px-4 py-3 text-right">
        <UButton
          :to="`/partners/${partner.id}`"
          icon="i-lucide-arrow-up-right"
          color="neutral"
          variant="ghost"
          size="xs"
          :aria-label="`Open ${partner.legalName}`"
        />
      </td>
    </tr>

    <template #empty-action>
      <UButton
        label="Clear filters"
        icon="i-lucide-filter-x"
        color="neutral"
        variant="subtle"
        size="xs"
        :disabled="!store.hasActiveFilters"
        @click="store.resetFilters()"
      />
    </template>
  </CommonDataTable>
</template>
