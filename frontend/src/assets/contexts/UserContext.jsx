import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        email: "",
        joinDate: "",
        money: 0,
        name: "",
        _id: "",

    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}