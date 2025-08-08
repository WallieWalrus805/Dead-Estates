import { verifyUser } from "../assets/data/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(user)
        if (response) {
            sessionStorage.setItem("User", response)
            axios.defaults.headers.common["authorization"] = `Bearer ${response}`
            navigate("/home")
        } else {
            alert("Login failed")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20}/>
            <button type="submit">Login</button>
        </form>
    )
}