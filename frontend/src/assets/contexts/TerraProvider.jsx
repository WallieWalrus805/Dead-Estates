import { useState } from 'react';
import { TerraContext } from './TerraContext';

export function TerraProvider({ children }) {
    const [terraMode, setTerraMode] = useState(false);
    const contextValue = {
        terraMode,
        setTerraMode
    }

    return (
        <TerraContext.Provider value={contextValue}>
            {children}
        </TerraContext.Provider>
    );
}