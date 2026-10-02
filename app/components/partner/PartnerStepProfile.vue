<script setup lang="ts">
import type { PartnerDraft, PartnerDraftContact } from '~/types/partner'

const props = defineProps<{ draft: PartnerDraft }>()
const emit = defineEmits<{ 'update:draft': [value: PartnerDraft] }>()

const errors = computed(() => {
  const list: Partial<Record<keyof PartnerDraft, string>> = {}
  if (!props.draft.legalName.trim()) list.legalName = 'Legal name is required.'
  if (props.draft.legalName && props.draft.legalName.trim().length < 3) list.legalName = 'Enter the full registered company name.'
  if (!props.draft.country.trim()) list.country = 'Country is required.'
  if (!props.draft.summary.trim()) list.summary = 'A short company profile is required.'
  return list
})

function update<K extends keyof PartnerDraft>(key: K, value: PartnerDraft[K]) {
  emit('update:draft', { ...props.draft, [key]: value })
}

function addContact() {
  const contact: PartnerDraftContact = { role: '', name: '', email: '', phone: '' }
  emit('update:draft', { ...props.draft, contacts: [...props.draft.contacts, contact] })
}

function updateContact(index: number, key: keyof PartnerDraftContact, value: string) {
  const contacts = props.draft.contacts.map((contact, position) =>
    position === index ? { ...contact, [key]: value } : contact
  )
  emit('update:draft', { ...props.draft, contacts })
}

function removeContact(index: number) {
  emit('update:draft', {
    ...props.draft,
    contacts: props.draft.contacts.filter((_, position) => position !== index)
  })
}
</script>

<template>
  <UFormField
    label="Legal company name"
    name="legalName"
    required
    :error="errors.legalName"
  >
    <UInput
      :model-value="draft.legalName"
      placeholder="Registered company name"
      class="w-full"
      :highlight="Boolean(errors.legalName)"
      @update:model-value="update('legalName', $event)"
    />
  </UFormField>

  <div class="grid gap-4 sm:grid-cols-2">
    <UFormField
      label="Trading name"
      name="tradingName"
      help="Optional commercial name used in agreements."
    >
      <UInput
        :model-value="draft.tradingName"
        placeholder="Trading or brand name"
        class="w-full"
        @update:model-value="update('tradingName', $event)"
      />
    </UFormField>

    <UFormField
      label="Country"
      name="country"
      required
      :error="errors.country"
    >
      <UInput
        :model-value="draft.country"
        placeholder="Country of registration"
        class="w-full"
        :highlight="Boolean(errors.country)"
        @update:model-value="update('country', $event)"
      />
    </UFormField>

    <UFormField
      label="Industry"
      name="industry"
    >
      <UInput
        :model-value="draft.industry"
        placeholder="Industry sector"
        class="w-full"
        @update:model-value="update('industry', $event)"
      />
    </UFormField>

    <UFormField
      label="Website"
      name="website"
      help="Internal reference only."
    >
      <UInput
        :model-value="draft.website"
        icon="i-lucide-globe"
        placeholder="https://"
        class="w-full"
        @update:model-value="update('website', $event)"
      />
    </UFormField>
  </div>

  <UFormField
    label="Company profile"
    name="summary"
    required
    :error="errors.summary"
    help="Describe the company's business focus and relevance to the portfolio."
  >
    <UTextarea
      :model-value="draft.summary"
      :rows="4"
      placeholder="Short company profile"
      class="w-full"
      :highlight="Boolean(errors.summary)"
      @update:model-value="update('summary', $event)"
    />
  </UFormField>

  <UFormField
    label="Contacts"
    name="contacts"
    help="Add at least one internal or partner-side contact when available."
  >
    <div class="w-full space-y-3">
      <div
        v-for="(contact, index) in draft.contacts"
        :key="index"
        class="border-default rounded-lg border bg-(--ui-bg-muted)/40 grid gap-3 p-3 sm:grid-cols-2"
      >
        <UInput
          :model-value="contact.role"
          placeholder="Role"
          aria-label="Contact role"
          @update:model-value="updateContact(index, 'role', $event)"
        />
        <UInput
          :model-value="contact.name"
          placeholder="Name"
          aria-label="Contact name"
          @update:model-value="updateContact(index, 'name', $event)"
        />
        <UInput
          :model-value="contact.email"
          type="email"
          placeholder="Email"
          aria-label="Contact email"
          @update:model-value="updateContact(index, 'email', $event)"
        />
        <div class="flex gap-2">
          <UInput
            :model-value="contact.phone"
            placeholder="Phone"
            aria-label="Contact phone"
            class="flex-1"
            @update:model-value="updateContact(index, 'phone', $event)"
          />
          <UButton
            icon="i-lucide-trash-2"
            color="error"
            variant="ghost"
            size="sm"
            :aria-label="`Remove contact ${index + 1}`"
            @click="removeContact(index)"
          />
        </div>
      </div>

      <UButton
        label="Add contact"
        icon="i-lucide-plus"
        color="neutral"
        variant="subtle"
        size="sm"
        @click="addContact"
      />
    </div>
  </UFormField>
</template>
