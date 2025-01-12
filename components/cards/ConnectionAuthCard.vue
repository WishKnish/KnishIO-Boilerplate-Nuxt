<script setup lang="ts">
import GenericCard from "~/components/cards/GenericCard.vue";
import {KnishIOClient} from "@wishknish/knishio-client-js/src";

const emit = defineEmits(['input'])

const props = defineProps({
  client: {
    type: KnishIOClient
  }
})

const buttonEnabled = computed(() => {
  return props.client?.hasBundle()
})

const authToken = computed(() => {
  return props.client?.getAuthToken()
})

const handleAuthorization = () => {
  console.log(props.client)
  props.client?.requestAuthToken({})
  emit('input', authToken)
}
</script>

<template>
  <GenericCard
      title="Authorization Token"
      description="An authorization token is a temporary API key that is used to authenticate a client session with a Knish.IO anchor node. It must be requested via the Knish.IO client instance."
      icon="i-heroicons-viewfinder-circle"
  >
    <UInput :model-value="authToken ? authToken.getToken() : 'Client is unauthorized!'" disabled/>
    <UButton
        :label="buttonEnabled ? 'Request Authorization' : 'Please enter a seed string!'"
        :disabled="!buttonEnabled"
        icon="i-heroicons-arrow-right-end-on-rectangle"
        @click="handleAuthorization"
    />
  </GenericCard>
</template>