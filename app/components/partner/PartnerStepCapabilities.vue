<script setup lang="ts">
import type { PartnerCapability, PartnerDraft } from '~/types/partner'

const props = defineProps<{ draft: PartnerDraft }>()
const emit = defineEmits<{ 'update:draft': [value: PartnerDraft] }>()

const levels: Array<PartnerCapability['level']> = ['basic', 'intermediate', 'advanced', 'expert']

const errors = computed(() => {
  const list: Partial<Record<keyof PartnerDraft, string>> = {}
  if (!props.draft.capabilities.length) list.capabilities = 'Add at least one capability area.'
  if (props.draft.capabilities.some(capability => !capability.name.trim())) list.capabilities = 'Every capability needs a name.'
  return list
})

function update<K extends keyof PartnerDraft>(key: K, value: PartnerDraft[K]) {
  emit('update:draft', { ...props.draft, [key]: value })
}

function addCapability() {
  const capability: PartnerCapability = {
    id: `cap-${props.draft.capabilities.length + 1}-${Date.now().toString(36)}`,
    name: '',
    level: 'intermediate',
    certified: false
  }
  update('capabilities', [...props.draft.capabilities, capability])
}

function updateCapability(id: string, patch: Partial<PartnerCapability>) {
  update(
    'capabilities',
    props.draft.capabilities.map(capability =>
      capability.id === id ? { ...capability, ...patch } : capability
    )
  )
}

function removeCapability(id: string) {
  update('capabilities', props.draft.capabilities.filter(capability => capability.id !== id))
}
</script>

<template>
  <UFormField
    label="Capability areas"
    name="capabilities"
    required
    :error="errors.capabilities"
    help="Record the expertise the partner contributes to internal projects."
  >
    <div class="w-full space-y-3">
      <div
        v-for="capability in draft.capabilities"
        :key="capability.id"
        class="border-default rounded-lg border bg-(--ui-bg-muted)/40 grid gap-3 p-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end"
      >
        <UFormField
          label="Capability"
          :name="`capability-${capability.id}`"
        >
          <UInput
            :model-value="capability.name"
            placeholder="e.g. Platform engineering"
            class="w-full"
            @update:model-value="updateCapability(capability.id, { name: $event })"
          />
        </UFormField>

        <UFormField
          label="Level"
          :name="`level-${capability.id}`"
        >
          <USelect
            :model-value="capability.level"
            :items="levels.map(level => ({ value: level, label: level }))"
            class="w-full sm:w-40"
            @update:model-value="updateCapability(capability.id, { level: $event as PartnerCapability['level'] })"
          />
        </UFormField>

        <UFormField
          label="Certified"
          :name="`certified-${capability.id}`"
        >
          <USwitch
            :model-value="capability.certified"
            :aria-label="`Certified: ${capability.name || 'capability'}`"
            @update:model-value="updateCapability(capability.id, { certified: $event })"
          />
        </UFormField>

        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="ghost"
          size="sm"
          :aria-label="`Remove ${capability.name || 'capability'}`"
          @click="removeCapability(capability.id)"
        />
      </div>

      <UButton
        label="Add capability"
        icon="i-lucide-plus"
        color="neutral"
        variant="subtle"
        size="sm"
        @click="addCapability"
      />
    </div>
  </UFormField>
</template>
