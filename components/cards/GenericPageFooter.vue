<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  links: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <footer class="bg-gray-800 text-white">
    <div class="flex justify-between items-center max-w-7xl mx-auto p-6 lg:px-8">
      <div class="flex items-center space-x-4">
        Copyright © {{ new Date().getFullYear() }}
      </div>
      <div class="flex items-center space-x-4">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="text-gray-300 hover:text-white"
        >
          {{ link.name }}
        </router-link>
      </div>
      <div class="flex items-center space-x-4">
        <UButton icon="i-simple-icons-x" color="gray" variant="ghost" to="https://x.com/nuxt_js" target="_blank"/>
        <UButton icon="i-simple-icons-discord" color="gray" variant="ghost" to="https://discord.com/invite/ps2h6QT"
                 target="_blank"/>
        <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/nuxt/nuxt"
                 target="_blank"/>
      </div>
    </div>
  </footer>
</template>