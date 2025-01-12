<script setup lang="ts">
import {defineProps, type PropType} from 'vue'
import type uiColors from "#ui-colors";

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String as PropType<typeof uiColors[number]>,
    default: 'primary'
  }
})

</script>
<template>
  <ULandingCard
      :title="title"
      :description="description"
      :icon="icon"
      :color="color"
  >
    <slot />
  </ULandingCard>
</template>