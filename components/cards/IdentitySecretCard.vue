# components/cards/IdentitySecretCard.vue
<script setup lang="ts">
import GenericCard from "~/components/cards/GenericCard.vue"

const { state } = useKnishIO()
</script>

<template>
  <GenericCard
      title="Identity Secret"
      description="A Knish.IO secret is a unique string that is used to generate a unique post-quantum signature for each transaction. This secret is generated from the seed string."
      icon="i-heroicons-lock-closed"
  >
    <UTextarea
        :model-value="state.secret"
        placeholder="Please enter a seed string!"
        disabled
    />
  </GenericCard>
</template>