import { useContext } from "react"
import { UserContext } from "../../assets/contexts/UserContext"

export function Warehouse({ building, close }) {
    const { user, setUser } = useContext(UserContext)

    return (
        <>
            <div className={"Warehouse " + building.type}>
                <h1>{building.type} Warehouse</h1>
                <br />
                <h2>Capacity: {building.capacity}</h2>
            </div>
            <button className="close-button" onClick={close}>X</button>
        </>
    )
}