import { Farm } from "./buildings/Farm"
import { Parts } from "./buildings/Parts"
import { Warehouse } from "./buildings/Warehouse"
import { tileColors } from "../assets/data/tileData"

export function MapView({ value, building, onClose }) {

    const type = value.classList[1]

    return (
        <div className="MapView" style={{
            backgroundColor: tileColors[type] || "#000000"
        }}>
            {building ? (
                building.class === "Farm" ? (
                    <Farm building={building} />
                ) : building.class === "Warehouse" ? (
                    <Warehouse building={building} />
                ) : building.class === "Parts" ? (
                    <Parts building={building} />
                ) : (
                    <h1>Unknown building type</h1>
                )
            ) : (
                <h1>No building present</h1>
            )}
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    )
}