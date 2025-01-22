/**
 * Format a hash for display
 */
export default function (hash: string) {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`
}