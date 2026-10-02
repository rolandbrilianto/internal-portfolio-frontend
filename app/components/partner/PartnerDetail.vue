<script setup lang="ts">
import type { Partner } from '~/types/partner'
import { PARTNER_CATEGORY_LABELS } from '~/utils/formatters'

defineProps<{ partner: Partner }>()
</script>

<template>
  <div class="space-y-5">
    <CommonSectionCard
      title="Company profile"
      description="Legal identity and contact information of the partner entity."
      icon="i-lucide-building-2"
    >
      <p class="text-muted text-sm leading-relaxed">
        {{ partner.summary || 'No company profile summary has been recorded yet.' }}
      </p>
      <dl class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CommonMetricPlaceholder
          label="Legal name"
          :value="partner.legalName"
        />
        <CommonMetricPlaceholder
          label="Trading name"
          :value="partner.tradingName"
        />
        <CommonMetricPlaceholder
          label="Country"
          :value="partner.country"
        />
        <CommonMetricPlaceholder
          label="Industry"
          :value="partner.industry"
        />
        <CommonMetricPlaceholder
          label="Website"
          :value="partner.website"
        />
        <CommonMetricPlaceholder
          label="Partnership code"
          :value="partner.partnershipCode"
        />
        <CommonMetricPlaceholder
          label="Partnership category"
          :value="PARTNER_CATEGORY_LABELS[partner.category]"
        />
        <CommonMetricPlaceholder
          label="Onboarded"
          :value="partner.onboardedAt ? 'Recorded' : null"
          hint="Set during onboarding"
        />
      </dl>
    </CommonSectionCard>

    <div class="grid gap-5 lg:grid-cols-2">
      <CommonSectionCard
        title="Capabilities"
        description="Areas of expertise provided by the partner."
        icon="i-lucide-cpu"
      >
        <ul
          v-if="partner.capabilities.length"
          class="space-y-2.5"
        >
          <li
            v-for="capability in partner.capabilities"
            :key="capability.id"
            class="flex items-center justify-between gap-3 border-b border-default pb-2.5 last:border-0 last:pb-0"
          >
            <span class="text-muted min-w-0 truncate text-sm">{{ capability.name }}</span>
            <span class="flex shrink-0 items-center gap-2">
              <CommonStatusBadge
                :label="capability.level"
                color="neutral"
                variant="outline"
                size="xs"
              />
              <UIcon
                v-if="capability.certified"
                name="i-lucide-badge-check"
                class="text-success size-3.5"
                aria-label="Certified"
              />
            </span>
          </li>
        </ul>
        <CommonEmptyState
          v-else
          title="No capabilities recorded"
          description="Expertise areas are added during partner registration."
          icon="i-lucide-cpu"
          size="sm"
          class="border border-dashed"
        />
      </CommonSectionCard>

      <CommonSectionCard
        title="Key contacts"
        description="Internal and partner-side points of contact."
        icon="i-lucide-contact-round"
      >
        <ul
          v-if="partner.contacts.length"
          class="space-y-2.5"
        >
          <li
            v-for="contact in partner.contacts"
            :key="contact.id"
            class="flex items-center justify-between gap-3 border-b border-default pb-2.5 last:border-0 last:pb-0"
          >
            <div class="min-w-0">
              <p class="text-highlighted truncate text-sm">
                {{ contact.role }}
              </p>
              <p class="text-muted truncate text-xs">
                {{ contact.email || 'No email recorded' }}
              </p>
            </div>
            <p class="text-dimmed shrink-0 text-xs">
              {{ contact.phone || '—' }}
            </p>
          </li>
        </ul>
        <CommonEmptyState
          v-else
          title="No contacts recorded"
          description="Partner and internal contacts appear here once captured."
          icon="i-lucide-contact-round"
          size="sm"
          class="border border-dashed"
        />
      </CommonSectionCard>
    </div>

    <div class="grid gap-5 lg:grid-cols-2">
      <CommonSectionCard
        title="Contract information"
        description="Chronological agreement register."
        icon="i-lucide-file-signature"
      >
        <PartnerContractPanel :contracts="partner.contracts" />
      </CommonSectionCard>

      <CommonSectionCard
        title="Legal documents"
        description="Archived legalities by issuance date."
        icon="i-lucide-folder-lock"
      >
        <PartnerDocumentList :documents="[]" />
      </CommonSectionCard>
    </div>

    <CommonSectionCard
      title="Project relationships"
      description="Portfolio projects this partner contributes to."
      icon="i-lucide-link"
      flush
    >
      <PartnerProjectList :partner="partner" />
    </CommonSectionCard>

    <div class="grid gap-5 lg:grid-cols-2">
      <CommonSectionCard
        title="Enablement history"
        description="Knowledge, sales and marketing enablement."
        icon="i-lucide-graduation-cap"
      >
        <PartnerEnablementHistory :activities="[]" />
      </CommonSectionCard>

      <CommonSectionCard
        title="Evaluation history"
        description="Periodic evaluations and performance records."
        icon="i-lucide-clipboard-check"
      >
        <PartnerEvaluationHistory :evaluations="[]" />
      </CommonSectionCard>
    </div>
  </div>
</template>
