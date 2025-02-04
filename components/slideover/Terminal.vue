<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const slideover = useSlideover()

const props = defineProps<{
  logs: Array<{ timestamp: Date | string, type: 'info' | 'error' | 'success', message: string }>
}>()

/**
 * Reference to the terminal element
 */
const terminalRef = ref<HTMLDivElement | null>(null)

/**
 * Watch for changes to the logs and scroll to the end of the terminal
 */
watch(props.logs, async () => {
  await nextTick()
  scrollToEnd()
}, { deep: true })

/**
 * Scroll to the end of the terminal
 */
const scrollToEnd = () => {
  if (terminalRef.value) {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight
  }
}

/**
 * Mount the component and scroll to the end of the terminal
 */
onMounted(async () => {
  await nextTick()
  scrollToEnd()
})

/**
 * Toggle the slideover closed
 */
const toggleOpen = () => {
  slideover.close()
}

/**
 * Get the log class based on the type
 */
const getLogClass = (type: 'info' | 'error' | 'success') => {
  switch (type) {
    case 'error':
      return 'text-red-500'
    case 'success':
      return 'text-green-500'
    default:
      return 'text-gray-300'
  }
}
</script>

<template>
  <USlideover>
    <!-- Terminal Header -->
    <div class="p-2 border-b border-gray-800 flex items-center justify-between bg-gray-950">
      <button
          class="hover:text-gray-300 transition-colors"
          title="Close"
          @click="toggleOpen"
      >
        <UIcon
            name="i-heroicons-chevron-right"
            class="w-5 h-5"
        />
      </button>
      <span class="text-sm font-mono">SDK Terminal</span>
    </div>

    <!-- Terminal Content -->
    <div
        ref="terminalRef"
        class="flex-1 overflow-y-auto p-4 font-mono text-xs"
    >
      <template v-if="props.logs && props.logs.length > 0">
        <div
            v-for="(log, index) in props.logs"
            :key="index"
            class="mb-2"
        >
          <span class="text-gray-500">{{ formatTimestamp(log?.timestamp) }}</span>
          <span :class="getLogClass(log?.type || 'info')" class="ml-2">{{ log?.message }}</span>
        </div>
      </template>
    </div>
  </USlideover>
</template>