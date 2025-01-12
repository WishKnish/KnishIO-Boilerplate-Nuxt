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

const toast = useToast()

const handleAuthorization = async () => {
  try {
    const response = await props.client?.requestAuthToken({})

    if (response.success()) {
      toast.add({
        title: 'Success',
        description: 'Authorization token has been successfully granted!',
        icon: 'i-heroicons-check-circle'
      })
    } else {
      toast.add({
        title: 'Error',
        description: response.error,
        icon: 'i-heroicons-x-circle'
      })
    }
  } catch (e) {
    toast.add({
      title: 'Error',
      description: e.message,
      icon: 'i-heroicons-x-circle'
    })
  }
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