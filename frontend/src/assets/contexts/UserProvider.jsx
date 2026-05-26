import { useState, useEffect } from 'react'
import { updateUser } from "../data/api"
import { UserContext } from './UserContext'

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    joinDate: "",
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