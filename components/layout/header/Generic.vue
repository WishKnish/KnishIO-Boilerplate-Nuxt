<script setup>
import { ref } from 'vue'
import {RouterLink} from "#vue-router";

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

const mobileMenuOpen = ref(false)
</script>

<template>
  <header
      class="relative isolate z-10 bg-white"
  >
    <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
    >
      <div
          class="flex lg:flex-1"
      >
        <RouterLink
            to="/"
            class="-m-1.5 p-1.5"
        >
          <span class="sr-only">
            {{ title }}
          </span>
          <img
              class="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
          />
        </RouterLink>
      </div>
      <div class="flex lg:hidden">
        <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
        >
          <span
              class="sr-only"
          >
            Open main menu
          </span>
          <UIcon
              name="i-heroicons-bars-3"
              class="text-2xl"
          />
        </button>
      </div>
      <LayoutHeaderMenu
        :title="title"
        :menu="menu"
      />
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" class="text-sm/6 font-semibold text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <SlideoverMobile
        :title="title"
        :menu="menu"
        :open="mobileMenuOpen"
        @close="mobileMenuOpen = false"
    />
  </header>
</template>