<script setup lang="ts">
import { partnerService } from '~/services/partner/partner.service'
import type { PartnerDraft, PartnerFormStepKey } from '~/types/partner'

interface StepDefinition {
  value: PartnerFormStepKey
  title: string
  icon: string
  description: string
}

const steps: StepDefinition[] = [
  { value: 'profile', title: 'Partner Profile', icon: 'i-lucide-building-2', description: 'Company identity and contacts' },
  { value: 'capabilities', title: 'Capabilities', icon: 'i-lucide-cpu', description: 'Expertise areas and levels' },
  { value: 'partnership', title: 'Partnership Information', icon: 'i-lucide-handshake', description: 'Category, status and contract' },
  { value: 'documents', title: 'Legal Documents', icon: 'i-lucide-folder-lock', description: 'Attach legalities' },
  { value: 'review', title: 'Review & Submit', icon: 'i-lucide-clipboard-check', description: 'Confirm and send' }
]

function createDraft(): PartnerDraft {
  return {
    legalName: '',
    tradingName: '',
    website: '',
    country: '',
    industry: '',
    category: '',
    summary: '',
    capabilities: [],
    contacts: [],
    partnershipStatus: '',
    contractStartDate: null,
    contractEndDate: null,
    contractNotes: '',
    documents: []
  }
}

const draft = ref<PartnerDraft>(createDraft())
const currentStep = ref(0)
const partnershipCode = ref('')
const submitting = ref(false)
const submitted = ref(false)

const activeStep = computed(() => steps[currentStep.value]!)
const isLastStep = computed(() => currentStep.value === steps.length - 1)

const blockedSteps = computed(() => {
  const blocked: Partial<Record<PartnerFormStepKey, boolean>> = {}
  if (!draft.value.legalName.trim() || !draft.value.country.trim() || !draft.value.summary.trim()) {
    blocked.profile = true
  }
  if (!draft.value.capabilities.length) {
    blocked.capabilities = true
  }
  if (!draft.value.category || !draft.value.partnershipStatus) {
    blocked.partnership = true
  }
  return blocked
})

function goToStep(index: number) {
  currentStep.value = Math.min(Math.max(index, 0), steps.length - 1)
}

function goBack() {
  goToStep(currentStep.value - 1)
}

async function goNext() {
  if (blockedSteps.value[activeStep.value.value]) return
  if (!isLastStep.value) {
    goToStep(currentStep.value + 1)
    return
  }
  submitting.value = true
  const [code] = await Promise.all([
    partnerService.previewPartnershipCode(),
    partnerService.submitDraft(draft.value)
  ])
  partnershipCode.value = code
  submitting.value = false
  submitted.value = true
}

function resetForm() {
  draft.value = createDraft()
  partnershipCode.value = ''
  currentStep.value = 0
  submitted.value = false
}
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-[16rem_minmax(0,1fr)]">
    <aside class="border-default rounded-lg border bg-(--ui-bg) shadow-xs h-fit p-3 lg:sticky lg:top-20">
      <p class="text-muted text-xs font-semibold tracking-wider uppercase px-2.5 pb-2">
        Registration progress
      </p>
      <PartnerFormProgress
        :steps="steps"
        :current="currentStep"
        @update:current="goToStep"
      />
      <p class="text-dimmed border-t border-default px-2.5 pt-3 text-xs">
        Step {{ currentStep + 1 }} of {{ steps.length }}
      </p>
    </aside>

    <div class="min-w-0 space-y-5">
      <CommonSectionCard
        :title="activeStep.title"
        :icon="activeStep.icon"
      >
        <template #actions>
          <UProgress
            :model-value="((currentStep + 1) / steps.length) * 100"
            size="sm"
            class="w-28"
          />
        </template>

        <div
          v-if="submitted"
          class="space-y-4"
        >
          <UAlert
            color="success"
            variant="subtle"
            icon="i-lucide-circle-check"
            title="Draft validated locally"
            :description="`A partnership code would be assigned on submission. Reserved placeholder: ${partnershipCode}. No record was created because no backend endpoint is connected.`"
          />
          <CommonEmptyState
            title="Nothing was saved"
            description="Partner records appear in the directory once a backend service is connected."
            icon="i-lucide-database-zap"
            size="sm"
            class="border border-dashed"
          >
            <UButton
              label="Start over"
              icon="i-lucide-rotate-ccw"
              size="xs"
              color="neutral"
              variant="subtle"
              @click="resetForm"
            />
            <UButton
              to="/partners"
              label="Back to directory"
              icon="i-lucide-arrow-right"
              size="xs"
              color="neutral"
              variant="ghost"
            />
          </CommonEmptyState>
        </div>

        <div
          v-else
          class="space-y-5"
        >
          <PartnerStepProfile
            v-if="activeStep.value === 'profile'"
            :draft="draft"
            @update:draft="draft = $event"
          />
          <PartnerStepCapabilities
            v-else-if="activeStep.value === 'capabilities'"
            :draft="draft"
            @update:draft="draft = $event"
          />
          <PartnerStepPartnership
            v-else-if="activeStep.value === 'partnership'"
            :draft="draft"
            @update:draft="draft = $event"
          />
          <PartnerStepDocuments
            v-else-if="activeStep.value === 'documents'"
            :draft="draft"
            @update:draft="draft = $event"
          />
          <PartnerStepReview
            v-else
            :draft="draft"
            :partnership-code="partnershipCode || 'Assigned on submission'"
          />
        </div>
      </CommonSectionCard>

      <div
        v-if="!submitted"
        class="flex flex-wrap items-center justify-between gap-3"
      >
        <UButton
          label="Back"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="ghost"
          :disabled="currentStep === 0"
          @click="goBack"
        />

        <div class="flex items-center gap-2">
          <UButton
            v-if="blockedSteps[activeStep.value]"
            label="Complete the required fields first"
            icon="i-lucide-lock"
            color="neutral"
            variant="soft"
            size="sm"
            disabled
          />
          <UButton
            v-else
            :label="isLastStep ? 'Submit for review' : 'Continue'"
            :trailing-icon="isLastStep ? undefined : 'i-lucide-arrow-right'"
            :loading="submitting"
            @click="goNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>
