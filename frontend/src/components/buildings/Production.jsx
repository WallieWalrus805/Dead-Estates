import { useState, useEffect, useContext, useCallback } from "react"
import { UserContext } from "../../assets/contexts/UserContext"
import { buildingToPrice, buildingToTime } from "../../assets/data/TileData"

export function Production({ building }) {
    const [timeRemaining, setTimeRemaining] = useState(0)
    const { user, setUser } = useContext(UserContext)

    // Memoized time calculation
    const calculateTimeLeft = useCallback(() => {
        if (!building?.timeFinished) return null

        const now = new Date();
        const finish = new Date(building.timeFinished);

        if (isNaN(finish.getTime())) return 0;

        const difference = Math.max(0, finish - now);
        return Math.ceil(difference / 1000);
    }, [building?.timeFinished])

    useEffect(() => {
        setTimeRemaining(calculateTimeLeft())

        const timerInterval = setInterval(() => {
            const remainingSeconds = calculateTimeLeft()

            if (remainingSeconds === 0) {
                clearInterval(timerInterval)
                setTimeRemaining(0)
            } else {
                setTimeRemaining(prev => prev > remainingSeconds ? remainingSeconds : prev)
            }
        }, 1000)

        return () => clearInterval(timerInterval);
    }, [calculateTimeLeft])

    function generateResource(type) {
        return () => {
            const now = new Date();
            const finish = new Date(now.getTime() + buildingToTime[type]); // 1 hour from now (ms)
            setUser(prevState => {
                const newBuildings = prevState.buildings.map(item =>
                    item.x === building.x && item.y === building.y
                        ? { ...item, timeFinished: finish.toISOString() }
                        : item
                )
                return {
                    ...prevState,
                    money: prevState.money - buildingToPrice[type],
                    buildings: newBuildings
                }
            })
            setTimeRemaining(buildingToTime[type] / 1000) // 1 hour in seconds
        }
    }

    function onClaim(type, value) {
        const newType = (type[0].toLowerCase() + type.slice(1))
        console.log(newType)
        setUser(prevState => {
            const newBuildings = prevState.buildings.map(item =>
                item.x === building.x && item.y === building.y
                    ? { ...item, timeFinished: null }
                    : item
            )
            return {
                ...prevState,
                buildings: newBuildings
            }
        })
        setUser(prevState => ({
            ...prevState,
            resources: {
                ...prevState.resources,
                [newType]: prevState.resources[newType] + value
            }
        }))
        setTimeRemaining(null)
    }

    return (
        <div className="BuildingView">
            <h1>{building.name}</h1>
            {timeRemaining > 0 ?
                <h2>Time remaining: {timeRemaining} seconds</h2>
                : timeRemaining !== null ?
                    <button onClick={() => onClaim(building.creates, 10)}>Claim 10 {building.creates}</button>
                    :
                    <button onClick={generateResource(building.type)}>Generate 10 {building.creates}</button>
            }
        </div>
    )
}