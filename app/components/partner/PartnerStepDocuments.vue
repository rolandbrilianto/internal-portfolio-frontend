<script setup lang="ts">
import type { PartnerDraft, PartnerDraftDocument } from '~/types/partner'
import { formatFileSize } from '~/utils/formatters'

const props = defineProps<{ draft: PartnerDraft }>()
const emit = defineEmits<{ 'update:draft': [value: PartnerDraft] }>()

const accepted = ['application/pdf', 'image/*']

const selectedFiles = ref<File[] | null>(null)

function onFilesChange(files: File[] | null | undefined) {
  const mapped: PartnerDraftDocument[] = (files ?? []).map((file, index) => ({
    id: `doc-${index + 1}-${Math.random().toString(36).slice(2, 8)}`,
    label: file.name.split('.').slice(0, -1).join('.') || 'Legal document',
    fileName: file.name,
    fileSize: file.size,
    issuedAt: null,
    notes: ''
  }))
  emit('update:draft', { ...props.draft, documents: mapped })
}

function updateDocument(id: string, patch: Partial<PartnerDraftDocument>) {
  emit('update:draft', {
    ...props.draft,
    documents: props.draft.documents.map(document =>
      document.id === id ? { ...document, ...patch } : document
    )
  })
}

function removeDocument(id: string) {
  emit('update:draft', { ...props.draft, documents: props.draft.documents.filter(item => item.id !== id) })
}

const totalSize = computed(() =>
  props.draft.documents.reduce((total, document) => total + (document.fileSize ?? 0), 0)
)
</script>

<template>
  <UAlert
    color="warning"
    variant="subtle"
    icon="i-lucide-triangle-alert"
    title="No upload backend in this phase"
    description="Selected files stay in the browser only. Nothing is transmitted or stored."
    class="mb-4"
  />

  <UFormField
    label="Legal documents"
    name="documents"
    help="Attach legalities, agreements and certifications. Required before a partnership can be activated."
  >
    <UFileUpload
      v-model="selectedFiles"
      :accept="accepted.join(',')"
      multiple
      class="w-full"
      label="Select legal documents"
      description="PDF or image files"
      @update:model-value="onFilesChange"
    />
  </UFormField>

  <ul
    v-if="draft.documents.length"
    class="mt-4 space-y-3"
  >
    <li
      v-for="document in draft.documents"
      :key="document.id"
      class="border-default rounded-lg border bg-(--ui-bg-muted)/40 space-y-3 p-3"
    >
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex min-w-0 items-center gap-2">
          <UIcon
            name="i-lucide-file"
            class="text-muted size-4 shrink-0"
            aria-hidden="true"
          />
          <p class="text-highlighted truncate text-sm font-medium">
            {{ document.fileName }}
          </p>
        </div>
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="ghost"
          size="xs"
          :aria-label="`Remove ${document.fileName}`"
          @click="removeDocument(document.id)"
        />
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <UFormField
          label="Document label"
          :name="`label-${document.id}`"
        >
          <UInput
            :model-value="document.label"
            placeholder="e.g. Master services agreement"
            class="w-full"
            @update:model-value="updateDocument(document.id, { label: $event })"
          />
        </UFormField>

        <UFormField
          label="Issue date"
          :name="`issued-${document.id}`"
        >
          <UInput
            :model-value="document.issuedAt ?? ''"
            type="date"
            class="w-full"
            @update:model-value="updateDocument(document.id, { issuedAt: $event || null })"
          />
        </UFormField>
      </div>

      <UFormField
        label="Notes"
        :name="`notes-${document.id}`"
      >
        <UTextarea
          :model-value="document.notes"
          :rows="2"
          placeholder="Archiving notes"
          class="w-full"
          @update:model-value="updateDocument(document.id, { notes: $event })"
        />
      </UFormField>
    </li>
  </ul>

  <CommonEmptyState
    v-else
    title="No documents attached"
    description="Select at least one legal document, or continue and attach them later."
    icon="i-lucide-file-plus-2"
    size="sm"
    class="mt-4 border border-dashed"
  />

  <p class="text-dimmed mt-3 text-xs">
    {{ draft.documents.length }} file(s) staged locally · {{ formatFileSize(totalSize) }}
  </p>
</template>
