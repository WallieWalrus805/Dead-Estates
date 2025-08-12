import { Link, useNavigate } from "react-router-dom"
import { pageData } from "./pageData"
import { PausedContext } from "../assets/contexts/PausedContext"
import { useContext, useEffect } from "react"
import { getUser } from "../assets/data/api"

export function Navbar() {

    const navigate = useNavigate()

    const { paused, setPaused } = useContext(PausedContext)

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
                        <a>{sessionStorage.getItem("Username")}</a>
                    </div>
                </div>
            ) : <></>}
        </>
    )
}