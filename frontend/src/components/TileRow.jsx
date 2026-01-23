import { Tile } from "./Tile"

export function TileRow({ row, rowIndex }) {
    
    return (
        <tr>
            {row.map((tile, index) => {
                return (
                    <Tile
                        data={tile}
                        key={index}
                    />
                )
            })}
        </tr>
    )
}