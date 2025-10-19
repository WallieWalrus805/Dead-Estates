import { useState, useEffect, useContext, useCallback } from "react"
import { UserContext } from "../../assets/contexts/UserContext"
import { buildingToPrice, buildingToTime, buildingXpToLevel, baseBuildingStats } from "../../assets/data/tileData"

export function Farm({ building, close }) {
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
        if (user.money < buildingToPrice[type]) {
            alert("Not enough money!")
            return () => {}
        } else if (user.resources[type] + toAdd > user.buildings.filter(b => b.class === "Warehouse" && b.type === building.creates).reduce((sum, warehouse) => sum + (warehouse.capacity || 0), 0)) {
            alert("Not enough warehouse space!")
            return () => {}
        }
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
        setUser(prevState => {
            const newBuildings = prevState.buildings.map(item =>
                item.x === building.x && item.y === building.y
                    ? { ...item, timeFinished: null, xp: item.xp + 10 }
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

    const [hasSpace, setHasSpace] = useState(false);

    useEffect(() => {
        // Find all warehouses of the same type as the building
        const warehouses = user.buildings.filter(b => b.class === "Warehouse" && b.type === building.creates);
        // Sum their capacity values
        const totalCapacity = warehouses.reduce((sum, warehouse) => sum + (warehouse.capacity || 0), 0);
        if (warehouses.length === 0) {
            setHasSpace(true)
        } else {
            user.resources[building.creates] < totalCapacity ?
            setHasSpace(false) :
            setHasSpace(true);
        }
    }, [user.resources, user.buildings, building.type]);

    // Helper to format seconds as hh:mm:ss
    function formatTime(seconds) {
        if (seconds == null) return "";
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            hrs.toString().padStart(2, "0"),
            mins.toString().padStart(2, "0"),
            secs.toString().padStart(2, "0")
        ].join(":");
    }

    function getMaxLevel(xp) {
        // Flip buildingXpToLevel: {level: minXp}
        const levelToXp = Object.entries(buildingXpToLevel).map(([minXp, level]) => [level, parseInt(minXp)]);
        // Find current level
        let level = Math.max(
            ...levelToXp.filter(([, minXp]) => xp >= minXp).map(([level]) => level)
        );
        // Find next level's required XP
        const nextLevelXp = levelToXp.find(([lvl]) => lvl === level + 1)?.[1] ?? null;
        return [level, nextLevelXp];
    }

    const toAdd = getMaxLevel(building.xp)[0] + baseBuildingStats[building.creates]

    return (
        <div className="BuildingView">
            <h1>{building.name}</h1>
            <br />
            <h2>Produces: {building.creates}</h2>
            <h2>Cost: {buildingToPrice[building.creates]}</h2>
            <h2>Time to produce: {Math.round(100 * buildingToTime[building.creates] / 3600000) / 100} hour(s)</h2>
            <h2>XP: {building.xp}/{getMaxLevel(building.xp)[1]}</h2>
            {getMaxLevel(building.xp)[1] ?
                <h2>Level: {getMaxLevel(building.xp)[0]}</h2>
                : <h2>Level: {getMaxLevel(building.xp)[0]} (MAX)</h2>
            }
            <br />
            {timeRemaining > 0 ?
                <h2>Time remaining: {formatTime(timeRemaining)}</h2>
                : timeRemaining !== null ?
                    <button
                        onClick={() =>
                            onClaim(building.creates, toAdd
                            )}
                        disabled={hasSpace}
                    >Claim {toAdd} {building.creates}
                    </button>
                    :
                    <button
                        onClick={generateResource(building.creates)}
                        disabled={user.money < buildingToPrice[building.type] || hasSpace}
                    >Generate {toAdd} {building.creates}
                    </button>
            }
            <button className="close-button" onClick={close}>X</button>
        </div>
    )
}