import { useState } from 'react';
import { EditContext } from './EditContext';

export function EditProvider({ children }) {
    const [editMode, setEditMode] = useState(false);
    const contextValue = {
        editMode,
        setEditMode
    }

    return (
        <EditContext.Provider value={contextValue}>
            {children}
        </EditContext.Provider>
    );
}