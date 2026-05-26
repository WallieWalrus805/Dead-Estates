import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePaused } from "../assets/contexts/hooks/usePaused"
import { useUser } from "../assets/contexts/hooks/useUser"
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

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="GameFrame">
            {paused ? (
                <img className="Pause" src="/Pause.png" />
            ) : (
                <>
                    <p>lorem ipsum</p>
                </>
            )}
        </div>
    )
}