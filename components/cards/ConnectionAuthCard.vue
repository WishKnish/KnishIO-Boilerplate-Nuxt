<script setup lang="ts">
import GenericCard from "~/components/cards/GenericCard.vue"

const { state, requestAuth, canRequestAuth, clientStatus } = useKnishIO()

const buttonLabel = computed(() =>
    canRequestAuth.value ? 'Request Authorization' : 'Please complete previous steps!'
)

const cardColor = computed(() =>
    clientStatus.isAuthorized ? 'primary' : 'teal'
)
</script>

<template>
  <GenericCard
      title="Authorization Token"
      description="An authorization token is a temporary API key that is used to authenticate a client session with a Knish.IO anchor node. It must be requested via the Knish.IO client instance."
      icon="i-heroicons-viewfinder-circle"
      :color="cardColor"
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
        <template v-if="!clientStatus.isAuthorized">
          <UButton
              :label="buttonLabel"
              :disabled="!canRequestAuth"
              icon="i-heroicons-arrow-right-end-on-rectangle"
              @click="requestAuth"
          />
        </template>
        <template v-else>
          <UBadge
              color="primary"
              variant="solid"
              label="Authorized"
              icon="i-heroicons-check-circle"
          />
        </template>
      </div>
    </div>
  </GenericCard>
</template>