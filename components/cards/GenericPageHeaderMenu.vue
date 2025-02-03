<script setup>
import GenericPageHeaderMenuPopover from "~/components/cards/GenericPageHeaderMenuPopover.vue";
import GenericPageHeaderMenuLink from "~/components/cards/GenericPageHeaderMenuLink.vue";

const props = defineProps({
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
        :is="item.children ? GenericPageHeaderMenuPopover : GenericPageHeaderMenuLink"
        :item="item"
    />
  </div>
</template>