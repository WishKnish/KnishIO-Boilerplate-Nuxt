<script setup lang="ts">

import TerminalSlideover from "~/components/slideovers/TerminalSlideover.vue";
import { useTerminalLogs } from '~/composables/useTerminalLogs'

const { allLogs } = useTerminalLogs()
const slideover = useSlideover()
function openTerminal() {
  slideover.open(TerminalSlideover, {logs: allLogs.value})
}

const links = [
  {
    label: 'Docs',
    icon: 'i-heroicons-book-open',
    to: '/getting-started'
  },
  {
    label: 'Pro',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/pro',
    children: [
      {
        label: 'Pricing',
        to: '/pro/pricing',
        icon: 'i-heroicons-ticket',
        description: 'A simple pricing, for solo developers or teams.'
      },
      {
        label: 'Templates',
        to: '/pro/templates',
        icon: 'i-heroicons-computer-desktop',
        description: 'Get started with one of our official templates.'
      }
    ]
  },
  {
    label: 'Releases',
    icon: 'i-heroicons-rocket-launch',
    to: '/releases'
  }
]
</script>

<template>
  <UNotifications/>

  <UHeader
      title="WishKnish"
      :links="links"
  >
    <template #right>
      <UButton
          icon="i-heroicons-command-line"
          label="Open Terminal"
          @click="openTerminal"
      />
    </template>
  </UHeader>

  <UMain>
    <UPage>
      <slot/>
    </UPage>
  </UMain>

  <USlideovers/>

  <UFooter :links="links">
    <template #left>
      Copyright © {{ new Date().getFullYear() }}
    </template>

    <template #right>
      <UButton icon="i-simple-icons-x" color="gray" variant="ghost" to="https://x.com/nuxt_js" target="_blank"/>
      <UButton icon="i-simple-icons-discord" color="gray" variant="ghost" to="https://discord.com/invite/ps2h6QT"
               target="_blank"/>
      <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com/nuxt/nuxt"
               target="_blank"/>
    </template>
  </UFooter>
</template>