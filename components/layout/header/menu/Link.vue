<script setup lang="ts">

defineProps({
  item: {
    type: Object as PropType<{
      name: string,
      href?: string,
      icon?: string,
      onClick?: () => void
    }>,
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