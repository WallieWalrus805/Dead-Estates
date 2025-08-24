import { tileLegend } from "../assets/data/tileData";

export function Tile({ dataType }) {

    const className = tileLegend[dataType]

    return (
        <td className={className} />
    );
}