<script setup lang="ts">
definePageMeta({
  title: 'Portfolio Dashboard',
  breadcrumb: [{ label: 'Portfolio', to: '/portfolio' }, { label: 'Dashboard' }]
})

useHead({ title: 'Portfolio Dashboard' })

const store = usePortfolioStore()
</script>

<template>
  <div class="space-y-6">
    <CommonPageHeader
      eyebrow="Portfolio management"
      title="Portfolio Dashboard"
      description="Statistical overview of recorded projects, category distribution, performance reporting and featured portfolio access."
    >
      <template #actions>
        <UButton
          to="/portfolio"
          label="Back to directory"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </template>
    </CommonPageHeader>

    <CommonLoadingState v-if="store.loading" />

    <template v-else>
      <PortfolioOverviewSummary :totals="store.totals" />

      <div class="grid gap-5 lg:grid-cols-2">
        <PortfolioCategoryBreakdown
          title="Industries"
          description="Portfolio distribution by industry."
          icon="i-lucide-factory"
          :shares="store.industries"
          empty-title="No category distribution available"
          empty-description="Industry breakdown appears once portfolio projects are recorded."
        />
        <PortfolioCategoryBreakdown
          title="Technologies"
          description="Most frequent technologies across the portfolio."
          icon="i-lucide-cpu"
          :shares="store.technologies"
          empty-title="No technology distribution available"
          empty-description="Technology breakdown appears once portfolio projects are recorded."
        />
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <PortfolioPerformanceTrend :points="store.performanceTrend" />
        <DashboardSection
          title="Featured portfolio"
          description="Strategic projects highlighted for internal reference."
          icon="i-lucide-star"
          empty-title="No featured portfolio yet"
          empty-description="Projects can be flagged as featured from the content management module."
        >
          <ul
            v-if="store.featuredProjects.length"
            class="grid gap-3 sm:grid-cols-2"
          >
            <li
              v-for="project in store.featuredProjects"
              :key="project.id"
            >
              <PortfolioCard :project="project" />
            </li>
          </ul>
          <CommonEmptyState
            v-else
            title="No featured portfolio yet"
            description="Projects flagged as strategic are surfaced here."
            icon="i-lucide-star"
            size="sm"
            class="border border-dashed"
          >
            <UButton
              to="/portfolio"
              label="Browse directory"
              icon="i-lucide-arrow-right"
              size="xs"
              color="neutral"
              variant="subtle"
            />
          </CommonEmptyState>
        </DashboardSection>
      </div>
    </template>
  </div>
</template>
