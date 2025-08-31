export function Listing({item}) {

    const intToValue = {
        1: "Poor",
        2: "Sub-Par",
        3: "Fair",
        4: "Good",
        5: "Pristine"
    }

    return (
        <div className="ah-listing" id={item.id}>
            <div className="ah-listing-image">
            {/* Uncomment the line below to display the image when available */}
            {/* Note: Ensure that item.image is a valid URL or path */}
                {/* <img src={item.image} alt={item.name} /> */}
            </div>
            <div className="ah-listing-details">
                <h1>{intToValue[item.condition]} Level {item.level} {item.type}</h1>
                <p>{item.price}ɃɃ</p>
            </div>
        </div>
    )
}