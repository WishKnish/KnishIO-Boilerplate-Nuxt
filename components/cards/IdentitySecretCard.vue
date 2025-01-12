<script setup lang="ts">
import GenericCard from "~/components/cards/GenericCard.vue";
import {generateSecret} from "@wishknish/knishio-client-js/src";

const emit = defineEmits(['input'])

const props = defineProps({
  seed: {
    type: String
  }
})

watch(() => props.seed, () => {
  handleSeed()
})

const state = reactive({
  secret: undefined
})

const handleSeed = () => {
  if(props.seed && props.seed.length > 0) {
    state.secret = generateSecret(props.seed)
  }
  else {
    state.secret = undefined
  }
  emit('input', state.secret)
}
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