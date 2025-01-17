import { KnishIOClient, generateSecret } from "@wishknish/knishio-client-js/src"

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

    const handleError = (message: string, error: Error) => {
        state.error = `${message}: ${error.message}`
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
            } else {
                state.seed = undefined
                state.secret = undefined
                state.bundle = undefined
                state.authToken = undefined
                state.client.deinitialize()
                state.isReady = false
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
                state.client.setUri(uri)
                state.uri = uri
            } catch (e) {
                handleError('Failed to set URI', e as Error)
                state.uri = state.client.getUri() // Revert to previous valid URI
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
            } catch (e) {
                handleError('Failed to set cell', e as Error)
                state.cell = state.client.getCellSlug() // Revert to previous valid cell
            }
        }
    }

    // Request authorization
    const requestAuth = async () => {
        if (!state.client.hasBundle()) {
            handleError('Authorization failed', new Error('Client not initialized'))
            return
        }

        try {
            const response = await state.client.requestAuthToken({})
            if (response.success()) {
                state.authToken = state.client.getAuthToken()?.getToken()
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

    // Reset all state
    const reset = () => {
        state.uri = defaultUri
        state.cell = defaultCell
        state.seed = undefined
        state.secret = undefined
        state.bundle = undefined
        state.error = undefined
        state.authToken = undefined
        state.client.deinitialize()
        state.isReady = false
    }

    const canRequestAuth = computed(() =>
        state.client.hasBundle() &&
        state.client.getUri() &&
        state.client.getCellSlug()
    )

    const clientStatus = computed(() => ({
        hasBundle: state.client.hasBundle(),
        hasUri: !!state.client.getUri(),
        hasCell: !!state.client.getCellSlug(),
        isAuthorized: !!state.client.getAuthToken(),
        isReady: state.isReady
    }))

    return {
        state: readonly(state),
        updateIdentity,
        updateUri,
        updateCell,
        requestAuth,
        reset,
        canRequestAuth,
        clientStatus
    }
}