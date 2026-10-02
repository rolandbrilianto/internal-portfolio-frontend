<script setup lang="ts">
import type { AppRoleKey } from '~/types/role'
import { APP_NAME, APP_ORGANISATION, DEFERRED_CAPABILITIES, ROLE_DEFINITIONS } from '~/utils/constants'

definePageMeta({
  title: 'Settings',
  breadcrumb: [{ label: 'Settings' }]
})

useHead({ title: 'Settings' })

const roleStore = useRoleStore()

const selectedRole = computed({
  get: () => roleStore.currentRole,
  set: (value: AppRoleKey) => roleStore.setRole(value)
})

const density = ref<'comfortable' | 'compact'>('comfortable')
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Preferences"
      title="Settings"
      description="Local presentation preferences for this device."
      icon="i-lucide-settings"
    />

    <CommonSectionCard
      title="Role preview"
      description="Switch the presentation role used by the dashboard and navigation. This is a frontend preview only and is not authentication."
      icon="i-lucide-users-round"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <label
          v-for="role in ROLE_DEFINITIONS"
          :key="role.key"
          class="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors"
          :class="role.key === selectedRole ? 'border-primary bg-primary/5' : 'border-default hover:border-primary/40'"
        >
          <UCheckbox
            :model-value="role.key === selectedRole"
            :aria-label="`Preview ${role.label}`"
            class="mt-0.5"
            @update:model-value="selectedRole = role.key"
          />
          <span class="min-w-0">
            <span class="text-highlighted flex items-center gap-2 text-sm font-semibold">
              <UIcon
                :name="role.icon"
                class="text-muted size-4"
                aria-hidden="true"
              />
              {{ role.label }}
            </span>
            <span class="text-muted mt-1 block text-xs leading-relaxed">
              {{ role.description }}
            </span>
          </span>
        </label>
      </div>
    </CommonSectionCard>

    <div class="grid gap-5 lg:grid-cols-2">
      <CommonSectionCard
        title="Appearance"
        description="Light or dark appearance is handled by the topbar switch and follows the system preference by default."
        icon="i-lucide-palette"
      >
        <UFormField
          label="Table density"
          name="density"
          help="Applies to registers and data tables."
        >
          <USelect
            v-model="density"
            :items="[
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'compact', label: 'Compact' }
            ]"
            class="w-full"
          />
        </UFormField>
      </CommonSectionCard>

      <CommonSectionCard
        title="Platform"
        description="Static information about this frontend-only build."
        icon="i-lucide-info"
      >
        <dl class="grid gap-3 sm:grid-cols-2">
          <CommonMetricPlaceholder
            label="Application"
            :value="APP_NAME"
          />
          <CommonMetricPlaceholder
            label="Organisation"
            :value="APP_ORGANISATION"
          />
          <CommonMetricPlaceholder
            label="Active preview role"
            :value="roleStore.currentRoleDefinition.label"
          />
          <CommonMetricPlaceholder
            label="Persistence"
            value="localStorage only"
            hint="No server-side storage"
          />
        </dl>
      </CommonSectionCard>
    </div>

    <CommonSectionCard
      title="Deferred capabilities"
      description="Described in the BRD scope matrix but not implemented in this phase."
      icon="i-lucide-layers"
    >
      <ul class="grid gap-2 sm:grid-cols-2">
        <li
          v-for="capability in DEFERRED_CAPABILITIES"
          :key="capability"
          class="flex items-start gap-2 rounded-md border border-default p-2.5"
        >
          <UIcon
            name="i-lucide-minus-circle"
            class="text-dimmed mt-0.5 size-3.5 shrink-0"
            aria-hidden="true"
          />
          <span class="text-muted text-xs">{{ capability }}</span>
        </li>
      </ul>
    </CommonSectionCard>
  </div>
</template>
