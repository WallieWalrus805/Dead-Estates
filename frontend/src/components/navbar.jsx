import { pageData } from "./pageData"
import { PausedContext } from "../assets/contexts/PausedContext"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"

export function Navbar() {

    const navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem("User")
        navigate("/")
    }

    const [paused, setPaused] = useState(useContext(PausedContext));

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setPaused(prevPaused => !prevPaused);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <PausedContext.Provider value={false}>
            {paused ? (
                <div className="navbar">
                    {pageData.map((page) => {
                        return (
                            <Link to={page.path} className="navItem" key={page.id}>
                                <button>
                                    {page.name}
                                </button>
                            </Link>
                        )
                    })}
                    <button onClick={handleLogout}>Log Out</button>
                    <div>
                        <a>User</a>
                    </div>
                </div>
            ) : <></>}
        </PausedContext.Provider>)
}