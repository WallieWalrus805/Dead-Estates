import { CreateUser } from "../components/CreateUser"
import { Login } from "../components/Login"
import { useState } from "react"

export function Landing() {

    //view == 0 --> Landing
    //view == 1 --> Login
    //view == 2 --> Create
    const [view, setView] = useState(0)

    return (
        <div className="Landing">
            <div className="Landing-Form">
                <div className="Landing-Title" />
                {!view ?
                    <>
                        <button className="Landing-Login" onClick={() => setView(1)}>Login</button>
                        <button className="Landing-Signup" onClick={() => setView(2)}>Create New Account</button>
                    </> :
                    <>
                        {view == 1 ?
                            <Login /> : <CreateUser />
                        }
                        <button className="Back" onClick={() => setView(0)}>Back</button>
                    </>
                }
            </div>
        </div>
    )
}