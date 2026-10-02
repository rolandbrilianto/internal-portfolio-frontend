<script setup lang="ts">
import type { PartnerCategory, PartnerDraft, PartnershipStatus } from '~/types/partner'
import { PARTNER_CATEGORY_LABELS, PARTNERSHIP_STATUS_LABELS } from '~/utils/formatters'

const props = defineProps<{ draft: PartnerDraft }>()
const emit = defineEmits<{ 'update:draft': [value: PartnerDraft] }>()

const categoryOptions = Object.entries(PARTNER_CATEGORY_LABELS).map(([value, label]) => ({ value, label }))
const statusOptions = Object.entries(PARTNERSHIP_STATUS_LABELS).map(([value, label]) => ({ value, label }))

const errors = computed(() => {
  const list: Partial<Record<keyof PartnerDraft, string>> = {}
  if (!props.draft.category) list.category = 'Select a partnership category.'
  if (!props.draft.partnershipStatus) list.partnershipStatus = 'Select the initial partnership status.'
  if (props.draft.contractStartDate && props.draft.contractEndDate
    && new Date(props.draft.contractEndDate) <= new Date(props.draft.contractStartDate)) {
    list.contractEndDate = 'The end date must be after the start date.'
  }
  return list
})

function update<K extends keyof PartnerDraft>(key: K, value: PartnerDraft[K]) {
  emit('update:draft', { ...props.draft, [key]: value })
}
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <UFormField
      label="Partnership category"
      name="category"
      required
      :error="errors.category"
    >
      <USelect
        :model-value="draft.category"
        :items="categoryOptions"
        placeholder="Select a category"
        class="w-full"
        :highlight="Boolean(errors.category)"
        @update:model-value="update('category', $event as PartnerCategory)"
      />
    </UFormField>

    <UFormField
      label="Initial partnership status"
      name="partnershipStatus"
      required
      :error="errors.partnershipStatus"
    >
      <USelect
        :model-value="draft.partnershipStatus"
        :items="statusOptions"
        placeholder="Select a status"
        class="w-full"
        :highlight="Boolean(errors.partnershipStatus)"
        @update:model-value="update('partnershipStatus', $event as PartnershipStatus)"
      />
    </UFormField>

    <UFormField
      label="Contract start date"
      name="contractStartDate"
    >
      <UInput
        :model-value="draft.contractStartDate ?? ''"
        type="date"
        class="w-full"
        @update:model-value="update('contractStartDate', $event || null)"
      />
    </UFormField>

    <UFormField
      label="Contract end date"
      name="contractEndDate"
      :error="errors.contractEndDate"
      help="Used by the 30-day expiry reminder rule."
    >
      <UInput
        :model-value="draft.contractEndDate ?? ''"
        type="date"
        class="w-full"
        :highlight="Boolean(errors.contractEndDate)"
        @update:model-value="update('contractEndDate', $event || null)"
      />
    </UFormField>
  </div>

  <UFormField
    label="Partnership notes"
    name="contractNotes"
    help="Scope, commercial context and internal agreements relevant to the collaboration."
  >
    <UTextarea
      :model-value="draft.contractNotes"
      :rows="5"
      placeholder="Scope and context of the collaboration"
      class="w-full"
      @update:model-value="update('contractNotes', $event)"
    />
  </UFormField>

  <UAlert
    color="info"
    variant="subtle"
    icon="i-lucide-shield-question"
    title="Verification required before activation"
    description="New partner records require internal verification before the partnership status can be set to Active."
  />
</template>
