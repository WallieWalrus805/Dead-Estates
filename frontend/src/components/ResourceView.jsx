import { useContext } from "react"
import { UserContext } from "../assets/contexts/UserContext"

export function ResourceView() {

    const { user, setUser } = useContext(UserContext)

    return (
        <div className="MapView">
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