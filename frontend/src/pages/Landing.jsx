import { Link } from "react-router-dom"

export function Landing() {
    return (
        <div>
            <Link to="/home">
                <button>
                    Homey
                </button>
            </Link>
        </div>
    )
}