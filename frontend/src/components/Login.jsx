import { verifyUser } from "../assets/data/api"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../assets/contexts/UserContext"
import axios from "axios"

export function Login() {

    const [localUser, setLocalUser] = useState({
        name: "",
        password: ""
    })

    const { user, setUser } = useContext(UserContext)

    const navigate = useNavigate()

    function handleChange(e) {
        setLocalUser({ ...localUser, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(localUser)
        if (response) {
            sessionStorage.setItem("User", response[0])
            setUser(response[1])
            axios.defaults.headers.common["authorization"] = `Bearer ${response[0]}`
            navigate("/map")
        } else {
            alert("Login failed")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Name"
                onChange={handleChange}
                name="name"
                required
                maxLength={40}
                autoComplete="username"
            />
            <input
                placeholder="Password"
                onChange={handleChange}
                name="password"
                type="password"
                required
                maxLength={20}
                autoComplete="current-password"
            />
            <button type="submit">Login</button>
        </form>
    )
}