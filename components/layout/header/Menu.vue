<script setup>
import GenericHeaderMenuPopover from "~/components/layout/header/menu/Popover.vue";
import GenericHeaderMenuLink from "~/components/layout/header/menu/Link.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  menu: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div
      class="hidden lg:flex lg:gap-x-12"
  >
    <component
        v-for="item in menu"
        :key="item.name"
        :is="item.children ? GenericHeaderMenuPopover : GenericHeaderMenuLink"
        :item="item"
    />
  </div>
</template>