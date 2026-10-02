<script setup lang="ts">
import type { LegalDocument } from '~/types/document'
import {
  DOCUMENT_CATEGORY_ICONS,
  DOCUMENT_CATEGORY_LABELS,
  DOCUMENT_STATUS_COLORS,
  DOCUMENT_STATUS_LABELS,
  daysUntil,
  formatDate,
  formatFileSize
} from '~/utils/formatters'
import { CONTRACT_EXPIRY_REMINDER_DAYS } from '~/utils/constants'

defineProps<{
  documents: LegalDocument[]
}>()

function daysRemaining(document: LegalDocument) {
  return daysUntil(document.expiresAt)
}

function expiryLabel(document: LegalDocument) {
  const remaining = daysRemaining(document)
  if (remaining === null) return 'No expiry date'
  if (remaining < 0) return `Expired ${Math.abs(remaining)} day(s) ago`
  if (remaining === 0) return 'Expires today'
  return `${remaining} day(s) remaining`
}

function expiryTone(document: LegalDocument) {
  const remaining = daysRemaining(document)
  if (remaining === null) return 'neutral'
  if (remaining < 0) return 'error'
  if (remaining <= CONTRACT_EXPIRY_REMINDER_DAYS) return 'warning'
  return 'neutral'
}
</script>

<template>
  <CommonDataTable
    :columns="[
      { key: 'document', label: 'Document', class: 'min-w-64' },
      { key: 'category', label: 'Category' },
      { key: 'partner', label: 'Partner' },
      { key: 'status', label: 'Status' },
      { key: 'issued', label: 'Issued' },
      { key: 'expires', label: 'Expires', align: 'right' }
    ]"
    caption="Document archive"
    :empty="documents.length === 0"
    empty-title="No documents archived"
    empty-description="Legalities, contracts and certifications are archived chronologically by issuance date."
    empty-icon="i-lucide-folder-lock"
    min-width="64rem"
  >
    <tr
      v-for="document in documents"
      :key="document.id"
      class="hover:bg-elevated/40 transition-colors"
    >
      <td class="px-4 py-3">
        <p class="text-highlighted text-sm font-medium">
          {{ document.title }}
        </p>
        <p class="text-dimmed text-xs">
          {{ document.reference }} · {{ formatFileSize(document.fileSize) }}
        </p>
      </td>
      <td class="px-4 py-3">
        <CommonStatusBadge
          :label="DOCUMENT_CATEGORY_LABELS[document.category]"
          :icon="DOCUMENT_CATEGORY_ICONS[document.category]"
          color="neutral"
          variant="outline"
          size="xs"
        />
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ document.partnerName || '—' }}
      </td>
      <td class="px-4 py-3">
        <CommonStatusBadge
          :label="DOCUMENT_STATUS_LABELS[document.status]"
          :color="DOCUMENT_STATUS_COLORS[document.status]"
          variant="subtle"
          size="xs"
        />
        <p
          v-if="document.rejectionReason"
          class="text-error mt-1 text-xs"
        >
          {{ document.rejectionReason }}
        </p>
      </td>
      <td class="text-muted px-4 py-3 text-sm">
        {{ formatDate(document.issuedAt) }}
      </td>
      <td class="px-4 py-3 text-right">
        <p class="text-muted text-sm">
          {{ formatDate(document.expiresAt) }}
        </p>
        <CommonStatusBadge
          :label="expiryLabel(document)"
          :color="expiryTone(document)"
          variant="subtle"
          size="xs"
          class="mt-1"
        />
      </td>
    </tr>
  </CommonDataTable>
</template>
