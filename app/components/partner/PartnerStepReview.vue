<script setup lang="ts">
import type { PartnerDraft } from '~/types/partner'
import { PARTNER_CATEGORY_LABELS, PARTNERSHIP_STATUS_LABELS, formatDate } from '~/utils/formatters'

defineProps<{ draft: PartnerDraft, partnershipCode: string }>()
</script>

<template>
  <div class="space-y-4">
    <UAlert
      color="info"
      variant="subtle"
      icon="i-lucide-info"
      title="Review before submission"
      description="Submission is disabled in this phase: no backend endpoint exists to persist partner records."
    />

    <CommonSectionCard
      title="Partner profile"
      icon="i-lucide-building-2"
    >
      <dl class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <CommonMetricPlaceholder
          label="Legal name"
          :value="draft.legalName || null"
        />
        <CommonMetricPlaceholder
          label="Trading name"
          :value="draft.tradingName || null"
        />
        <CommonMetricPlaceholder
          label="Partnership code"
          :value="partnershipCode"
          hint="Generated on submission"
        />
        <CommonMetricPlaceholder
          label="Country"
          :value="draft.country || null"
        />
        <CommonMetricPlaceholder
          label="Industry"
          :value="draft.industry || null"
        />
        <CommonMetricPlaceholder
          label="Website"
          :value="draft.website || null"
        />
      </dl>
      <p class="text-muted mt-4 text-sm leading-relaxed">
        {{ draft.summary || 'No company profile provided.' }}
      </p>
    </CommonSectionCard>

    <CommonSectionCard
      title="Capabilities"
      icon="i-lucide-cpu"
    >
      <ul
        v-if="draft.capabilities.length"
        class="flex flex-wrap gap-1.5"
      >
        <UBadge
          v-for="capability in draft.capabilities"
          :key="capability.id"
          color="neutral"
          variant="outline"
          size="sm"
        >
          {{ capability.name }} · {{ capability.level }}<template v-if="capability.certified">
            · certified
          </template>
        </UBadge>
      </ul>
      <p
        v-else
        class="text-muted text-sm"
      >
        No capabilities provided.
      </p>
    </CommonSectionCard>

    <CommonSectionCard
      title="Partnership information"
      icon="i-lucide-handshake"
    >
      <dl class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CommonMetricPlaceholder
          label="Category"
          :value="draft.category ? PARTNER_CATEGORY_LABELS[draft.category] : null"
        />
        <CommonMetricPlaceholder
          label="Status"
          :value="draft.partnershipStatus ? PARTNERSHIP_STATUS_LABELS[draft.partnershipStatus] : null"
        />
        <CommonMetricPlaceholder
          label="Contract start"
          :value="formatDate(draft.contractStartDate)"
        />
        <CommonMetricPlaceholder
          label="Contract end"
          :value="formatDate(draft.contractEndDate)"
        />
      </dl>
      <p
        v-if="draft.contractNotes"
        class="text-muted mt-4 text-sm leading-relaxed"
      >
        {{ draft.contractNotes }}
      </p>
    </CommonSectionCard>

    <CommonSectionCard
      title="Legal documents"
      icon="i-lucide-folder-lock"
    >
      <ul
        v-if="draft.documents.length"
        class="space-y-2"
      >
        <li
          v-for="document in draft.documents"
          :key="document.id"
          class="flex flex-wrap items-center justify-between gap-2 border-b border-default pb-2 last:border-0 last:pb-0"
        >
          <span class="min-w-0">
            <span class="text-highlighted block truncate text-sm font-medium">{{ document.label }}</span>
            <span class="text-dimmed block truncate text-xs">{{ document.fileName }}</span>
          </span>
          <span class="text-muted shrink-0 text-xs">{{ formatDate(document.issuedAt) }}</span>
        </li>
      </ul>
      <p
        v-else
        class="text-muted text-sm"
      >
        No documents attached.
      </p>
    </CommonSectionCard>

    <CommonSectionCard
      title="Contacts"
      icon="i-lucide-contact-round"
    >
      <ul
        v-if="draft.contacts.length"
        class="space-y-2"
      >
        <li
          v-for="(contact, index) in draft.contacts"
          :key="index"
          class="flex flex-wrap items-center justify-between gap-2 border-b border-default pb-2 last:border-0 last:pb-0"
        >
          <span class="min-w-0">
            <span class="text-highlighted block truncate text-sm">{{ contact.role || 'Role not set' }}</span>
            <span class="text-dimmed block truncate text-xs">{{ contact.email || 'No email' }}</span>
          </span>
          <span class="text-muted shrink-0 text-xs">{{ contact.phone || '—' }}</span>
        </li>
      </ul>
      <p
        v-else
        class="text-muted text-sm"
      >
        No contacts provided.
      </p>
    </CommonSectionCard>
  </div>
</template>
