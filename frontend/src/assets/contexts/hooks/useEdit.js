import { useContext } from 'react'
import { EditContext } from '../EditContext'

export function useEdit() {
    const context = useContext(EditContext)
    if (!context) {
        throw new Error('useEdit must be used within a EditProvider')
    }
    return context;
}