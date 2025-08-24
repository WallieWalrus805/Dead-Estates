import { useState } from "react"
import { CtNav } from "../components/CtNav"
import { UserContext } from "../assets/contexts/UserContext"
import { useContext } from "react"

export function Ct() {

    return (
        <>
            <CtNav/>
            <div className="ct-balance">
                <img src="/Icon_CT.png" alt="CT Icon" className="ct-icon" />
                <h1>{}</h1>
            </div>
        </>
    )
}
