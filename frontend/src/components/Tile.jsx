import { tileLegend } from "./TileData"

export function Tile({ dataType }) {

    const className = tileLegend[dataType]

    return (
        <td className={className} />
    );
}