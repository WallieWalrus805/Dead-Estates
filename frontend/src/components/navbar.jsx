import { Link, useNavigate } from "react-router-dom"
import { pageData } from "../assets/data/pageData"
import { PausedContext } from "../assets/contexts/PausedContext"
import { useContext, useEffect } from "react"
import { UserContext } from "../assets/contexts/UserContext"

export function Navbar() {

    const navigate = useNavigate()

    const { paused, setPaused } = useContext(PausedContext)

    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        sessionStorage.removeItem("User")
        navigate("/")
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                navigate("/map")
                setPaused(prev => {
                    const newPaused = !prev
                    return newPaused
                })
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [setPaused])

    useEffect(() => {
        const handleLoad = () => {
            if (!document.URL.includes("map")) {
                setPaused(true)
            }
        }

        window.addEventListener("load", handleLoad)
        return () => {
            window.removeEventListener("load", handleLoad)
        }
    }, [])

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
                    <a>{user.name}</a>
                </div>
            ) : <></>}
        </>
    )
}