<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  logs: Array<{ timestamp: Date | string, type: 'info' | 'error' | 'success', message: string }>
}>()

const slideover = useSlideover()

const terminalRef = ref<HTMLDivElement | null>(null)

// Auto-scroll to bottom when new logs are added
watch(props.logs, async () => {
  await nextTick()
  scrollToEnd()
}, { deep: true })

const scrollToEnd = () => {
  if (terminalRef.value) {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight
  }
}

onMounted(async () => {
  await nextTick()
  scrollToEnd()
})

const toggleOpen = () => {
  slideover.close()
}

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

const formatTimestamp = (timestamp: Date | string | undefined) => {
  if (!timestamp) return ''
  try {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
    return date.toLocaleTimeString()
  } catch (e) {
    return ''
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