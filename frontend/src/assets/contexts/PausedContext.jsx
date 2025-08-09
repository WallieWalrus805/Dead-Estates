import { createContext, useState } from "react";

export const PausedContext = createContext();

export function PausedProvider({ children }) {
    const [paused, setPaused] = useState(false);

    return (
        <PausedContext.Provider value={{ paused, setPaused }}>
            {children}
        </PausedContext.Provider>
    );
}