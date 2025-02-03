<script setup>
import {RouterLink} from "#vue-router";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <UPopover
      :ui="{width: 'max-w-full'}"
  >
    <UButton
        :icon="item.icon"
        trailing-icon="i-heroicons-chevron-down-20-solid"
        @click="item.onClick && item.onClick()"
    >
      {{ item.name }}
    </UButton>
    <template
        #panel
    >
      <div
          class="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8"
      >
        <div
            v-for="child in item.children"
            :key="child.name"
            class="group relative rounded-lg p-6 text-sm/6 hover:bg-gray-50"
        >
          <div
              class="flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
          >
            <UIcon
                :name="child.icon"
                class="size-6 text-gray-600 group-hover:text-indigo-600"
                aria-hidden="true"
            />
          </div>
          <router-link
              :to="child.href"
              class="mt-6 block font-semibold text-gray-900"
          >
            {{ child.name }}
            <span
                class="absolute inset-0"
            />
          </router-link>
          <p
              class="mt-1 text-gray-600"
          >
            {{ child.description }}
          </p>
        </div>
      </div>
      <div
          v-if="item.ctas"
          class="bg-gray-50"
      >
        <div
            class="mx-auto max-w-7xl px-6 lg:px-8"
        >
          <div
              class="grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5"
          >
            <router-link
                v-for="cta in item.ctas"
                :key="cta.name"
                :to="cta.href"
                class="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
            >
              <UIcon
                  :name="cta.icon"
                  class="size-5 flex-none text-gray-400"
                  aria-hidden="true"
              />
              {{ cta.name }}
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>