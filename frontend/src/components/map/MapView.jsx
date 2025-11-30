import { Farm } from "../buildings/Farm"
import { Warehouse } from "../buildings/Warehouse"
import { Factory } from "../buildings/Factory"

export function MapView({ value, building, onClose }) {

    const type = value.classList[1]

    return (
        <div className={"BuildingView " + type}>
            {building ? (
                building.class === "Farm" ? (
                    <Farm building={building} close={onClose} />
                ) : building.class === "Warehouse" ? (
                    <Warehouse building={building} close={onClose} />
                ) : building.class === "Factory" ? (
                    <Factory building={building} close={onClose} />
                ) : (
                    <h1>Unknown building type</h1>
                )
            ) : (
                <h1>No building present</h1>
            )}
        </div>
    )
}