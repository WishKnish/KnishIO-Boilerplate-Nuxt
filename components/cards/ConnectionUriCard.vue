<script setup lang="ts">
import { z } from 'zod'
import GenericCard from "~/components/cards/GenericCard.vue"

const schema = z.object({
  uri: z.string().url()
})

const { state, updateUri } = useKnishIO()

const formState = reactive({
  uri: state.uri
})

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