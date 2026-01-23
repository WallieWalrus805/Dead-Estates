import { useEffect } from "react"
import { useUser } from "../../assets/contexts/hooks/useUser"
import { useTerra } from "../../assets/contexts/hooks/useTerra"

export function ResourceView() {

    const { user, setUser } = useUser()
    const terraContext = useTerra()

    return (
        <div className="ResourceView">
            <h1>Resources</h1>
            <div className="resources">
                <h2>Wood: {user.resources.Wood}</h2>
                <h2>Clay: {user.resources.Clay}</h2>
                <h2>Stone: {user.resources.Stone}</h2>
                <h2>Steel: {user.resources.Steel}</h2>
                <h2>Gold: {user.resources.Gold}</h2>
            </div>
            <h2>Money: {user.money} Bone Bucks</h2>
        </div>
    )
}