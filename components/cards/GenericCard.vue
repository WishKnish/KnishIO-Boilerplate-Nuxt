<script setup lang="ts">
import {type PropType} from 'vue'
import type uiColors from "#ui-colors";

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: undefined
  },
  icon: {
    type: String,
    default: undefined
  },
  color: {
    type: String as PropType<typeof uiColors[number]>,
    default: undefined
  },
  orientation: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: undefined
  }
})

</script>
<template>
  <ULandingCard
      :title="title"
      :description="description"
      :icon="icon"
      :color="color"
      :orientation="orientation"
  >
    <slot />
  </ULandingCard>
</template>