<script setup lang="ts">
import { z } from 'zod'
import GenericCard from "~/components/cards/GenericCard.vue";

const emit = defineEmits(['input'])

const schema = z.object({
  seed: z.string()
})

const state = reactive({
  seed: undefined
})

watch(() => state.seed, () => {
  handleInput()
})

const handleInput = () => {
  if(state.seed && state.seed.length > 0) {
    emit('input', state.seed)
  }
  else {
    emit('input', undefined)
  }
}
</script>

<template>
  <GenericCard
      title="Identity Seed"
      description="All Knish.IO identities are based on a seed string. This seed string is used to generate a unique secret and signature hash for each user."
      icon="i-heroicons-key"
  >
    <UForm :schema="schema" :state="state" class="space-y-4">
      <UFormGroup label="Seed String" name="seed">
        <UInput
            placeholder="Enter your seed string here..."
            v-model="state.seed"
        />
      </UFormGroup>
    </UForm>
  </GenericCard>
</template>