export function Listing({item}) {

    return (
        <div className="listing" id={item.id}>
            <h1>{item.name}</h1>
            <h2>{item.description}</h2>
            <p>{item.dateCreated}</p>
        </div>
    )
}