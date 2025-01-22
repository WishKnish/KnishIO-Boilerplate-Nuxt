import { KnishIOClient, generateSecret } from "@wishknish/knishio-client-js/src"
import { useTerminalLogs } from '~/composables/useTerminalLogs'

export interface KnishIOState {
    client: KnishIOClient
    seed: string | undefined
    secret: string | undefined
    bundle: string | undefined
    uri: string
    cell: string
    authToken: string | undefined
    error: string | undefined
    isReady: boolean
}

const defaultUri = 'https://eteplitsky.testnet.knish.io/graphql'
const defaultCell = 'TESTCELL'

// Create a global state instance
const state = reactive<KnishIOState>({
    client: new KnishIOClient({
        uri: defaultUri,
        cellSlug: defaultCell
    }),
    seed: undefined,
    secret: undefined,
    bundle: undefined,
    uri: defaultUri,
    cell: defaultCell,
    authToken: undefined,
    error: undefined,
    isReady: false
})

export const useKnishIO = () => {
    const toast = useToast()
    const terminalLogs = useTerminalLogs()

    const handleError = (message: string, error: Error) => {
        state.error = `${message}: ${error.message}`
        terminalLogs.addLog(`${message}: ${error.message}`, 'error')
        toast.add({
            title: 'Error',
            description: state.error,
            icon: 'i-heroicons-x-circle'
        })
    }

    // Update identity-related state
    const updateIdentity = (seed: string | undefined) => {
        try {
            if (seed && seed.length > 0) {
                const newSecret = generateSecret(seed)
                state.seed = seed
                state.secret = newSecret
                state.client.setSecret(newSecret)
                state.bundle = state.client.getBundle()
                state.isReady = true
                terminalLogs.addLog(`Identity updated successfully with seed: ${state.seed}`, 'success')
                terminalLogs.addLog(`Resulting Secret: ${state.secret}`, 'info')
                terminalLogs.addLog(`Resulting Bundle: ${state.bundle}`, 'info')
            } else {
                state.seed = undefined
                state.secret = undefined
                state.bundle = undefined
                state.authToken = undefined
                state.client.deinitialize()
                state.isReady = false
                terminalLogs.addLog('Identity cleared', 'info')
            }
        } catch (e) {
            handleError('Failed to update identity', e as Error)
            // Reset state on error
            state.seed = undefined
            state.secret = undefined
            state.bundle = undefined
            state.isReady = false
        }
    }

    // Update connection URI
    const updateUri = (uri: string) => {
        if (uri && uri !== state.client.getUri()) {
            try {
                terminalLogs.addLog(`Updating URI to: ${uri}`, 'info')
                state.client.setUri(uri)
                state.uri = uri
                terminalLogs.addLog('URI updated successfully', 'success')
            } catch (e) {
                handleError('Failed to set URI', e as Error)
                state.uri = state.client.getUri()
            }
        }
    }

    // Update cell slug
    const updateCell = (cell: string) => {
        if (cell && cell !== state.client.getCellSlug()) {
            try {
                const normalizedCell = cell.toUpperCase()
                state.client.setCellSlug(normalizedCell)
                state.cell = normalizedCell
                terminalLogs.addLog(`Updating cell to: ${normalizedCell}`, 'success')
            } catch (e) {
                handleError('Failed to set cell', e as Error)
                state.cell = state.client.getCellSlug()
            }
        }
    }

    // Request authorization
    const requestAuth = async () => {
        if (!state.client.hasBundle()) {
            handleError('Authorization failed', new Error('Client not initialized'))
            return
        }

        terminalLogs.addLog('Requesting authorization token...', 'info')
        try {
            const response = await state.client.requestAuthToken({})
            if (response.success()) {
                state.authToken = state.client.getAuthToken()?.getToken()
                terminalLogs.addLog('Authorization token granted successfully', 'success')
                toast.add({
                    title: 'Success',
                    description: 'Authorization token has been successfully granted!',
                    icon: 'i-heroicons-check-circle'
                })
            } else {
                handleError('Authorization failed', new Error(response.error))
            }
        } catch (e) {
            handleError('Authorization request failed', e as Error)
        }
    }

    // Query Meta Asset
    const metaQuery = async (metaType: string, metaId: string, filter: Array<Object> = [], latest: boolean = true) => {
        if (!state.client.hasBundle()) {
            handleError('Meta Asset query failed', new Error('Client not initialized'))
            return
        }

        terminalLogs.addLog('Querying Meta Asset...', 'info')
        try {
            const response = await state.client.queryMeta({
                metaType,
                metaId,
                filter,
                latest
            })
            if (response) {
                terminalLogs.addLog(`Meta Asset query found ${ response.instances.length } items`, 'success')
                toast.add({
                    title: 'Success',
                    description: `Meta Asset query found ${ response.instances.length } items`,
                    icon: 'i-heroicons-check-circle'
                })
                return response
            } else {
                handleError('Meta Asset query failed', new Error(response.error))
            }
        } catch (e) {
            handleError('Meta Asset query failed', e as Error)
        }
    }

    // Reset all state
    const reset = () => {
        terminalLogs.addLog('Resetting KnishIO client...', 'info')
        state.uri = defaultUri
        state.cell = defaultCell
        state.seed = undefined
        state.secret = undefined
        state.bundle = undefined
        state.error = undefined
        state.authToken = undefined
        state.client.deinitialize()
        state.isReady = false
        terminalLogs.addLog('KnishIO client reset complete', 'success')
    }

    // Compute client status
    const canRequestAuth = computed(() =>
        state.client.hasBundle() &&
        state.client.getUri() &&
        state.client.getCellSlug()
    )

    const clientStatus = computed(() => ({
        hasSeed: !!state.seed,
        hasSecret: !!state.secret,
        hasBundle: !!state.bundle,
        hasUri: !!state.uri,
        hasCell: !!state.cell,
        hasError: !!state.error,
        hasAuthToken: !!state.authToken,
        isReady: state.isReady
    }))

    return {
        state: readonly(state),
        updateIdentity,
        updateUri,
        updateCell,
        requestAuth,
        metaQuery,
        reset,
        canRequestAuth,
        clientStatus
    }
}