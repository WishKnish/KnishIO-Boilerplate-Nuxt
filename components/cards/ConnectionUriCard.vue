<script setup lang="ts">
import { z } from 'zod'
import GenericCard from "~/components/cards/GenericCard.vue"

const { state, updateUri } = useKnishIO()

/**
 * Schema for the Connection URI card
 */
const schema = z.object({
  uri: z.string().url()
})

/**
 * Default state for the form
 */
const formState = reactive({
  uri: state.uri
})

/**
 * Watch for changes to the URI state and update the form state
 */
watch(() => formState.uri, (newUri) => {
  if (newUri && newUri.length > 0) {
    updateUri(newUri)
  }
})
</script>

<template>
  <GenericCard
      title="Connection Parameters"
      description="The Knish.IO SDK requires a connection URI to connect to the Knish.IO distributed ledger. This URI is used to establish a connection with an anchor node."
      icon="i-heroicons-link"
  >
    <UForm :schema="schema" :state="formState" class="space-y-4">
      <UFormGroup label="Anchor Node URI" name="uri">
        <UInput v-model="formState.uri" />
      </UFormGroup>
    </UForm>
  </GenericCard>
</template>