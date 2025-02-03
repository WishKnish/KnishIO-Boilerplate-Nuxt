<script setup lang="ts">

import TerminalSlideover from "~/components/slideovers/TerminalSlideover.vue";
import { useTerminalLogs } from '~/composables/useTerminalLogs'
import GenericPageHeader from "~/components/cards/GenericPageHeader.vue";

const { allLogs } = useTerminalLogs()
const slideover = useSlideover()
function openTerminal() {
  slideover.open(TerminalSlideover, {logs: allLogs.value})
}

const menu = [
  {
    name: 'Identity',
    children: [
      {
        name: 'Analytics',
        description: 'Get a better understanding where your traffic is coming from',
        href: '/analytics',
        icon: 'i-heroicons-chart-pie',
      },
      {
        name: 'Engagement',
        description: 'Speak directly to your customers with our engagement tool',
        href: '/engagement',
        icon: 'i-heroicons-cursor-arrow-rays',
      },
      { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: 'i-heroicons-fingerprint' },
      {
        name: 'Integrations',
        description: 'Your customers’ data will be safe and secure',
        href: '#',
        icon: 'i-heroicons-squares-plus',
      }
    ],
    ctas: [
      { name: 'Watch demo', href: '#', icon: 'i-heroicons-play-circle' },
      { name: 'Contact sales', href: '#', icon: 'i-heroicons-phone' },
      { name: 'View all products', href: '#', icon: 'i-heroicons-rectangle-group' },
    ]
  },
  {
    name: 'Open Terminal',
    icon: 'i-heroicons-command-line',
    onClick: openTerminal
  },
  {
    name: 'Link Test',
    href: 'https://google.com',
  }
]
</script>

<template>
  <UNotifications/>
  <GenericPageHeader
      title="Knish.IO SDK Boilerplate Tool"
      class="mb-4"
      :menu="menu"
  />
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