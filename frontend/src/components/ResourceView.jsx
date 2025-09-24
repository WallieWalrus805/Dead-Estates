import { useContext } from "react"
import { UserContext } from "../assets/contexts/UserContext"

export function ResourceView() {

    const { user, setUser } = useContext(UserContext)

    return (
        <div className="MapView">
            <h1>Resources</h1>
            <div className="resources">
                <h2>Clay: {user.resources.clay}</h2>
                <h2>Gold: {user.resources.gold}</h2>
                <h2>Steel: {user.resources.steel}</h2>
                <h2>Stone: {user.resources.stone}</h2>
                <h2>Wood: {user.resources.wood}</h2>
            </div>
            <h2>Money: {user.money} Bone Bucks</h2>
        </div>
    )
}