

export function InventoryItem(item) {
    return (
        <div className={"Inventory-Item"} data-item={JSON.stringify(item.item)}>
            <p>{item.item.type}</p>
        </div>
    )
}