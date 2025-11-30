import { useUser } from "../../assets/contexts/hooks/useUser"
import { InventoryItem } from "./InventoryItem"

export function Inventory() {

    const { user, setUser } = useUser()
    const inventory = [
        {
            type: "lumber",
            timeFinished: "2025-10-26T07:14:31.489Z",
            name: "Lumber Yard",
            creates: "Wood",
            class: "Farm",
            xp: 90
        },
        {
            type: "quarry",
            timeFinished: "2025-10-26T08:14:35.673Z",
            name: "Stone Quarry",
            creates: "Stone",
            class: "Farm",
            xp: 80
        },
        {
            type: "deposit",
            timeFinished: "2025-10-26T06:54:33.551Z",
            name: "Clay Deposit",
            creates: "Clay",
            class: "Farm",
            xp: 110
        }
    ]

    return (
        <div className="InventoryView">
            {inventory.map((item, index) => {
                return (
                    <InventoryItem
                        item={item}
                        key={index}
                    />
                )
            })}
        </div>
    )
}