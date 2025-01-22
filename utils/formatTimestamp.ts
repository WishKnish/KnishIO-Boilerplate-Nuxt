/**
 * Format a timestamp into a human-readable format
 */
export default function (timestamp: Date | string | undefined) {
    if (!timestamp) return ''
    try {
        const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
        return date.toLocaleTimeString()
    } catch (e) {
        return ''
    }
}