# components/cards/IdentitySecretCard.vue
<script setup lang="ts">
import Generic from "~/components/card/Generic.vue"

const {state} = useKnishIO()
</script>

<template>
  <Generic
      title="Identity Secret"
      description="A Knish.IO secret is a unique string that is used to generate a unique post-quantum signature for each transaction. This secret is generated from the seed string."
      icon="i-heroicons-lock-closed"
  >
    <UAlert
        :color="state.secret ? 'green' : 'red'"
        variant="outline"
        :title="state.secret ? 'Secret Generated' : 'Enter a Seed'"
    >
      <template
          v-slot:description
      >
        <UTextarea
            v-if="state.secret"
            :model-value="state.secret"
            size="xs"
            disabled
        />
      </template>
    </UAlert>
  </Generic>
</template>