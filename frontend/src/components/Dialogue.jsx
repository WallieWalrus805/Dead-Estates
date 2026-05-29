import { useState } from "react"
import { useText } from "../assets/contexts/hooks/useText"

export function Dialogue() {
    
    const { text, setText } = useText()
    
    return (
        <div className="box-text">
            {text.currentText}
        </div>
    )
}