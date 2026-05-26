import { createUser, verifyUser, getUsers } from "../assets/data/api"
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
        if (response.status !== 200) {
            alert("User account could not be created :(")
        } else if (response.data.message) {
            alert("The email is taken")
        } else {
            alert("User account created successfully!")
            let newUser = {
                name: user.name,
                password: user.password
            }
            const users = await getUsers()
            console.log(users)
            await new Promise(resolve => setTimeout(resolve, 3000))
            if (!users.some(u => u.name === user.name)) {
                alert("womp womp")
            } else {
                sessionStorage.setItem("User", login[0])
                setUser(login[1])
                axios.defaults.headers.common["authorization"] = `Bearer ${login[0]}`
                navigate("/map")
            }
        }
    }

    return (
        <form className="Signup-Form" onSubmit={handleSubmit}>
            <input className="Signup-Input" placeholder={"Name"} onChange={handleChange} name="name" required maxLength={20} />
            <input className="Signup-Input" placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40} />
            <input className="Signup-Input" placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20} />
            <button className="Signup-Enter" type="submit">Create Account</button>
        </form>
    )
}