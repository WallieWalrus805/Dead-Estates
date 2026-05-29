import { useContext } from 'react'
import { TextContext } from '../TextContext'

export function useText() {
    const context = useContext(TextContext)
    if (!context) {
        throw new Error('useText must be used within a TextProvider')
    }
    return context;
}