import { Tile } from "./Tile"

export function TileRow({ row, rowIndex }) {

    return (
        <tr>
            {row.map((tile, index) => {
                return (
                    <Tile dataType={tile} key={index} position={rowIndex + "-" + index}/>
                )
            })}
        </tr>
    )
}