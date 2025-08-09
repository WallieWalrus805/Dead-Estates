import { Link, useNavigate } from "react-router-dom"
import { pageData } from "./pageData"
import { PausedContext } from "../assets/contexts/PausedContext"
import { UserContext } from "../assets/contexts/UserContext"
import { useContext, useEffect } from "react"

export function Navbar() {

    const navigate = useNavigate()

    const { paused, setPaused } = useContext(PausedContext)
    // const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        sessionStorage.removeItem("User")
        navigate("/")
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setPaused(prev => {
                    const newPaused = !prev
                    return newPaused
                })
                if (paused === false) {
                    navigate("/map")
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [setPaused])

    return (
        <>
            {paused ? (
                <div className="navbar">
                    {pageData.map((page) => {
                        return (
                            <Link to={page.path} className="navItem" key={page.id}>
                                {page.name}
                            </Link>
                        )
                    })}
                    <button className="navItem" onClick={handleLogout}>Log Out</button>
                    <div>
                        <a>User</a>
                    </div>
                </div>
            ) : <></>}
        </>
    )
}