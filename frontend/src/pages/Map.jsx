import { PausedContext } from "../assets/contexts/PausedContext"
import { useContext, useEffect, useState, useRef } from "react"
import { TileRow } from "../components/TileRow"
import { tileData } from "../components/TileData"

export function Map() {
    const { paused, setPaused } = useContext(PausedContext)
    const rows = tileData.split("\n").map(row => row.split(""))


    const selectionRef = useRef(null)
    const [selection, setSelection] = useState(null)

    useEffect(() => {
        const handleSelect = (e) => {
            if (e.target && e.target.tagName === "TD") {
                const tile = e.target

                if (tile.classList.contains("selected")) {
                    setSelection(null)
                    tile.classList.remove("selected")
                    selectionRef.current = null
                } else {
                    if (selectionRef.current) {
                        selectionRef.current.classList.remove("selected")
                    }
                    setSelection(tile)
                    tile.classList.add("selected")
                    selectionRef.current = tile
                }
            }
        }

        window.addEventListener("click", handleSelect)
        return () => {
            window.removeEventListener("click", handleSelect)
        }
    }, [])


    return (
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
    )
}