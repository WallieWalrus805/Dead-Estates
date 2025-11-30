

export function InventoryItem(item) {
    return (
        <div className={"Inventory-Item " + item.item.type}>
            {item.item.name}
        </div>
    )
}