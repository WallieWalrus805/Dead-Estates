import { PausedContext } from "../assets/contexts/PausedContext"
import { useContext } from "react"

export function Map() {
    const { paused, setPaused } = useContext(PausedContext)

    return (
        <PausedContext.Provider value={{ paused, setPaused }}>
            <div className="GameFrame">
                {paused ? (
                    <img className="Pause" src="/Pause.png" />
                ) : (
                    <div>Map Page</div>
                )}
            </div>
        </PausedContext.Provider>
    )
}