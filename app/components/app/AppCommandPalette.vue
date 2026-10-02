<script setup lang="ts">
import type { AppRoleKey } from '~/types/role'
import { NAVIGATION_SECTIONS, SETTINGS_NAV_ITEM } from '~/utils/navigation'
import { ROLE_DEFINITIONS } from '~/utils/constants'

interface PaletteItem {
  label: string
  description?: string
  icon?: string
  to?: string
  chip?: { text: string, color: 'neutral' }
  onSelect?: () => void
}

const appStore = useAppStore()
const roleStore = useRoleStore()

const open = computed({
  get: () => appStore.commandPaletteOpen,
  set: (value: boolean) => { appStore.commandPaletteOpen = value }
})

function applyRole(role: AppRoleKey) {
  roleStore.setRole(role)
  open.value = false
}

const groups = computed<{ id: string, label: string, items: PaletteItem[] }[]>(() => {
  const navigation: PaletteItem[] = []

  for (const section of NAVIGATION_SECTIONS) {
    if (!roleStore.hasRole(section.roles)) continue

    for (const item of section.items) {
      if (!roleStore.hasRole(item.roles)) continue

      if (item.to) {
        navigation.push({
          label: item.label,
          description: section.label,
          icon: item.icon,
          to: item.to
        })
        continue
      }

      for (const child of item.children ?? []) {
        if (!roleStore.hasRole(child.roles)) continue
        navigation.push({
          label: child.label,
          description: `${section.label} · ${item.label}`,
          icon: child.icon ?? item.icon,
          to: child.to
        })
      }
    }
  }

  if (roleStore.hasRole([...SETTINGS_NAV_ITEM.roles])) {
    navigation.push({
      label: SETTINGS_NAV_ITEM.label,
      description: 'Account',
      icon: SETTINGS_NAV_ITEM.icon,
      to: SETTINGS_NAV_ITEM.to
    })
  }

  const roles: PaletteItem[] = ROLE_DEFINITIONS.map(role => ({
    label: role.label,
    description: role.description,
    icon: role.icon,
    chip: { text: role.key, color: 'neutral' },
    onSelect: () => applyRole(role.key)
  }))

  return [
    { id: 'navigation', label: 'Navigation', items: navigation },
    { id: 'roles', label: 'Role preview', items: roles }
  ]
})
</script>

<template>
  <UCommandPalette
    v-model:open="open"
    :groups="groups"
    placeholder="Search pages and role preview…"
  >
    <template #item="{ item }">
      <span class="flex min-w-0 items-center gap-2">
        <UIcon
          v-if="item.icon"
          :name="item.icon"
          class="text-muted size-4 shrink-0"
          aria-hidden="true"
        />
        <span class="min-w-0 flex-1">
          <span class="text-highlighted block truncate text-sm font-medium">{{ item.label }}</span>
          <span
            v-if="item.description"
            class="text-dimmed block truncate text-xs"
          >
            {{ item.description }}
          </span>
        </span>
        <UChip
          v-if="item.chip"
          size="xs"
          inset
          standalone
          :text="item.chip.text"
          :color="item.chip.color"
        />
      </span>
    </template>

    <template #empty>
      <CommonEmptyState
        title="No matching page"
        description="Try a different keyword."
        icon="i-lucide-search-x"
        size="sm"
        class="border-0"
      />
    </template>
  </UCommandPalette>
</template>
