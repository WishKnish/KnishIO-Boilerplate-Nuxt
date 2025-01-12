<script setup lang="ts">
import { z } from 'zod'
import GenericCard from "~/components/cards/GenericCard.vue";

const emit = defineEmits(['input'])

const schema = z.object({
  uri: z.string().url()
})

const defaultUri = 'https://eteplitsky.testnet.knish.io/graphql'

const state = reactive({
  uri: defaultUri
})

watch(() => state.uri, () => {
  handleInput()
})

const handleInput = () => {
  if(state.uri && state.uri.length > 0) {
  }
  else {
    state.uri = defaultUri
  }
  emit('input', state.uri)
}
</script>

<template>
  <GenericCard
      title="Connection Parameters"
      description="The Knish.IO SDK requires a connection URI to connect to the Knish.IO distributed ledger. This URI is used to establish a connection with an anchor node."
      icon="i-heroicons-link"
  >
    <UForm :schema="schema" :state="state" class="space-y-4">
      <UFormGroup label="Anchor Node URI" name="seed">
        <UInput v-model="state.uri" />
      </UFormGroup>
    </UForm>
  </GenericCard>
</template>