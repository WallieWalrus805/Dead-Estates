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
        const handleUserInteraction = () => {
            if (videoRef.current) {
                videoRef.current.play().catch(() => {})
            }
            const timer = setTimeout(() => setShowWelcome(false), 33000)
            return () => clearTimeout(timer)
            setShowWelcome(false)
        };

        document.addEventListener("click", handleUserInteraction);

        return () => {
            document.removeEventListener("click", handleUserInteraction);
        };
    }, [])

    return (
        <>
            {showWelcome &&
                <video id="Scene_I" ref={videoRef} autoPlay playsInline>
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
                            <button className="Back" onClick={() => setView(0)}>Back</button>
                        </>
                    }
                </div>
            </div>}
        </>
    )
}