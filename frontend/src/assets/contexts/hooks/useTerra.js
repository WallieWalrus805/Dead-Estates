import { useContext } from 'react'
import { TerraContext } from '../TerraContext'

export function useTerra() {
    const context = useContext(TerraContext)
    if (!context) {
        throw new Error('useTerra must be used within a TerraProvider')
    }
    return context;
}