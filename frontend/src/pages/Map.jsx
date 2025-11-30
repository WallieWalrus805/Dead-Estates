import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePaused } from "../assets/contexts/hooks/usePaused"
import { useUser } from "../assets/contexts/hooks/useUser"
import { useEdit } from "../assets/contexts/hooks/useEdit"
import { TileRow } from "../components/TileRow"
import { Inventory } from "../components/map/Inventory"
import { MapView } from "../components/map/MapView"
import { ResourceView } from "../components/map/ResourceView"
import "../css/Map.css"

export function Map() {
    const { paused, setPaused } = usePaused()
    const { user, setUser } = useUser()
    const editContext = useEdit()

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
            if (e.target) {
                if (e.target.tagName === "TD") {
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
                } else if (e.target.className === "edit-button") {
                    editContext.setEditMode(prev => {
                        const newEdit = !prev
                        return newEdit
                    })
                }
            }
        }

        window.addEventListener("click", handleSelect)
        return () => {
            window.removeEventListener("click", handleSelect)
        }
    }, [])

    const buildingRef = useRef(null)

    useEffect(() => {
        let offsetX = 0
        let offsetY = 0

        const handleDrag = (e) => {
            if (e.target && e.target.classList?.contains("Inventory-Item")) {
                buildingRef.current = e.target

                const rect = buildingRef.current.getBoundingClientRect()
                offsetX = e.clientX - rect.left
                offsetY = e.clientY - rect.top

                buildingRef.current.classList.add("building-Selected")
                buildingRef.current.classList.remove("Inventory-Item")

                // make the element follow the pointer
                buildingRef.current.style.position = "fixed"
                buildingRef.current.style.left = `${e.clientX - offsetX}px`
                buildingRef.current.style.top = `${e.clientY - offsetY}px`
                buildingRef.current.style.pointerEvents = "none" // let mouse events pass through to underlying tiles
                buildingRef.current.style.zIndex = "9999"

                console.log("Down")
            }
        }

        const handleMove = (e) => {
            if (buildingRef.current && buildingRef.current.classList?.contains("building-Selected")) {
                buildingRef.current.style.left = `${e.clientX - offsetX}px`
                buildingRef.current.style.top = `${e.clientY - offsetY}px`
            }
        }

        const handleUpCleanup = () => {
            if (buildingRef.current) {
                // reset inline positioning so element returns to normal DOM flow after drop
                buildingRef.current.style.position = ""
                buildingRef.current.style.left = ""
                buildingRef.current.style.top = ""
                buildingRef.current.style.pointerEvents = ""
                buildingRef.current.style.zIndex = ""
            }
        }

        window.addEventListener("mousedown", handleDrag)
        window.addEventListener("mousemove", handleMove)
        window.addEventListener("mouseup", handleUpCleanup)

        return () => {
            window.removeEventListener("mousedown", handleDrag)
            window.removeEventListener("mousemove", handleMove)
            window.removeEventListener("mouseup", handleUpCleanup)
        }
    }, [])

    useEffect(() => {
        const handleUnDrag = (e) => {
            buildingRef.current.classList.add("Inventory-Item")
            buildingRef.current.classList.remove("building-Selected")
            console.log("Up")
        }
        window.addEventListener("mouseup", handleUnDrag)
        return () => {
            window.removeEventListener("mouseup", handleUnDrag)
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
                            })
                            }
                        </tbody>
                    </table>
                    {tileSelection ? (
                        <MapView
                            value={tileSelection}
                            building={user.buildings.find(b => b.x + "-" + b.y === tileSelection.id)}
                            onClose={mapViewClose}
                        />
                    ) : <ResourceView />}
                    {editContext.editMode ? (
                        <Inventory />
                    ) : null
                    }
                    <button
                        className="edit-button"
                    >
                        Edit Map
                    </button>
                </>
            )}
        </div>
    )
}