<script setup lang="ts">
import GenericPageHeaderMobileMenu from "~/components/cards/GenericPageHeaderMobileMenu.vue";

interface MenuItem {
  name: string
  href?: string
  children?: MenuItem[]
  ctas?: MenuItem[]
}

const props = defineProps<{
  menu: MenuItem[],
  open: boolean,
  title: string
}>()

const emits = defineEmits(['close'])

</script>

<template>
  <USlideover
    :model-value="props.open"
    :title="props.title"
    @close="$emit('close')"
  >
    <GenericPageHeaderMobileMenu
      :title="title"
      :menu="menu"
      @close="$emit('close')"
    />
  </USlideover>
</template>