import { tileLegend } from "../assets/data/tileData";

export function Tile({ dataType, position }) {

    const className = tileLegend[dataType]

    return (
        <td className={"tile " + className} id={position}/>
    );
}