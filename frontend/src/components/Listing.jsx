export function Listing({item}) {

    return (
        <div className="ah-listing" id={item.id}>
            <div className="ah-listing-image">
            {/* Uncomment the line below to display the image when available */}
            {/* Note: Ensure that item.image is a valid URL or path */}
                {/* <img src={item.image} alt={item.name} /> */}
            </div>
            <div className="ah-listing-details">
                <h1>{item.name}</h1>
                {/* <h2>{item.description}</h2> */}
                {/* <p>{item.dateCreated}</p> */}
                {/* <p>{item.price}</p> */}
            </div>
        </div>
    )
}