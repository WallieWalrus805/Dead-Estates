import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePaused } from "../assets/contexts/hooks/usePaused"
import { useUser } from "../assets/contexts/hooks/useUser"
import { TileRow } from "../components/TileRow"
import { MapView } from "../components/MapView"
import { ResourceView } from "../components/ResourceView"
import "../css/Map.css"

export function Map() {
    const { paused, setPaused } = usePaused()
    const { user, setUser } = useUser()

    const navigate = useNavigate()
    useEffect(() => {
        if (!user || !user.name) {
            navigate("/")
        }
        setPaused(false)
    }, [user, navigate, setPaused])

    if (!user || !user.map) {
        return <div>Loading...</div>
    }

    const mapRows = user.map.split("\n").map(r => r.split(""))
    const topRows = user.top.split("\n").map(r => r.split(""))

    // combined[r][c] === [mapValue, topValue]
    const combined = mapRows.map((row, rIdx) =>
        row.map((cell, cIdx) => [
            cell,
            (topRows[rIdx] && topRows[rIdx][cIdx]) ?? ""
        ])
    )

    // keep the original variable names but now each cell is [rowValue, topValue]
    const rows = combined
    const tops = combined.map(row => row.map(cellPair => [...cellPair]))

    const selectionRef = useRef(null)
    const [tileSelection, setTileSelection] = useState(null)

    function mapViewClose() {
        if (selectionRef.current) {
            selectionRef.current.classList.remove("selected")
            setTileSelection(null)
        }
    }

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
                                    <TileRow
                                        row={row}
                                        key={index}
                                        rowIndex={index}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                    {tileSelection ? (
                        <MapView
                            value={tileSelection}
                            building={user.buildings.find(b => b.x + "-" + b.y === tileSelection.id)}
                            onClose={mapViewClose}
                        />
                    ) : <ResourceView />}
                </>
            )}
        </div>
    )
}