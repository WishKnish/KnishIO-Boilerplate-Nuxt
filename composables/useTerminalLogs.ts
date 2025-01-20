import { ref, computed } from 'vue'

interface LogEntry {
    timestamp: Date | string
    message: string
    type: 'info' | 'error' | 'success'
}

// Create a singleton instance for global state
const state = ref<LogEntry[]>([])
const MAX_LOGS = 1000 // Limit the number of logs to prevent memory issues

export const useTerminalLogs = () => {
    const addLog = (message: string, type: LogEntry['type'] = 'info') => {
        // Trim logs if they exceed the maximum
        if (state.value.length >= MAX_LOGS) {
            state.value = state.value.slice(-MAX_LOGS + 1)
        }

        state.value.push({
            timestamp: new Date(),
            message,
            type
        })
    }

    const clearLogs = () => {
        state.value = []
    }

    const allLogs = computed(() => state.value)

    // Initialize with a welcome message if empty
    if (state.value.length === 0) {
        addLog('Terminal initialized', 'info')
    }

    return {
        allLogs,
        addLog,
        clearLogs
    }
}