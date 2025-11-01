import { useContext } from 'react'
import { PausedContext } from '../PausedContext'

export function usePaused() {
    const context = useContext(PausedContext)
    if (!context) {
        throw new Error('usePaused must be used within a PausedProvider')
    }
    return context;
}