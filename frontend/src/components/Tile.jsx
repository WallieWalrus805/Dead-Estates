import { useUser } from "../assets/contexts/hooks/useUser"
import { tileLegend } from "../assets/data/tileData";

export function Tile({ data }) {

    const { user, setUser } = useUser()

    const className = tileLegend[data.tile]
    const building = data.building || ""
    
    return (
        <>
            <td className={`tile ${className} ${building?.type || ""}`} id={data.id}/>
        </>
    );
}