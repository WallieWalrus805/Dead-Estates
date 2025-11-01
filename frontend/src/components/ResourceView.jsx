import { useEffect } from "react"
import { useUser } from "../assets/contexts/hooks/useUser"
import { useEdit } from "../assets/contexts/hooks/useEdit"

export function ResourceView() {

    const { user, setUser } = useUser()
    const editContext = useEdit()

    useEffect(() => {
        console.log('Current editMode:', editContext.edit)


        const handleKeyDown = (e) => {
            if (e.key === "e") {
                console.log('Before editMode change:', editContext.edit)
                editContext.setEditMode(prev => {
                    const newEdit = !prev
                    console.log('After editMode change:', newEdit);
                    return newEdit
                })
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [editContext.setEdit])

    return (
        <div className="MapView">
            <h1>Resources</h1>
            <div className="resources">
                <h2>Wood: {user.resources.Wood}</h2>
                <h2>Clay: {user.resources.Clay}</h2>
                <h2>Stone: {user.resources.Stone}</h2>
                <h2>Steel: {user.resources.Steel}</h2>
                <h2>Gold: {user.resources.Gold}</h2>
            </div>
            <h2>Money: {user.money} Bone Bucks</h2>
            {editContext.edit && (
                <div className="edit-resources">
                    <h3>Edit Resources</h3>
                </div>
            )}
        </div>
    )
}