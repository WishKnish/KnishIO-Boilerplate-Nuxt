# components/cards/IdentityBundleCard.vue
<script setup lang="ts">
import Generic from "~/components/card/Generic.vue"

const { state, clientStatus } = useKnishIO()

/**
 * Automatically compute the status message based on the current state
 */
const statusMessage = computed(() => {
  if (!state.seed) {
    return 'Please enter a seed string to generate your identity bundle.'
  }
  if (!state.bundle) {
    return 'Generating bundle...'
  }
  return state.bundle
})
</script>

<template>
  <Generic
      title="Identity Bundle"
      description="A Knish.IO bundle (also called a 'wallet bundle' or 'bundle hash') is a unique identifier that is used to reference a specific identity on the Knish.IO distributed ledger."
      icon="i-heroicons-user"
      :color="clientStatus.hasBundle ? 'green' : 'orange'"
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
          color="green"
          variant="solid"
          label="Identity Ready"
          icon="i-heroicons-check-circle"
      />
      <UBadge
          v-else
          color="orange"
          variant="solid"
          label="Awaiting Identity"
          icon="i-heroicons-clock"
      />
    </div>
  </Generic>
</template>