import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePaused } from "../assets/contexts/hooks/usePaused"
import { useUser } from "../assets/contexts/hooks/useUser"
import { useText } from "../assets/contexts/hooks/useText"
import { Dialogue } from "../components/Dialogue"
import { MapRow } from "../components/MapRow"
import { journal } from "../assets/data/text"
import "../css/Map.css"

export function Map() {
    const { paused, setPaused } = usePaused()
    const { user, setUser } = useUser()
    const { text, setText } = useText()
    const [inDialogue, setInDialogue] = useState(false)

    const navigate = useNavigate()

    const map = [
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
        "..............",
    ]

    // Uncomment when app is active
    // useEffect(() => {
    //     if (!user || !user.name) {
    //         navigate("/")
    //     }
    //     setPaused(false)
    // }, [user, navigate, setPaused])

    // F key to interact
    useEffect(() => {
        const handleUserInteraction = (e) => {
            if (e.key === "f") {
                setInDialogue(prev => {
                    const newState = !prev
                    return newState
                })
                setText(prev => {
                    const newState = { currentText: `${journal[0]}` }
                    return newState
                })
            }
        }
        document.addEventListener("keydown", handleUserInteraction);

        return () => {
            document.removeEventListener("keydown", handleUserInteraction);
        }
    }, [setText, setInDialogue])

    return (
        <div className="GameFrame">
            {paused ? (
                <img className="Pause" src="/Pause.png" />
            ) : (
                <div className="background">
                    <table className="Map">
                        <tbody>
                            {map.map((row, index) => {
                                return <MapRow row={row} rowIndex={index} key={index}/>
                            })}
                        </tbody>
                    </table>
                    {inDialogue ? <Dialogue /> : <></>}
                </div>
            )}
        </div>
    )
}