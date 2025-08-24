import { useEffect } from "react"
import { prices } from "../assets/data/commData"
import { UserContext } from "../assets/contexts/UserContext"
import { useContext } from "react"

export function CtNav() {

    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        const handleBuy = (event) => {
            const itemName = event.target.parentElement.querySelector('h2').innerText
            const itemPrice = prices.find(item => item.name === itemName).price
            alert(`You bought ${itemName} for ${itemPrice} Bone Bucks!`)
            setUser(prevUser => ({
                ...prevUser,
                money: prevUser.money - itemPrice,
                resources: {
                    ...prevUser.resources,
                    [itemName.toLowerCase()]: prevUser.resources[itemName.toLowerCase()] + 1
                }
            }))
        }

        const buttons = document.querySelectorAll('.ct-btn');
        buttons.forEach(button => {
            button.addEventListener('click', handleBuy);
        });

        return () => {
            buttons.forEach(button => {
                button.removeEventListener('click', handleBuy);
            });
        }
    }, [])
    return (
        <div className="ct-nav">
            {prices.map((item) => {
                return (
                    <div className="ct-item" key={item.name}>
                        <img src={item.icon} alt={item.name} className="ct-icon" />
                        <h2>{item.name}</h2>
                        <p>Price: {item.price}</p>
                        <button className="ct-btn">Buy</button>
                    </div>
                )
            })}
        </div>
    )
}