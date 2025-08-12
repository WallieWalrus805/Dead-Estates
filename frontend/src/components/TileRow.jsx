import { Tile } from "./Tile"

export function TileRow({ row }) {

    return (
        <tr>
            {row.map((tile, index) => {
                return (
                    <Tile dataType={tile} key={index}/>
                )
            })}
        </tr>
    )
}