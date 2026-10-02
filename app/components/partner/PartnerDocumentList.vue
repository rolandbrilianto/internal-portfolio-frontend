<script setup lang="ts">
import type { LegalDocument } from '~/types/document'
import { DOCUMENT_STATUS_LABELS, formatDate } from '~/utils/formatters'

defineProps<{ documents: LegalDocument[] }>()
</script>

<template>
  <ol
    v-if="documents.length"
    class="space-y-3"
  >
    <li
      v-for="document in documents"
      :key="document.id"
      class="border-l-2 border-default pl-4"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <p class="text-highlighted text-sm font-medium">
          {{ document.title }}
        </p>
        <CommonStatusBadge
          :label="DOCUMENT_STATUS_LABELS[document.status]"
          color="neutral"
          variant="outline"
          size="xs"
        />
      </div>
      <p class="text-muted mt-0.5 text-xs">
        Issued {{ formatDate(document.issuedAt) }} · expires {{ formatDate(document.expiresAt) }}
      </p>
      <p
        v-if="document.rejectionReason"
        class="text-error mt-1 text-xs"
      >
        {{ document.rejectionReason }}
      </p>
    </li>
  </ol>
  <CommonEmptyState
    v-else
    title="No legal documents archived"
    description="Legalities and contracts are archived chronologically by issuance date."
    icon="i-lucide-folder-lock"
    size="sm"
    class="border border-dashed"
  />
</template>
