export function MapView({ value }) {
    return (
        <caption className="MapView">
            <h1>{value.classList[1]}</h1>
            <button className="close-button" onClick={() => {
                value.classList.remove("selected")
                value = null
            }}>X</button>
        </caption>
    )
}