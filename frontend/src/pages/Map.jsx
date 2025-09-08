import { PausedContext } from "../assets/contexts/PausedContext"
import { useContext, useEffect, useState, useRef } from "react"
import { TileRow } from "../components/TileRow"
import { UserContext } from "../assets/contexts/UserContext"
import { MapView } from "../components/MapView"

export function Map() {
    const { paused, setPaused } = useContext(PausedContext)
    const { user, setUser } = useContext(UserContext)

    const rows = user.map.split("\n").map(row => row.split(""))

    const [selection, setSelection] = useState(false)

    const selectionRef = useRef(null)
    const [tileSelection, setTileSelection] = useState(null)

    useEffect(() => {
        const handleSelect = (e) => {
            if (e.target && e.target.tagName === "TD") {
                const tile = e.target

                if (tile.classList.contains("selected")) {
                    setTileSelection(null)
                    tile.classList.remove("selected")
                    selectionRef.current = null
                } else {
                    if (selectionRef.current) {
                        selectionRef.current.classList.remove("selected")
                    }
                    setTileSelection(tile)
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
                <>
                    <table className="parcel">
                        <tbody>
                            {rows.map((row, index) => {
                                return (
                                    <TileRow row={row} key={index} />
                                )
                            })}
                        </tbody>
                        {tileSelection ? (
                        <MapView value={tileSelection}/>
                    ) : null}
                    </table>
                </>
            )}
        </div>
    )
}