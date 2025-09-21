import { createContext, useState, useEffect } from "react";
import { updateUser } from "../data/api";

export const UserContext = createContext();

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
      clay: 0,
      gold: 0,
      steel: 0,
      stone: 0,
      wood: 0
    },
    buildings: {}
  });

  useEffect(() => {
    // Skip initial mount (when user is empty)
    if (!user._id) return;

    async function syncUserData() {
      try {
        await updateUser(user._id, user);
        console.log("Successfully synced user data");
      } catch (error) {
        console.error("Failed to sync user data:", error);
      }
    }

    syncUserData();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}