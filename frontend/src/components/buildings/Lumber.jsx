import { useState, useEffect, useContext, useCallback } from "react"
import { UserContext } from "../../assets/contexts/UserContext"

export function Lumber({ building }) {
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

    function generateWood(amount) {
        return () => {
            const now = new Date();
            const finish = new Date(now.getTime() + 3600000); // 1 hour from now
            setUser(prevState => {
                const newBuildings = prevState.buildings.map(item =>
                    item.x === building.x && item.y === building.y
                        ? { ...item, timeFinished: finish.toISOString() }
                        : item
                )
                return {
                    ...prevState,
                    buildings: newBuildings
                }
            })
            setTimeRemaining(3600) // 1 hour in seconds
        }
    }

        function onClaim(type, value) {
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
                    [type]: prevState.resources[type] + value
                }
            }))
            setTimeRemaining(null)
        }

        return (
            <div className="BuildingView">
                <h1>Lumber Mill</h1>
                {timeRemaining > 0 ?
                    <h2>Time remaining: {timeRemaining} seconds</h2>
                    : timeRemaining !== null ?
                        <button onClick={() => onClaim("wood", 10)}>Claim 10 Wood</button>
                        :
                        <button onClick={generateWood(10)}>Generate 10 Wood</button>
                }
            </div>
        )
    }