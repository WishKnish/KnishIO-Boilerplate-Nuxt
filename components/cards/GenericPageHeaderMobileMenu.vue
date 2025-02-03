<script setup>
import {RouterLink} from "#vue-router";
import {Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";

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
  <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
    <div class="fixed inset-0 z-10" />
    <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div class="flex items-center justify-between">
        <router-link to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </router-link>
        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
          <span class="sr-only">Close menu</span>
          <UIcon name="i-heroicons-x-mark" class="text-2xl" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <Disclosure
                v-for="item in menu"
                :key="item.name"
                as="div"
                class="-mx-3"
                v-slot="{ open }"
            >
              <DisclosureButton
                  :as="item.href ? RouterLink : 'button'"
                  :to="item.href"
                  class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                {{ item.name }}
                <UIcon
                    v-if="item.children || item.ctas"
                    name="i-heroicons-chevron-down"
                    :class="[open ? 'rotate-180' : '', 'size-5 flex-none']"
                    aria-hidden="true"
                />
              </DisclosureButton>
              <DisclosurePanel
                  class="mt-2 space-y-2"
              >
                <DisclosureButton
                    v-for="child in [...item.children, ...item.ctas]"
                    :key="child.name"
                    :as="RouterLink"
                    :to="child.href"
                    class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  {{ child.name }}
                </DisclosureButton>
              </DisclosurePanel>
            </Disclosure>
          </div>
          <div class="py-6">
            <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>