<script setup lang="ts">
definePageMeta({
  title: 'Register partner',
  breadcrumb: [{ label: 'Partners', to: '/partners' }, { label: 'Register partner' }]
})

useHead({ title: 'Register partner' })
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Guided registration"
      title="Register a partner"
      description="Capture partner profile, capabilities, partnership information and legal documents in five steps."
      icon="i-lucide-user-plus"
    >
      <template #actions>
        <UButton
          to="/partners"
          label="Cancel"
          icon="i-lucide-x"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </template>
    </CommonPageHeader>

    <CommonDataSourceNotice />

    <PartnerForm />
  </div>
</template>
