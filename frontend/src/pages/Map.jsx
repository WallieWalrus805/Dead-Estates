import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePaused } from "../assets/contexts/hooks/usePaused"
import { useUser } from "../assets/contexts/hooks/useUser"
import { useTerra } from "../assets/contexts/hooks/useTerra"
import { TileRow } from "../components/TileRow"
import { Inventory } from "../components/map/Inventory"
import { MapView } from "../components/map/MapView"
import { ResourceView } from "../components/map/ResourceView"
import "../css/Map.css"

export function Map() {
    const { paused, setPaused } = usePaused()
    const { user, setUser } = useUser()
    // const terraContext = useTerra()

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

    const rows = user.map.split("\n").map(r => r.split(""))
        .map((row, rowIndex) => row.map((tile, colIndex) => ({
            tile,
            id: `${colIndex}-${rowIndex}`,
            building: user.buildings.find(b => b.x === colIndex && b.y === rowIndex) || null
        })))
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
                }
                // else if (e.target.className === "terra-button") {
                //     terraContext.setTerraMode(prev => {
                //         const newTerra = !prev
                //         return newTerra
                //     })
                // }
            }
        }

        window.addEventListener("click", handleSelect)
        return () => {
            window.removeEventListener("click", handleSelect)
        }
    }, [])

    const buildingRef = useRef(null)
    const [edit, setEdit] = useState(false)
    const buildingPlaceRef = useRef(null)
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

                setEdit(true)
            }
        }

        const handleMove = (e) => {
            if (buildingRef.current && buildingRef.current.classList?.contains("building-Selected")) {
                buildingRef.current.style.left = `${e.clientX - offsetX}px`
                buildingRef.current.style.top = `${e.clientY - offsetY}px`

                // Remove selected class from all td elements
                const selectedTiles = document.querySelectorAll("td.selected");
                selectedTiles.forEach(tile => {
                    tile.classList.remove("selected");
                });

                // Add selected class to td elements under the mouse
                const elementsUnderMouse = document.elementsFromPoint(e.clientX, e.clientY);
                elementsUnderMouse.forEach(el => {
                    if (el.tagName === "TD") {
                        el.classList.add("selected");
                        buildingPlaceRef.current = el;
                    }
                });
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

                // Remove selected class from all td elements
                const selectedTiles = document.querySelectorAll("td.selected");
                selectedTiles.forEach(tile => {
                    tile.classList.remove("selected");
                    const info = JSON.parse(buildingRef.current.getAttribute("data-item"))
                    tile.classList.add(info.type)
                    info.x = parseInt(tile.id.split("-")[0])
                    info.y = parseInt(tile.id.split("-")[1])

                    // Add building to active data
                    setUser(prevState => ({
                        ...prevState,
                        buildings: [
                            ...prevState.buildings,
                            info
                        ]
                    }))
                });
                buildingPlaceRef.current = null;
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
            if (buildingRef.current) {
                buildingRef.current.classList.add("Inventory-Item")
                buildingRef.current.classList.remove("building-Selected")
                buildingRef.current = null
                setEdit(false)
            }
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
                    {!edit ? (tileSelection ? (
                        <MapView
                            value={tileSelection}
                            building={user.buildings.find(b => b.x + "-" + b.y === tileSelection.id)}
                            onClose={mapViewClose}
                        />
                    ) : <ResourceView />) : null}
                    <Inventory />
                    {/* <button
                        className="terra-button"
                    >
                        Terraform
                    </button> */}
                </>
            )}
        </div>
    )
}