import { Tile } from "./Tile"

export function TileRow({ row, rowIndex }) {

    return (
        <tr>
            {row.map((tile, index) => {
                return (
                    <Tile
                        dataType={tile[0]}
                        top={tile[1]}
                        key={index}
                        position={index + "-" + rowIndex}
                    />
                )
            })}
        </tr>
    )
}