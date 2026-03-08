import { createUser } from "../assets/data/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function CreateUser() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await createUser(user)
        console.log(response)
        if (response.status !== 200) {
            alert("User account could not be created :(")
        } else {
            alert("User account created successfully!")
            navigate("/map") // Redirect to the map page after successful creation
        }
    }

    return (
        <form className="Signup-Form" onSubmit={handleSubmit}>
            <input className="Signup-Input" placeholder={"Name"} onChange={handleChange} name="name" required maxLength={20}/>
            <input className="Signup-Input" placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40}/>
            <input className="Signup-Input" placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20}/>
            <button className="Signup-Enter" type="submit">Create Account</button>
        </form>
    )
}