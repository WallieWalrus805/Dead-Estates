import { useState } from 'react'
import { PausedContext } from './PausedContext'

export function PausedProvider({ children }) {
    const [paused, setPaused] = useState(false)

    return (
        <PausedContext.Provider value={{ paused, setPaused }}>
            {children}
        </PausedContext.Provider>
    )
}