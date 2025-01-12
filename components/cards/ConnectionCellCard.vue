<script setup lang="ts">
import { z } from 'zod'
import GenericCard from "~/components/cards/GenericCard.vue";

const emit = defineEmits(['input'])

const schema = z.object({
  cell: z.string()
})

const defaultCell = 'TESTCELL'

const state = reactive({
  cell: defaultCell
})

watch(() => state.cell, () => {
  handleInput()
})

const handleInput = () => {
  if(state.cell && state.cell.length > 0) {
    state.cell = state.cell.toUpperCase()
  }
  else {
    state.cell = defaultCell
  }
  emit('input', state.cell)
}
</script>

<template>
  <GenericCard
      title="Cell Slug"
      description="A 'cell slug' is a unique identifier binding the Knish.IO client session to a specific 'branch' of the ledger, called a 'cell'."
      icon="i-heroicons-rectangle-group"
  >
    <UForm :schema="schema" :state="state" class="space-y-4">
      <UFormGroup label="Cell Slug" name="cell">
        <UInput v-model="state.cell" />
      </UFormGroup>
    </UForm>
  </GenericCard>
</template>