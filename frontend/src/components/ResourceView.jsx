import { useContext } from "react"
import { UserContext } from "../assets/contexts/UserContext"

export function ResourceView() {

    const { user, setUser } = useContext(UserContext)

    return (
        <div className="MapView">
            <h1>Resources</h1>
            <div className="resources">
                <p>Clay: {user.resources.clay}</p>
                <p>Gold: {user.resources.gold}</p>
                <p>Steel: {user.resources.steel}</p>
                <p>Stone: {user.resources.stone}</p>
                <p>Wood: {user.resources.wood}</p>
            </div>
        </div>
    )
}