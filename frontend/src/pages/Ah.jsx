import { Listing } from "../components/Listing"
import { getPosts } from "../assets/data/api"
// import { UserContext } from "../assets/contexts/UserContext"
import { useState, useEffect, useContext } from "react"

export function Ah() {

    // const { user, setUser } = useContext(UserContext)

    const [listings, setListings] = useState([])

    useEffect(() => {
        async function loadAllListings() {
            const data = await getPosts()
            setListings(data)
        }
        loadAllListings()
    }, [])

    return (
        <div className="ah-main">
            <div className="ah-body">
                {listings.map((item) => {
                    return (
                        <Listing item={item} key={item._id} />
                    )
                })}
            </div>
            <div className="ah-footer">
                <img src="/Icon_CT.png" alt="CT Logo" width="25px" height="25px" />
            </div>
        </div>
    )
}