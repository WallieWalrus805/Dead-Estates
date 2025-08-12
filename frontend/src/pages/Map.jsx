import { PausedContext } from "../assets/contexts/PausedContext"
import { useContext } from "react"
import { TileRow } from "../components/TileRow"
import { tileData } from "../components/TileData"

export function Map() {
    const { paused, setPaused } = useContext(PausedContext)
    const rows = tileData.split("\n").map(row => row.split(""))

    return (
        <PausedContext.Provider value={{ paused, setPaused }}>
            <div className="GameFrame">
                {paused ? (
                    <img className="Pause" src="/Pause.png" />
                ) : (
                    <table className="parcel">
                        <tbody>
                            {rows.map((row, index) => {
                                return (
                                    <TileRow row={row} key={index} />
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </PausedContext.Provider>
    )
}