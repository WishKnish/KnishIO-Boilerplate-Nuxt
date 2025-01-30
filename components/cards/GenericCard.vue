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
  },
  loading: {
    type: Boolean,
    default: false
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
    <UProgress
        v-if="loading"
        animation="carousel"
        class="absolute bottom-0 left-0 right-0"
    />
    <slot />
  </ULandingCard>
</template>