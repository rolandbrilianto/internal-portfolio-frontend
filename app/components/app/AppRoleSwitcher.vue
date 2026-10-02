<script setup lang="ts">
import type { AppRoleKey } from '~/types/role'

const roleStore = useRoleStore()

const roleItems = computed(() =>
  roleStore.roles.map(role => ({
    label: role.label,
    value: role.key,
    icon: role.icon,
    description: role.description
  }))
)

function selectRole(value: AppRoleKey) {
  roleStore.setRole(value)
}
</script>

<template>
  <UPopover :content="{ align: 'end', side: 'bottom' }">
    <UButton
      :icon="roleStore.currentRoleDefinition.icon"
      trailing-icon="i-lucide-chevron-down"
      color="neutral"
      variant="subtle"
      size="sm"
      aria-label="Preview the interface as another internal role"
      :ui="{ label: 'hidden sm:inline' }"
    />

    <template #content>
      <div class="w-80 max-w-[calc(100vw-2rem)] p-1">
        <p class="text-muted text-xs font-semibold tracking-wider uppercase px-2 pt-1.5 pb-1">
          Role preview
        </p>
        <p class="text-muted px-2 pb-2 text-xs leading-relaxed">
          Frontend-only switch. This changes the dashboard and navigation shown, it does not grant access.
        </p>
        <ul class="space-y-1">
          <li
            v-for="role in roleItems"
            :key="role.value"
          >
            <UButton
              :label="role.label"
              :description="role.description"
              :icon="role.icon"
              :variant="roleStore.currentRole === role.value ? 'soft' : 'ghost'"
              :color="roleStore.currentRole === role.value ? 'primary' : 'neutral'"
              block
              class="h-auto justify-start py-2 text-left"
              :aria-pressed="roleStore.currentRole === role.value"
              @click="selectRole(role.value as AppRoleKey)"
            />
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>
