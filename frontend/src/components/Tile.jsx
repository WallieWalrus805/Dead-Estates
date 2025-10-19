import { tileLegend } from "../assets/data/tileData";
import { useContext } from "react"
import { UserContext } from "../assets/contexts/UserContext"

export function Tile({ dataType, top, position }) {

    const { user, setUser } = useContext(UserContext)

    const className = tileLegend[dataType]
    const className2 = tileLegend[top]
    const building = user.buildings.find(b => b.y === parseInt(position.split("-")[1]) && b.x === parseInt(position.split("-")[0]))
    // const category = user.buildings.find(b => b.y === index && b.x === rowIndex).class
    // const type = user.buildings.find(b => b.y === index && b.x === rowIndex).type
    // console.log(position)
    return (
        <td className={"tile " + className + " " + className2} id={position}/>
    );
}