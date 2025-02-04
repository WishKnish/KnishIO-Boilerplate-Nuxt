<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <UButton
      :to="item.href"
      :icon="item.icon"
      @click="item.onClick && item.onClick()"
  >
    {{ item.name }}
  </UButton>
</template>