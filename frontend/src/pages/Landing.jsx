import { CreateUser } from "../components/CreateUser"
import { Login } from "../components/Login"
import { Welcome } from "../animations/Welcome"
import { useState, useEffect, useRef } from "react"
import launch from "../animations/Scene I.mp4";

export function Landing() {

    //view == 0 --> Landing
    //view == 1 --> Login
    //view == 2 --> Create
    const [view, setView] = useState(0)
    const [showWelcome, setShowWelcome] = useState(true)
    const videoRef = useRef(null)

    useEffect(() => {
        const handleVideoEnd = () => setShowWelcome(false)

        const handleUserInteraction = () => {
            if (videoRef.current) {
                videoRef.current.play().catch(() => {})
                videoRef.current.addEventListener("ended", handleVideoEnd, { once: true })
            }
        };

        document.addEventListener("click", handleUserInteraction);

        return () => {
            document.removeEventListener("click", handleUserInteraction);
            if (videoRef.current) {
                videoRef.current.removeEventListener("ended", handleVideoEnd)
            }
        };
    }, [])

    return (
        <>
            {showWelcome &&
                <video id="Scene_I" ref={videoRef} playsInline>
                    <source src={launch} type="video/mp4" />
                </video>
            }
            {!showWelcome && <div className="Landing">
                <div className="Landing-Form">
                    <div className="Landing-Title" />
                    {!view ?
                        <>
                            <button className="Landing-Login" onClick={() => setView(1)}>Login</button>
                            <button className="Landing-Signup" onClick={() => setView(2)}>Sign Up</button>
                        </> :
                        <>
                            {view == 1 ?
                                <Login /> : <CreateUser />
                            }
                            <button className="back-button" onClick={() => setView(0)}>Back</button>
                        </>
                    }
                </div>
            </div>}
        </>
    )
}