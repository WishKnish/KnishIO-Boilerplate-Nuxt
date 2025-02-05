<script setup lang="ts">
const { state, requestAuth, canRequestAuth, clientStatus } = useKnishIO()

/**
 * Loading state for the request
 */
const loading = ref(false)

/**
 * Handle the request for an authorization token
 */
const handleAuthRequest = async () => {
  loading.value = true
  await requestAuth()
  loading.value = false
}

</script>

<template>
  <CardBase
      title="Authorization Token"
      description="An authorization token is a temporary API key that is used to authenticate a client session with a Knish.IO anchor node. It must be requested via the Knish.IO client instance."
      icon="i-heroicons-viewfinder-circle"
      :color="clientStatus.hasAuthToken ? 'green' : 'red'"
      :loading="loading"
  >
    <div class="space-y-4">
      <UTextarea
          :model-value="state.authToken ?? 'Client is unauthorized!'"
          disabled
          :ui="{
          base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-100',
          font: 'font-mono'
        }"
      />
      <div class="flex justify-between items-center">
        <template v-if="!clientStatus.hasAuthToken">
          <UButton
              v-if="canRequestAuth"
              label="Request Auth Token"
              :disabled="!canRequestAuth"
              :loading="loading"
              icon="i-heroicons-arrow-right-end-on-rectangle"
              @click="handleAuthRequest"
          />
          <UBadge
              v-else
              color="orange"
              variant="solid"
              label="Awaiting Identity"
              icon="i-heroicons-clock"
          />
        </template>
        <template v-else>
          <UBadge
              color="green"
              variant="solid"
              label="Authorized"
              icon="i-heroicons-check-circle"
          />
        </template>
      </div>
    </div>
  </CardBase>
</template>