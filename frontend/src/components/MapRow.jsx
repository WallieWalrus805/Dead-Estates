import { MapTile } from "../components/MapTile"

export function MapRow({ row, rowIndex }) {
    return (
        <tr className="Map-Row">
            {row.split("").map((tile, index) => {
                return (
                    <MapTile
                        data={tile}
                        key={index}
                    />
                )
            })}
        </tr>
    )
}