import { useState, useEffect } from 'react'
import { updateUser } from "../data/api"
import { UserContext } from './UserContext'

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    joinDate: "",
    money: 0,
    inventory: {},
    map: "",
    resources: {
      Clay: 0,
      Gold: 0,
      Steel: 0,
      Stone: 0,
      Wood: 0
    },
    buildings: {}
  })

  useEffect(() => {
    // Skip initial mount (when user is empty)
    if (!user._id) return;

    async function syncUserData() {
      try {
        await updateUser(user._id, user)
        console.log("Successfully synced user data")
      } catch (error) {
        console.error("Failed to sync user data:", error)
      }
    }

    syncUserData()
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}