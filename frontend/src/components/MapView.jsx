import { Lumber } from "./buildings/Lumber"

export function MapView({ value, building, onClose }) {
    return (
        <div className="MapView">
            <h1>{value.classList[1]}</h1>
            {building ? (
                <>
                    {building.type === "lumber" && <Lumber building={building} />}
                </>
            ) : (
                <p>No building present</p>
            )}
            <button className="close-button" onClick={onClose}>X</button>
        </div>
    )
}