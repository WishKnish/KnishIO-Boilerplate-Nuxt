<script setup lang="ts">
import { z } from 'zod'
import GenericCard from "~/components/cards/GenericCard.vue"

const { state, updateIdentity } = useKnishIO()

/**
 * Schema for the Identity Seed card
 */
const schema = z.object({
  seed: z.string().optional()
})

/**
 * Default state for the form
 */
const formState = reactive({
  seed: state.seed
})

/**
 * Watch for form changes and update KnishIO state
*/
watch(() => formState.seed, (newSeed) => {
  updateIdentity(newSeed)
})
</script>

<template>
  <GenericCard
      title="Identity Seed"
      description="All Knish.IO identities are based on a seed string. This seed string is used to generate a unique secret and signature hash for each user."
      icon="i-heroicons-key"
  >
    <UForm :schema="schema" :state="formState" class="space-y-4">
      <UFormGroup label="Seed String" name="seed">
        <UInput
            v-model="formState.seed"
            placeholder="Enter your seed string here..."
        />
      </UFormGroup>
    </UForm>
  </GenericCard>
</template>