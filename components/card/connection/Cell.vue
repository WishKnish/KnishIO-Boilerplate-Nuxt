<script setup lang="ts">
import { z } from 'zod'
import Generic from "~/components/card/Generic.vue"

const { state, updateCell } = useKnishIO()

/**
 * Schema for the Cell Slug card
 */
const schema = z.object({
  cell: z.string()
})

/**
 * Default state for the form
 */
const formState = reactive({
  cell: state.cell
})

/**
 * Watch for changes to the cell state and update the form state
 */
watch(() => formState.cell, (newCell) => {
  if (newCell && newCell.length > 0) {
    updateCell(newCell.toUpperCase())
  }
})
</script>

<template>
  <Generic
      title="Cell Slug"
      description="A 'cell slug' is a unique identifier binding the Knish.IO client session to a specific 'branch' of the ledger, called a 'cell'."
      icon="i-heroicons-rectangle-group"
  >
    <UForm :schema="schema" :state="formState" class="space-y-4">
      <UFormGroup label="Cell Slug" name="cell">
        <UInput v-model="formState.cell" />
      </UFormGroup>
    </UForm>
  </Generic>
</template>