<script setup lang="ts">
import type { SelectOption } from '~/types/common'
import type { ContractStatus, PartnerCategory, PartnershipStatus, VerificationStatus } from '~/types/partner'
import {
  CONTRACT_STATUS_LABELS,
  PARTNER_CATEGORY_LABELS,
  PARTNERSHIP_STATUS_LABELS,
  VERIFICATION_STATUS_LABELS
} from '~/utils/formatters'

function toOptions<T extends string>(labels: Record<T, string>): SelectOption[] {
  return (Object.entries(labels) as Array<[T, string]>).map(([value, label]) => ({ value, label }))
}

const store = usePartnerStore()

const categories = toOptions<PartnerCategory>(PARTNER_CATEGORY_LABELS)
const statuses = toOptions<PartnershipStatus>(PARTNERSHIP_STATUS_LABELS)
const verifications = toOptions<VerificationStatus>(VERIFICATION_STATUS_LABELS)
const contractStatuses = toOptions<ContractStatus>(CONTRACT_STATUS_LABELS)
</script>

<template>
  <div class="border-default rounded-lg border bg-(--ui-bg) shadow-xs p-3">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-end">
      <UFormField
        label="Search"
        name="search"
        class="flex-1"
      >
        <UInput
          :model-value="store.filters.search"
          icon="i-lucide-search"
          placeholder="Partner, code, capability…"
          class="w-full"
          @update:model-value="store.filters.search = $event"
        />
      </UFormField>

      <CommonFilterSelect
        label="Category"
        :items="categories"
        :model-value="store.filters.categories"
        @update:model-value="store.filters.categories = $event as PartnerCategory[]"
      />

      <CommonFilterSelect
        label="Status"
        :items="statuses"
        :model-value="store.filters.statuses"
        @update:model-value="store.filters.statuses = $event as PartnershipStatus[]"
      />

      <CommonFilterSelect
        label="Verification"
        :items="verifications"
        :model-value="store.filters.verificationStatuses"
        @update:model-value="store.filters.verificationStatuses = $event as VerificationStatus[]"
      />

      <CommonFilterSelect
        label="Contract"
        :items="contractStatuses"
        :model-value="store.filters.contractStatuses"
        @update:model-value="store.filters.contractStatuses = $event as ContractStatus[]"
      />

      <UButton
        v-if="store.hasActiveFilters"
        label="Reset"
        icon="i-lucide-filter-x"
        color="neutral"
        variant="subtle"
        size="sm"
        class="lg:mb-1"
        @click="store.resetFilters()"
      />
    </div>
  </div>
</template>
