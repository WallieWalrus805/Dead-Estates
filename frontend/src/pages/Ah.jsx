import { Listing } from "../components/Listing"
import { AhNav } from "../components/AhNav"
import { getPosts } from "../assets/data/api"
import { useState, useEffect } from "react"

export function Ah() {

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
            <AhNav />
            <div className="ah-body">
                {listings.map((item) => {
                    return (
                        <Listing item={item} key={item._id} />
                    )
                })}
            </div>
        </div>
    )
}