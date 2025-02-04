<script setup lang="ts">
import {type PropType} from 'vue'
import type uiColors from "#ui-colors";

defineProps({
  title: {
    type: String,
    required: undefined
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
  <UCard
    class="relative"
  >
    <template
        v-if="icon || title || description"
        #header
    >
      <UProgress
          v-if="loading"
          animation="carousel"
          class="absolute bottom-0 left-0 right-0"
      />
      <div
          v-if="icon || title"
          class="flex items-center space-x-4"
      >
        <UIcon
            v-if="icon"
            :name="icon"
            class="text-2xl"
        />
        <h3 class="text-lg font-semibold">
          {{ title }}
        </h3>
      </div>
      <p
        v-if="description"
        class="text-sm text-gray-500"
      >
        {{ description }}
      </p>
    </template>
    <template
        v-if="$slots.default"
        #default
    >
      <slot />
    </template>
  </UCard>
</template>