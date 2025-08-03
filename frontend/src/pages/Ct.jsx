import { Comm } from "../components/Comm"
import { getComms } from "../assets/data/api"
import { useState, useEffect } from "react"

export function Ct() {
    const [comms, setComms] = useState([])

    useEffect(() => {
        async function loadAllComms() {
            const data = await getComms()
            setComms(data)
        }
        loadAllComms()
    }, [])

    return (
        <div className="main-ct">
            {comms.map((item) => {
                return (
                    <Comm item={item} key={item._id} />
                )
            })}
        </div>
    )
}