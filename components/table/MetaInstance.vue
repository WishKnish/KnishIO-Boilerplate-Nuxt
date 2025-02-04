<script setup lang="ts">
import Meta from "~/components/slideover/Meta.vue";

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
  instances: MetaInstance[]
}>()

// Transform the instances data for the main table
const tableData = computed(() => {
  return props.instances.map(instance => ({
    metaType: instance.metaType,
    metaId: instance.metaId,
    createdAt: new Date(parseInt(instance.createdAt)).toLocaleString(),
    metaCount: instance.metas.length,
    metas: instance.metas,
    actions: () => instance
  }))
})

// Columns for the main table
const columns = [
  {
    key: 'actions',
    label: '',
    sortable: false
  },
  {
    key: 'metaType',
    label: 'Type'
  }, {
    key: 'metaId',
    label: 'ID'
  }, {
    key: 'createdAt',
    label: 'Created At'
  }, {
    key: 'metaCount',
    label: 'Meta Count'
  }
]

const slideover = useSlideover()
const showDetails = (instance: MetaInstance) => {
  slideover.open(Meta, {currentInstance: instance})
}
</script>

<template>
  <div class="space-y-4">
    <UTable
        :rows="tableData"
        :columns="columns"
    >
      <template #actions-data="{ row }">
        <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-eye"
            @click="showDetails(row.actions())"
        />
      </template>
    </UTable>
  </div>
</template>