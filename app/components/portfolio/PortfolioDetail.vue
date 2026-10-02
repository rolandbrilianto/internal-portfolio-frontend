<script setup lang="ts">
import type { PortfolioProject } from '~/types/portfolio'
import { PORTFOLIO_SCALE_LABELS, formatDate } from '~/utils/formatters'

defineProps<{ project: PortfolioProject }>()
</script>

<template>
  <div class="space-y-5">
    <CommonSectionCard
      title="Project overview"
      icon="i-lucide-file-text"
    >
      <p class="text-muted text-sm leading-relaxed">
        {{ project.summary || 'No project description has been recorded yet.' }}
      </p>
      <dl class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <CommonMetricPlaceholder
          label="Reference"
          :value="project.reference"
        />
        <CommonMetricPlaceholder
          label="Industry"
          :value="project.industry"
        />
        <CommonMetricPlaceholder
          label="Scale"
          :value="PORTFOLIO_SCALE_LABELS[project.scale]"
        />
        <CommonMetricPlaceholder
          label="Year"
          :value="String(project.year)"
        />
      </dl>
    </CommonSectionCard>

    <div class="grid gap-5 lg:grid-cols-3">
      <CommonSectionCard
        title="Background"
        description="Origin and context of the engagement."
        icon="i-lucide-book-open"
        class="lg:col-span-1"
      >
        <p class="text-muted text-sm leading-relaxed">
          {{ project.background || 'Background has not been recorded yet.' }}
        </p>
      </CommonSectionCard>

      <CommonSectionCard
        title="Challenges"
        description="Problems the project had to solve."
        icon="i-lucide-triangle-alert"
      >
        <p class="text-muted text-sm leading-relaxed">
          {{ project.challenges || 'Challenges have not been recorded yet.' }}
        </p>
      </CommonSectionCard>

      <CommonSectionCard
        title="Solution"
        description="Approach and technology applied."
        icon="i-lucide-lightbulb"
      >
        <p class="text-muted text-sm leading-relaxed">
          {{ project.solution || 'The solution has not been recorded yet.' }}
        </p>
        <div
          v-if="project.technologies.length"
          class="mt-4 flex flex-wrap gap-1.5"
        >
          <UBadge
            v-for="technology in project.technologies"
            :key="technology"
            color="neutral"
            variant="outline"
            size="xs"
          >
            {{ technology }}
          </UBadge>
        </div>
      </CommonSectionCard>
    </div>

    <CommonSectionCard
      title="Success metrics"
      description="Verified outcomes recorded for this project."
      icon="i-lucide-gauge"
    >
      <dl
        v-if="project.successMetrics.length"
        class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="metric in project.successMetrics"
          :key="metric.id"
          class="border-default rounded-lg border bg-(--ui-bg-muted)/40 p-3"
        >
          <dt class="text-muted text-xs font-medium">
            {{ metric.label }}
          </dt>
          <dd class="text-highlighted mt-1 text-lg font-semibold tabular-nums">
            <template v-if="metric.value">
              {{ metric.value }}<span
                v-if="metric.unit"
                class="text-muted text-sm font-medium"
              >{{ metric.unit }}</span>
            </template>
            <span
              v-else
              class="text-dimmed"
              aria-label="No data available"
            >—</span>
          </dd>
          <p
            v-if="metric.description"
            class="text-dimmed mt-1 text-xs leading-relaxed"
          >
            {{ metric.description }}
          </p>
        </div>
      </dl>
      <CommonEmptyState
        v-else
        title="No success metrics recorded"
        description="Measured outcomes are added once the delivery unit verifies them."
        icon="i-lucide-gauge"
        size="sm"
        class="border border-dashed"
      />
    </CommonSectionCard>

    <div class="grid gap-5 lg:grid-cols-2">
      <CommonSectionCard
        title="Media gallery"
        description="Photographs and video documentation."
        icon="i-lucide-images"
        flush
      >
        <div
          v-if="project.media.length"
          class="grid gap-3 p-4 sm:grid-cols-2"
        >
          <figure
            v-for="item in project.media"
            :key="item.id"
            class="border-default rounded-lg border bg-(--ui-bg-muted)/40 flex items-center gap-2.5 p-3"
          >
            <UIcon
              :name="item.type === 'video' ? 'i-lucide-video' : 'i-lucide-image'"
              class="text-muted size-4 shrink-0"
              aria-hidden="true"
            />
            <figcaption class="min-w-0 truncate text-sm text-muted">
              {{ item.title }}
            </figcaption>
          </figure>
        </div>
        <CommonEmptyState
          v-else
          title="No media available"
          description="Project photographs and videos will be listed here."
          icon="i-lucide-images"
          size="sm"
          class="m-4 border border-dashed"
        />
      </CommonSectionCard>

      <CommonSectionCard
        title="Documentation"
        description="Case study download and internal notes."
        icon="i-lucide-file-down"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-3 border border-default border-dashed p-3">
            <div class="flex min-w-0 items-center gap-2.5">
              <UIcon
                name="i-lucide-file-text"
                class="text-muted size-4 shrink-0"
                aria-hidden="true"
              />
              <div class="min-w-0">
                <p class="text-muted truncate text-sm font-medium">
                  Case study (PDF)
                </p>
                <p class="text-dimmed truncate text-xs">
                  {{ project.caseStudyUrl ? 'Available for download' : 'No case study uploaded' }}
                </p>
              </div>
            </div>
            <UButton
              v-if="project.caseStudyUrl"
              :to="project.caseStudyUrl"
              icon="i-lucide-download"
              trailing
              color="neutral"
              variant="subtle"
              size="xs"
            />
            <CommonStatusBadge
              v-else
              label="Not available"
              color="neutral"
              variant="subtle"
              size="xs"
            />
          </div>
          <div class="border-default rounded-lg border bg-(--ui-bg-muted)/40 p-3">
            <p class="text-muted text-xs font-medium">
              Internal documentation
            </p>
            <p class="text-dimmed mt-1 text-sm leading-relaxed">
              {{ project.internalDocumentation || 'No internal documentation has been recorded.' }}
            </p>
          </div>
        </div>
      </CommonSectionCard>
    </div>

    <CommonSectionCard
      title="Related partners"
      description="Project – partner mapping recorded for this project."
      icon="i-lucide-link"
      flush
    >
      <ul
        v-if="project.partners.length"
        class="divide-y divide-default"
      >
        <li
          v-for="partner in project.partners"
          :key="partner.partnerId"
          class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
        >
          <div class="min-w-0">
            <p class="text-highlighted truncate text-sm font-medium">
              {{ partner.partnerName }}
            </p>
            <p class="text-muted truncate text-xs">
              {{ partner.contribution || 'No contribution recorded' }}
            </p>
          </div>
          <UButton
            :to="`/partners/${partner.partnerId}`"
            label="Open partner"
            icon="i-lucide-arrow-up-right"
            color="neutral"
            variant="ghost"
            size="xs"
          />
        </li>
      </ul>
      <CommonEmptyState
        v-else
        title="No partners mapped to this project"
        description="Partner contributions are recorded through the project – partner mapping feature."
        icon="i-lucide-unlink"
        size="sm"
        class="m-4 border border-dashed"
      />
      <p class="text-dimmed border-t border-default px-4 py-2.5 text-xs">
        Last reviewed {{ formatDate(null) }}
      </p>
    </CommonSectionCard>
  </div>
</template>
