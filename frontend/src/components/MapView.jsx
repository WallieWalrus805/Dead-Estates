import { Production } from "./buildings/Production"
import { tileColors } from "../assets/data/TileData"

export function MapView({ value, building, onClose }) {

    const type = value.classList[1]

    return (
        <div className="MapView" style={{
            backgroundColor: tileColors[type] || "#000000"
        }}>
            {building ? (
                <Production building={building} />
            ) : (
                <h1>No building present</h1>
            )}
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    )
}