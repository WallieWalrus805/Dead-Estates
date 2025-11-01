import { useState } from 'react';
import { EditContext } from './EditContext';

export function EditProvider({ children }) {
    const [edit, setEdit] = useState(false);
    const contextValue = {
        edit,
        setEdit
    }

    console.log('EditProvider contextValue:', contextValue)

    return (
        <EditContext.Provider value={contextValue}>
            {children}
        </EditContext.Provider>
    );
}