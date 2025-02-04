<script setup lang="ts">
const slideover = useSlideover()

interface Meta {
  molecularHash: string
  position: string
  key: string
  value: string
  createdAt: string
  __typename: string
}

interface MetaInstance {
  metaType: string
  metaId: string
  createdAt: string
  metas: Meta[]
  __typename: string
}

const props = defineProps<{
  currentInstance: MetaInstance | null
}>()

/**
 * Toggle the slideover open and closed
 */
const toggleOpen = () => {
  slideover.close()
}
</script>

<template>
  <USlideover>
    <!-- Meta Details Header -->
    <div class="p-2 border-b border-gray-800 flex items-center justify-between bg-gray-950">
      <button
          class="hover:text-gray-300 transition-colors"
          title="Close"
          @click="toggleOpen"
      >
        <UIcon
            name="i-heroicons-chevron-right"
            class="w-5 h-5"
        />
      </button>
      <span class="text-sm font-mono">Metadata Fields</span>
    </div>

    <!-- Metadata Table -->
    <div
        class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <UTable
          :rows="props.currentInstance?.metas"
          :columns="[
            { key: 'key', label: 'Key' },
            { key: 'value', label: 'Value' },
            { key: 'createdAt', label: 'Created At' },
            { key: 'molecularHash', label: 'Molecular Hash' }
          ]"
          class="w-full"
      >
        <template #cell:createdAt="{ value }">
          <span>{{ formatTimestamp(value) }}</span>
        </template>
        <template #cell:molecularHash="{ value }">
          <span>{{ formatHash(value) }}</span>
        </template>
      </UTable>
    </div>
  </USlideover>
</template>