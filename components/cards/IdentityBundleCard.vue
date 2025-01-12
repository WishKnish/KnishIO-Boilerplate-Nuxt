<script setup lang="ts">
import GenericCard from "~/components/cards/GenericCard.vue";
import {KnishIOClient} from "@wishknish/knishio-client-js/src";

const emit = defineEmits(['input'])

const props = defineProps({
  client: {
    type: KnishIOClient
  }
})

watch(() => props.client.$__bundle, () => {
  handleBundle()
})

const state = reactive({
  bundle: undefined
})

const handleBundle = () => {
  if(props.client && props.client.hasBundle()) {
    state.bundle = props.client.getBundle()
  }
  else {
    state.bundle = undefined
  }
  emit('input', state.bundle)
}
</script>

<template>
  <GenericCard
      title="Identity Bundle"
      description="A Knish.IO bundle (also called a 'wallet bundle' or 'bundle hash') is a unique identifier that is used to reference a specific identity on the Knish.IO distributed ledger."
      icon="i-heroicons-user"
  >
    <UTextarea
        :model-value="state.bundle"
        placeholder="Please enter a seed string!"
        disabled />
  </GenericCard>
</template>