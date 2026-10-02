<script setup lang="ts">
import type { Partner } from '~/types/partner'
import { CONTRACT_STATUS_LABELS } from '~/utils/formatters'

defineProps<{ partner: Partner }>()
</script>

<template>
  <article class="border-default rounded-lg border bg-(--ui-bg) shadow-xs flex flex-col gap-3 p-4 transition-colors hover:border-primary/40">
    <header class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <NuxtLink
          :to="`/partners/${partner.id}`"
          class="text-highlighted block truncate text-sm font-semibold hover:underline"
        >
          {{ partner.legalName }}
        </NuxtLink>
        <p class="text-dimmed truncate text-xs">
          {{ partner.partnershipCode }}
        </p>
      </div>
      <PartnerStatusBadge :status="partner.status" />
    </header>

    <div class="flex flex-wrap gap-1.5">
      <PartnerCategoryBadge :category="partner.category" />
      <PartnerVerificationBadge :status="partner.verification" />
    </div>

    <p class="text-muted line-clamp-3 text-xs leading-relaxed">
      {{ partner.summary || 'No company profile summary has been recorded yet.' }}
    </p>

    <dl class="grid grid-cols-2 gap-2 text-xs">
      <div>
        <dt class="text-dimmed">
          Industry
        </dt>
        <dd class="text-muted truncate">
          {{ partner.industry || '—' }}
        </dd>
      </div>
      <div>
        <dt class="text-dimmed">
          Country
        </dt>
        <dd class="text-muted truncate">
          {{ partner.country || '—' }}
        </dd>
      </div>
      <div>
        <dt class="text-dimmed">
          Contracts
        </dt>
        <dd class="text-muted">
          {{ partner.contracts.length }}
        </dd>
      </div>
      <div>
        <dt class="text-dimmed">
          Primary contract
        </dt>
        <dd class="text-muted truncate">
          {{ partner.contracts[0] ? CONTRACT_STATUS_LABELS[partner.contracts[0].status] : '—' }}
        </dd>
      </div>
    </dl>
  </article>
</template>
