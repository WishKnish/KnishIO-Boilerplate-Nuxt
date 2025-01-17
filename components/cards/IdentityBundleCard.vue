# components/cards/IdentityBundleCard.vue
<script setup lang="ts">
import GenericCard from "~/components/cards/GenericCard.vue"

const { state, clientStatus } = useKnishIO()

const statusMessage = computed(() => {
  if (!state.seed) {
    return 'Please enter a seed string to generate your identity bundle.'
  }
  if (!state.bundle) {
    return 'Generating bundle...'
  }
  return state.bundle
})

const cardColor = computed(() =>
    clientStatus.hasBundle ? 'primary' : 'teal'
)
</script>

<template>
  <GenericCard
      title="Identity Bundle"
      description="A Knish.IO bundle (also called a 'wallet bundle' or 'bundle hash') is a unique identifier that is used to reference a specific identity on the Knish.IO distributed ledger."
      icon="i-heroicons-user"
      :color="cardColor"
  >
    <div class="space-y-4">
      <UTextarea
          :model-value="statusMessage"
          :disabled="true"
          :ui="{
          base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-100',
          font: 'font-mono'
        }"
      />
      <UBadge
          v-if="clientStatus.hasBundle"
          color="primary"
          variant="solid"
          label="Identity Ready"
          icon="i-heroicons-check-circle"
      />
      <UBadge
          v-else
          color="gray"
          variant="solid"
          label="Awaiting Identity"
          icon="i-heroicons-clock"
      />
    </div>
  </GenericCard>
</template>