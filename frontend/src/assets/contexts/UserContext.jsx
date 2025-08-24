import { createContext, useState } from "react"

export const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        _id: "",
        name: "",
        email: "",
        joinDate: "",
        money: 0,
        resources: {
            clay: 0,
            wood: 0,
            stone: 0,
            steel: 0,
            gold: 0
        }
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}