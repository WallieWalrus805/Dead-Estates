import { useState } from "react"

export function Settings() {

    const [user, setUser] = useState({
        name: "",
        password: ""
    })

    return (
        <form className="settings-main">
            <h1>Change Username: </h1>
            <input
                placeholder="New Username"
                type="text"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                value={user.name}
                name="name"
                required
            />
            <button>Change</button>
        </form>
    )
}