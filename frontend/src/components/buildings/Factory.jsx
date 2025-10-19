import { plotsToData } from "../../assets/data/tileData"

export function Factory({ building, close }) {

    function generatePlot() {
        return
    }

    function claimPlot() {
        return
    }

    return (
        <div className="Plot">
            <h1>Factory</h1>
            <button onClick={close} className="close-button">X</button>
            <div className="plots-box">
                
            </div>
        </div>
    )
}