<script setup lang="ts">
import { APP_NAME, ROLE_DEFINITIONS } from '~/utils/constants'

const roleStore = useRoleStore()

const role = computed(() => roleStore.currentRoleDefinition)
const focusPoints = computed(() => role.value.focus)
const otherRoles = computed(() => ROLE_DEFINITIONS.filter(item => item.key !== roleStore.currentRole))
</script>

<template>
  <CommonPageHeader
    eyebrow="Role-based dashboard"
    :title="role.focus[0] ?? 'Dashboard'"
    :description="role.description"
    :badge="`${role.label} view`"
  >
    <template #actions>
      <UButton
        to="/portfolio/dashboard"
        label="Portfolio dashboard"
        icon="i-lucide-chart-no-axes-combined"
        color="neutral"
        variant="subtle"
        size="sm"
      />
    </template>

    <template #meta>
      <dl class="text-muted flex flex-wrap items-center gap-x-5 gap-y-1 pt-1 text-xs">
        <div class="flex items-center gap-1.5">
          <dt class="font-medium">
            Focus areas:
          </dt>
          <dd
            v-for="point in focusPoints"
            :key="point"
            class="flex items-center gap-1.5"
          >
            <UBadge
              color="neutral"
              variant="outline"
              size="xs"
            >
              {{ point }}
            </UBadge>
          </dd>
        </div>
      </dl>
      <p class="text-dimmed pt-1 text-xs">
        Switch preview role: <span class="font-medium">{{ otherRoles.map(item => item.shortLabel).join(' · ') }}</span>
      </p>
      <p class="sr-only">
        {{ APP_NAME }}
      </p>
    </template>
  </CommonPageHeader>
</template>
