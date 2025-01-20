<script setup lang="ts">
import { z } from 'zod'
import GenericCard from "~/components/cards/GenericCard.vue"

const schema = z.object({
  cell: z.string()
})

const { state, updateCell } = useKnishIO()

const formState = reactive({
  cell: state.cell
})

watch(() => formState.cell, (newCell) => {
  if (newCell && newCell.length > 0) {
    updateCell(newCell.toUpperCase())
  }
})
</script>

<template>
  <GenericCard
      title="Cell Slug"
      description="A 'cell slug' is a unique identifier binding the Knish.IO client session to a specific 'branch' of the ledger, called a 'cell'."
      icon="i-heroicons-rectangle-group"
  >
    <UForm :schema="schema" :state="formState" class="space-y-4">
      <UFormGroup label="Cell Slug" name="cell">
        <UInput v-model="formState.cell" />
      </UFormGroup>
    </UForm>
  </GenericCard>
</template>