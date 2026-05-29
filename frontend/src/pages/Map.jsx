import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePaused } from "../assets/contexts/hooks/usePaused"
import { useUser } from "../assets/contexts/hooks/useUser"
import { useText } from "../assets/contexts/hooks/useText"
import { Dialogue } from "../components/Dialogue"
import { journal } from  "../assets/data/text"
import "../css/Map.css"

export function Map() {
    const { paused, setPaused } = usePaused()
    const { user, setUser } = useUser()
    const { text, setText } = useText()
    const [ inDialogue, setInDialogue ] = useState(false)

    const navigate = useNavigate()
    
    useEffect(() => {
        if (!user || !user.name) {
            navigate("/")
        }
        setPaused(false)
    }, [user, navigate, setPaused])
    
    // F key to interact
    useEffect(() => {
        const handleUserInteraction = (e) => {
            if (e.key === "f") {
                setText(prev => {
                    const newState = {currentText: `${journal[0]}`}
                    return newState
                })
                setInDialogue(prev => {
                    const newState = !inDialogue
                    return newState
                })
            }
        };
        document.addEventListener("keydown", handleUserInteraction);

        return () => {
            document.removeEventListener("keydown", handleUserInteraction);
        };
    }, [])

    // Next page click after F key interaction
    // useEffect(() => {
    //     const handleUserInteraction = (e) => {
    //         if (inDialogue === true) {
    //             setText(prev => {
    //                 const newState = {currentText: `${journal[0]}`}
    //                 return newState
    //             })
    //             setInDialogue(prev => {
    //                 const newState = !inDialogue
    //                 return newState
    //             })
    //         }
    //     };
    //     document.addEventListener("click", handleUserInteraction);

    //     return () => {
    //         document.removeEventListener("click", handleUserInteraction);
    //     };
    // }, [])

    return (
        <div className="GameFrame">
            {paused ? (
                <img className="Pause" src="/Pause.png" />
            ) : (
                <>
                    {inDialogue? <Dialogue /> : <></>}
                </>
            )}
        </div>
    )
}